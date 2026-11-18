# Briefs de render 3D — Servicios

Cada servicio de la sección "02 / Servicios" tiene un espacio reservado para un render.
Cuando tengas las imágenes, súbelas a `src/assets/` y en `src/content/home.ts` cambia
`render.image: null` por el import (una línea por servicio).

## Especificaciones comunes

- **Formato de salida:** 4:3 horizontal, mínimo 2000 × 1500 px (se muestra a ~640 px de ancho, 2x para pantallas retina). PNG o WebP.
- **Estilo:** render fotorrealista limpio, estética de catálogo técnico / visualización de producto. Sin texto, logos, marcas ni personas reconocibles.
- **Paleta:** neutros de la marca — Carbon `#343434`, Metal `#E6E6ED`, Cinza `#DCDCDE`, Ônix `#A8A5A0`. Un único acento **Azul `#005CFF`** (luz, LED, indicador o pequeño detalle), nunca dominante.
- **Fondo:** degradado suave Metal → blanco (`#E6E6ED` → `#FFFFFF`), consistente con el hero. Sombra de contacto suave bajo los objetos.
- **Luz:** suave y difusa (softbox grande desde arriba-izquierda), contraste moderado, reflejos controlados en metal.
- **Cámara:** lente ~50 mm, ligera vista 3/4 elevada, profundidad de campo corta con el elemento principal totalmente nítido.
- **Composición:** el sujeto ocupa ~65 % del cuadro, con aire alrededor; encuadre estable para recorte `object-cover` en 4:3.
- **Evitar:** estética de ciencia ficción, neones, escenas saturadas, manos/rostros, cualquier marca visible, valores o lecturas que puedan interpretarse como datos reales.

## 1 · Metrología biomédica  (`services.items[0].render`)

**Concepto:** banco de metrología biomédica ordenado, que comunique medición precisa y trazabilidad documentada.

**Escena:**
- Mesa de trabajo en acero inoxidable / laminado claro.
- En primer plano, un analizador/simulador de signos vitales genérico (sin marca) con pantalla apagada o con una curva neutra azul.
- Detrás, un monitor de paciente genérico conectado por cables ordenados con terminales en puntas de prueba.
- Un patrón de calibración (módulo de referencia) y un multímetro/calibrador genérico en un costado.
- Sobre la mesa, una carpeta o tablet con un informe en blanco (líneas de tabla, sin texto legible) que sugiere "informe con resultados".
- Fondo desenfocado: laboratorio limpio, estantería con instrumentos, luz de ventana suave.

**Acento Azul:** LED o pequeña curva en pantalla de uno de los equipos.

**Prompt sugerido (generadores de imagen):**
> Photorealistic 3D render, clean biomedical metrology bench, generic patient monitor and vital-signs simulator connected with tidy cables, calibration reference module and multimeter, blank technical report on a tablet, stainless steel table, soft diffused studio lighting, shallow depth of field, light grey gradient background (#E6E6ED to white), subtle blue (#005CFF) accent light on one screen, no text, no logos, no people, 4:3, 50mm lens, high detail, product-visualization style.

## 2 · Diseño de redes de gases  (`services.items[1].render`)

**Concepto:** infraestructura de gases medicinales limpia y bien diseñada, vista como un proyecto de ingeniería.

**Escena:**
- Pared blanca de una sala técnica/hospitalaria con un panel de control de gases (manifold) central: reguladores, manómetros y válvulas en acero y latón.
- Tuberías de cobre ordenadas, con soportes y codos limpios, recorriendo la pared en líneas rectas y ángulos de 90°.
- Piso claro con reflejo suave; luminaria lineal en el techo.
- Opcional: una vista parcialmente "plano técnico" (líneas isométricas finas en Cinza) que se funde con la tubería, para sugerir "diseño".
- Sin códigos de colores de gases con texto; usar etiquetas lisas sin letras.

**Acento Azul:** pequeño indicador/LED en el panel o una línea de plano técnico.

**Prompt sugerido:**
> Photorealistic 3D render, medical gas pipeline installation on a white hospital technical-room wall, copper pipes with clean right-angle bends and clamps, central stainless-steel and brass manifold panel with pressure gauges and valves, subtle isometric engineering-blueprint lines fading into the pipework, soft diffused lighting, light grey floor reflection, restrained blue (#005CFF) indicator light, no text, no logos, no people, 4:3, 50mm lens, high detail, product-visualization style.

## Checklist de aprobación

- [ ] 4:3, ≥ 2000 × 1500 px
- [ ] Sin texto ni marcas visibles
- [ ] Azul solo como acento
- [ ] Se lee bien recortado a 4:3 en pantalla de 1440 px de ancho
- [ ] Coherente con el fondo Metal → blanco del hero
