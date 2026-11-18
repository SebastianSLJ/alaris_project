# Alaris Médica — Página principal (Astro 5 + Tailwind 4)

Página única: hero + 6 secciones + footer + botón de WhatsApp.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run check     # tipos (astro check)
```

## Dónde editar cada cosa

| Qué | Dónde |
|---|---|
| **Todo el copy y los datos** (textos, stats, logos, redes, teléfono…) | `src/content/home.ts` |
| Colores y tipografías (tokens) | `src/styles/global.css` (`@theme`) |
| Orden de secciones | `src/pages/index.astro` |
| Envío del formulario | `src/lib/submitLead.ts` + `PUBLIC_LEADS_ENDPOINT` (ver `.env.example`) |
| Briefs de los renders 3D | `docs/render-briefs.md` |

## Estructura

```
src/
  content/home.ts              ← copy + datos (única fuente)
  components/hero/             ← Header (píldora), Hero, HeroCarousel, LogoMarquee
  components/sections/         ← Solutions, Services, WhyAlaris, Process, Partners, Contact, Footer
  components/ui/               ← Button, Icon, Pic, SectionHeading, WhatsAppButton
  lib/submitLead.ts            ← función de envío del formulario
  scripts/reveal.ts            ← animación de aparición al hacer scroll
  layouts/Layout.astro         ← head, Header, Footer, WhatsApp
```

## Pendientes (se completan en `home.ts`, una línea cada uno)

- `why.stats[].value` — años, instituciones, proyectos (con `null` se ve `[XX]` sin animación; con número hace count-up).
- `partners.items` — sectores de la rueda de alianzas (3 a 8): `name`, `status` y `logo` solo con información verificada.
- `services.items[].render.image` — renders 3D (ver `docs/render-briefs.md`).
- `footer.social[].href` — URLs reales de Instagram, Facebook y X.
- `site.privacyPolicyHref` — URL de la política de datos (con `null` se muestra como texto).
- `hero.logos` — logos de clientes (siguen siendo de relleno).
- `solutions.cards[].primary.href` — hoy "Ver equipos" lleva al formulario; apuntar a los listados cuando existan.
- `PUBLIC_LEADS_ENDPOINT` — sin endpoint el formulario **simula** el envío y no manda nada.

## Notas de diseño

- Paleta: Carbon `#343434`, Azul `#005CFF` (solo CTAs, enlaces y acentos), Metal `#E6E6ED`, Cinza `#DCDCDE`, Ônix `#A8A5A0`.
- Layouts fluidos (`.container-x` + grid/flex). Hoy está pensado para escritorio; el móvil funciona pero no está pulido.
- Animaciones: `data-reveal` en cualquier elemento. Respetan `prefers-reduced-motion` y no ocultan nada si no hay JS.
- Los botones con `data-interest` preseleccionan el campo "Interés" del formulario.
