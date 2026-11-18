"""
Render 3D: red de gases medicinales (servicio "Diseño de redes de gases").
Brief: docs/render-briefs.md

Uso (desde la raíz del proyecto):
  F:\\Blender\\blender.exe -b -P tools/blender/gas_panel.py -- --res 2000 --samples 128 --out src/assets/renders/gas-network.png
"""
import math
import sys

import bpy
from mathutils import Vector

# ───────────── args ─────────────
argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []


def arg(name, default):
    return argv[argv.index(name) + 1] if name in argv else default


RES_X = int(arg("--res", 1000))
RES_Y = RES_X * 3 // 4  # 4:3
SAMPLES = int(arg("--samples", 64))
OUT = arg("--out", "render.png")

# ───────────── escena limpia ─────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(pow(int(h[i:i + 2], 16) / 255, 2.2) for i in (0, 2, 4)) + (1,)


# ───────────── materiales ─────────────
def mat(name, color, metallic=0.0, rough=0.5, emission=None, strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = color
    b.inputs["Metallic"].default_value = metallic
    b.inputs["Roughness"].default_value = rough
    if emission:
        b.inputs["Emission Color"].default_value = emission
        b.inputs["Emission Strength"].default_value = strength
    return m


M_WALL = mat("wall", hexrgb("#E6E6ED"), 0, 0.85)
M_FLOOR = mat("floor", hexrgb("#CFCFD6"), 0, 0.18)
M_STEEL = mat("steel", (0.72, 0.74, 0.78, 1), 1, 0.32)
M_STEEL_D = mat("steel_dark", (0.45, 0.47, 0.5, 1), 1, 0.38)
M_COPPER = mat("copper", (0.86, 0.44, 0.30, 1), 1, 0.22)
M_BRASS = mat("brass", (0.80, 0.60, 0.22, 1), 1, 0.28)
M_CARBON = mat("carbon", hexrgb("#343434"), 0, 0.5)
M_FRAME = mat("frame", hexrgb("#DCDCDE"), 0, 0.55)
M_PLATE = mat("plate", hexrgb("#343434"), 0.4, 0.42)
M_WHITE = mat("dial", (0.95, 0.95, 0.95, 1), 0, 0.6)
M_BLUE = mat("azul", hexrgb("#005CFF"), 0, 0.3, emission=hexrgb("#005CFF"), strength=14)
M_LIGHT = mat("lightstrip", (1, 1, 1, 1), 0, 0.5, emission=(1, 1, 1, 1), strength=10)

# ───────────── helpers de geometría ─────────────


def finish(obj, material, smooth=True):
    obj.data.materials.append(material)
    if smooth:
        try:
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)
            bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
            obj.select_set(False)
        except Exception:
            for p in obj.data.polygons:
                p.use_smooth = True
    return obj


def box(loc, size, material, bevel=0.0, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2)
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        bm = o.modifiers.new("bev", "BEVEL")
        bm.width = bevel
        bm.segments = 3
    return finish(o, material)


def cyl(loc, r, depth, material, axis="Z", verts=48):
    rot = {"Z": (0, 0, 0), "X": (0, math.pi / 2, 0), "Y": (math.pi / 2, 0, 0)}[axis]
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=rot)
    return finish(bpy.context.object, material)


def sphere(loc, r, material):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=r, location=loc)
    return finish(bpy.context.object, material)


def cyl_between(p0, p1, r, material, verts=32):
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=d.length, location=(p0 + p1) / 2)
    o = bpy.context.object
    o.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
    return finish(o, material)


def pipe(points, r, material, bend=0.14, clamp_every=0.9, wall_y=0.0):
    """Tubo con esquinas redondeadas (curva con bisel) + abrazaderas a la pared."""
    pts = [Vector(p) for p in points]
    path = [pts[0]]
    for i in range(1, len(pts) - 1):
        a, c, b = pts[i - 1], pts[i], pts[i + 1]
        la, lb = (a - c).length, (b - c).length
        k = min(bend, la / 2.2, lb / 2.2)
        p_in = c + (a - c).normalized() * k
        p_out = c + (b - c).normalized() * k
        for s in range(0, 9):
            t = s / 8
            path.append((1 - t) ** 2 * p_in + 2 * (1 - t) * t * c + t ** 2 * p_out)
    path.append(pts[-1])

    cu = bpy.data.curves.new("pipe", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = r
    cu.bevel_resolution = 6
    cu.use_fill_caps = True
    sp = cu.splines.new("POLY")
    sp.points.add(len(path) - 1)
    for p, v in zip(sp.points, path):
        p.co = (v.x, v.y, v.z, 1)
    o = bpy.data.objects.new("pipe", cu)
    scene.collection.objects.link(o)
    o.data.materials.append(material)

    # abrazaderas en los tramos rectos largos
    for a, b in zip(pts, pts[1:]):
        L = (b - a).length
        n = int(L // clamp_every)
        for j in range(1, n + 1):
            p = a + (b - a) * (j / (n + 1))
            ring = cyl_between(p - (b - a).normalized() * 0.018, p + (b - a).normalized() * 0.018, r * 1.45, M_STEEL_D)
            cyl_between((p.x, wall_y, p.z), (p.x, p.y, p.z), 0.012, M_STEEL_D)
    return o


# ───────────── sala ─────────────
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 3), rotation=(math.pi / 2, 0, 0))
w = bpy.context.object
w.scale = (24, 6, 1)  # pared (mira hacia la cámara, -Y)
bpy.ops.object.transform_apply(scale=True)
finish(w, M_WALL, smooth=False)

bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -8, 0))
f = bpy.context.object
f.scale = (24, 16, 1)
bpy.ops.object.transform_apply(scale=True)
finish(f, M_FLOOR, smooth=False)

# zócalo
box((0, -0.02, 0.07), (24, 0.04, 0.14), M_FRAME)
# luminaria lineal (visible arriba) para dar "sala técnica"
box((0, -0.2, 4.0), (6.0, 0.16, 0.05), M_LIGHT)
box((0, -0.12, 3.96), (6.1, 0.22, 0.04), M_FRAME)

# ───────────── unidad de gases (panel + manifold) ─────────────
PY = -0.12  # plano de las tuberías (delante de la pared)


def unit(ux, side):
    # marco + placa de acero
    box((ux, -0.016, 1.55), (1.66, 0.032, 1.9), M_FRAME, bevel=0.015)
    box((ux, -0.05, 1.55), (1.52, 0.04, 1.74), M_PLATE, bevel=0.012)
    # detalle azul: franja LED + piloto
    box((ux, -0.075, 0.82), (0.5, 0.008, 0.016), M_BLUE)
    cyl((ux + 0.62, -0.075, 0.82), 0.014, 0.01, M_BLUE, axis="Y")

    # header de acero + tapas
    cyl((ux, PY, 1.0), 0.05, 1.2, M_STEEL, axis="X")
    for e in (-0.6, 0.6):
        cyl((ux + e, PY, 1.0), 0.058, 0.04, M_STEEL_D, axis="X")

    branches = [-0.40, -0.133, 0.133, 0.40]
    # orden de salida: el más externo sube menos (evita cruces)
    order = sorted(range(4), key=lambda i: (branches[i] * side))
    rank = {idx: k for k, idx in enumerate(reversed(order))}

    for i, bx in enumerate(branches):
        x = ux + bx
        # tramo vertical de acero + válvula de bola en latón
        cyl((x, PY, 1.17), 0.03, 0.34, M_STEEL)
        sphere((x, PY, 1.17), 0.07, M_BRASS)
        cyl((x, PY, 1.17), 0.075, 0.05, M_BRASS, axis="X")
        # palanca (carbón)
        box((x + 0.06, PY - 0.085, 1.17), (0.17, 0.022, 0.022), M_CARBON, bevel=0.006)
        cyl((x + 0.145, PY - 0.085, 1.17), 0.017, 0.026, M_CARBON, axis="Y")
        # regulador
        cyl((x, PY, 1.45), 0.05, 0.22, M_STEEL)
        cyl((x, PY, 1.58), 0.068, 0.06, M_CARBON)
        cyl((x, PY, 1.62), 0.045, 0.03, M_STEEL_D)
        # manómetro frontal
        gy = PY - 0.095
        cyl((x, gy, 1.43), 0.085, 0.04, M_STEEL, axis="Y")
        cyl((x, gy - 0.022, 1.43), 0.072, 0.006, M_WHITE, axis="Y")
        for t in range(13):
            a = math.radians(-135 + t * 22.5)
            tx, tz = math.sin(a) * 0.060, math.cos(a) * 0.060
            box((x + tx, gy - 0.027, 1.43 + tz), (0.004, 0.003, 0.012 if t % 3 else 0.018), M_CARBON, rot=(0, -a, 0))
        needle = math.radians(-35 + 12 * (i % 3))
        box((x + math.sin(needle) * 0.03, gy - 0.03, 1.43 + math.cos(needle) * 0.03), (0.004, 0.003, 0.062), M_CARBON, rot=(0, -needle, 0))
        cyl((x, gy - 0.032, 1.43), 0.006, 0.006, M_CARBON, axis="Y")

        # tubería de cobre hacia el techo y hacia afuera
        k = rank[i]
        ztop = 2.95 + 0.17 * k
        pipe([(x, PY, 1.64), (x, PY, ztop), (side * 4.6, PY, ztop)], 0.04, M_COPPER)

    # alimentaciones inferiores (cobre) hacia afuera del cuadro
    for sgn, zt in ((side, 0.85), (-side, 0.55)):
        x = ux + sgn * 0.5
        pipe([(x, PY, 1.0), (x, PY, zt), (side * 4.6, PY, zt)], 0.04, M_COPPER)


unit(-1.75, -1)
unit(1.75, 1)

# ───────────── iluminación ─────────────
world = bpy.data.worlds.new("w")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0.86, 0.87, 0.9, 1)
bg.inputs["Strength"].default_value = 0.45

bpy.ops.object.light_add(type="AREA", location=(-3.2, -4.5, 4.6), rotation=(math.radians(55), 0, math.radians(-28)))
key = bpy.context.object
key.data.energy = 900
key.data.size = 2.5
key.data.size_y = 2.5
bpy.ops.object.light_add(type="AREA", location=(4.5, -6, 2.5), rotation=(math.radians(80), 0, math.radians(35)))
fill = bpy.context.object
fill.data.energy = 180
fill.data.size = 5

# ───────────── cámara ─────────────
cam_data = bpy.data.cameras.new("cam")
cam_data.lens = 40
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
cam.location = (0.9, -7.4, 2.05)
cam.rotation_euler = (Vector((-0.9, 7.4, -0.05)).to_track_quat("-Z", "Y")).to_euler()
scene.camera = cam

# ───────────── render ─────────────
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
try:
    scene.cycles.denoiser = "OPENIMAGEDENOISE"
except Exception:
    pass
scene.render.resolution_x = RES_X
scene.render.resolution_y = RES_Y
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = "AgX"
scene.view_settings.exposure = -0.3
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except Exception:
    pass
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = OUT
BLEND = arg("--blend", "")
if BLEND:
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
    print("BLEND_SAVED", BLEND)
else:
    bpy.ops.render.render(write_still=True)
    print("RENDER_DONE", OUT)
