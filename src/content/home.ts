/**
 * Todo el copy y los datos de la página principal.
 * Los valores marcados con `PENDIENTE` se completan aquí (una línea) y la página los toma sola.
 */
import type { ImageMetadata } from "astro";

import pump1 from "../assets/hero/pump-1.png";
import pump2 from "../assets/hero/pump-2.png";
import pump3 from "../assets/hero/pump-3.png";
import gasNetworkRender from "../assets/renders/gas-network.png";

/** Imagen local importada, o una URL/ruta pública (/logos/x.svg). */
export type Img = ImageMetadata | string;

export interface Cta {
  label: string;
  href: string;
  /** preselecciona el campo "Interés" del formulario */
  interest?: string;
  icon?: string;
}

/* ───────────────────────── Sitio ───────────────────────── */
export const site = {
  name: "Alaris Médica",
  lang: "es",
  title: "Alaris Médica | Equipos médicos, metrología e ingeniería de gases",
  description:
    "Equipos médicos, metrología biomédica e ingeniería de gases medicinales para instituciones de salud en Bogotá, Colombia.",
  tagline: "Equipos médicos, metrología e ingeniería de gases para el sector salud.",
  location: "Bogotá, Colombia",
  address: "Calle 197 # 21-61, Bogotá",
  phone: { display: "+57 318 803 0058", tel: "+573188030058" },
  email: "comercial@alarismedica.com.co",
  /** PENDIENTE: URL de la política de tratamiento de datos. `null` => se muestra como texto sin enlace. */
  privacyPolicyHref: null as string | null,
};

/* ───────────────────────── Navegación ───────────────────────── */
export const nav = {
  links: [
    { label: "Soluciones", href: "#soluciones" },
    { label: "Servicios", href: "#servicios" },
    { label: "Por qué Alaris", href: "#por-que-alaris" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: { label: "Cotizar", href: "#contacto" },
  homeLabel: "Alaris Médica – inicio",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  mainLabel: "Principal",
};

/* ───────────────────────── Hero ───────────────────────── */
export const hero = {
  eyebrow: { brand: "Alaris Médica", tagline: "Sector salud · Bogotá" },
  headline: ["Salud con", "precisión."],
  subtext: "Equipos médicos, metrología biomédica e ingeniería de gases medicinales para instituciones de salud.",
  form: {
    label: "Correo de trabajo",
    placeholder: "¿Cuál es tu correo de trabajo?",
    cta: "Cotizar",
  },
  explore: { label: "Ver soluciones", href: "#soluciones" },
  carouselLabel: "Equipos",
  dotLabel: "Ver imagen",
  slides: [
    { src: pump1, alt: "Skid de bombas de vacío con dos pares de bombas apiladas, tuberías y tanque receptor vertical" },
    { src: pump2, alt: "Skid de bombas de vacío con tablero de control, tanque receptor y dos pares de bombas apiladas" },
    { src: pump3, alt: "Rack de bombas de vacío de tres niveles junto a un tanque receptor y un gabinete de control en acero inoxidable" },
  ] as { src: ImageMetadata; alt: string }[],
  marqueeLabel: "Con la confianza de",
  /* Logos de relleno (sin tocar por ahora). Reemplazar con { name: "Clínica", src: "/logos/clinica.svg" } */
  logos: [
    { name: "Brightloop", font: "'Brush Script MT', cursive" },
    { name: "HALCYON", font: "'Trebuchet MS', sans-serif" },
    { name: "paperkite", font: "'Courier New', monospace" },
    { name: "VALDEZ & CO", font: "Georgia, serif" },
    { name: "ORBITAL", font: "Impact, sans-serif" },
    { name: "tangelo", font: "'Palatino Linotype', serif" },
  ] as { name: string; src?: string; font?: string }[],
};

/* ───────────────────────── 01 · Soluciones ───────────────────────── */
export const solutions = {
  id: "soluciones",
  title: "Tecnología que responde a tu operación",
  description:
    "Explora nuestras líneas. Te orientamos en la selección según la aplicación y los requerimientos técnicos de tu entidad.",
  note: "Imágenes de referencia. Configuración, especificaciones y disponibilidad por confirmar en la cotización.",
  // TODO: "Ver equipos" apunta al formulario por ahora; cuando existan los listados de producto, cambiar el href.
  cards: [
    {
      id: "vacio",
      category: "Sistemas de vacío",
      title: "Soluciones de vacío",
      description: "Equipos y sistemas de succión para aplicaciones hospitalarias.",
      image: pump3 as Img,
      imageAlt: "Sistema de vacío de tres bombas apiladas con tanque receptor y gabinete de control",
      primary: { label: "Ver equipos", href: "#contacto", interest: "equipo" } as Cta,
      secondary: { label: "Consultar equipo", href: "#contacto", interest: "equipo" } as Cta,
    },
    {
      id: "gases",
      category: "Infraestructura",
      title: "Redes de gases y compresores medicinales",
      description: "Soluciones para la infraestructura de gases de tu institución.",
      image: pump1 as Img,
      imageAlt: "Skid compresor con bombas, tuberías en acero y tanque receptor",
      primary: { label: "Ver equipos", href: "#contacto", interest: "equipo" } as Cta,
      secondary: { label: "Consultar equipo", href: "#contacto", interest: "equipo" } as Cta,
    },
  ],
};

/* ───────────────────────── 02 · Servicios ───────────────────────── */
export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  cta: Cta;
  render: {
    /** PENDIENTE: imagen del render 3D (import local o URL). `null` => se muestra el espacio reservado. */
    image: Img | null;
    alt: string;
    caption: string;
    placeholder: string;
  };
}

export const services = {
  id: "servicios",
  title: "Precisión técnica. Soluciones integradas.",
  description: "Servicios para equipos e infraestructura que acompañan la operación de las instituciones de salud.",
  items: [
    {
      id: "metrologia",
      title: "Metrología biomédica",
      description:
        "Conoce el desempeño de tus equipos con un servicio orientado a la medición y la documentación técnica.",
      bullets: [
        "Calibración de equipos biomédicos",
        "Verificación de parámetros de funcionamiento",
        "Informes con resultados de la intervención",
      ],
      cta: { label: "Consultar servicio de metrología", href: "#contacto", interest: "metrologia", icon: "gauge" },
      render: {
        image: null,
        alt: "Render 3D de un banco de metrología biomédica con equipos de medición",
        caption: "Medición y verificación en entornos biomédicos. Imagen de referencia.",
        placeholder: "Render 3D · Metrología biomédica",
      },
    },
    {
      id: "gases",
      title: "Diseño de redes de gases",
      description:
        "Acompañamos el desarrollo de la infraestructura de gases medicinales, desde el requerimiento hasta su mantenimiento.",
      bullets: [
        "Diseño según las necesidades del proyecto",
        "Instalación de redes de gases medicinales",
        "Mantenimiento de sistemas y componentes",
      ],
      cta: { label: "Agendar visita técnica", href: "#contacto", interest: "visita", icon: "calendar" },
      render: {
        image: gasNetworkRender as Img | null,
        alt: "Render 3D de una red de gases medicinales con tuberías de cobre y paneles de control",
        caption: "Infraestructura técnica para gases medicinales. Imagen de referencia.",
        placeholder: "Render 3D · Redes de gases",
      },
    },
  ] as Service[],
};

/* ───────────────────────── 03 · Por qué Alaris ───────────────────────── */
export const why = {
  id: "por-que-alaris",
  title: "Un aliado técnico para tu institución",
  description:
    "Desde Bogotá, conectamos equipos médicos, metrología e ingeniería de gases en una propuesta B2B enfocada en las necesidades del sector salud.",
  cards: [
    {
      icon: "badge-check",
      title: "Calidad",
      description:
        "Selección de equipos y definición de servicios a partir de los requerimientos técnicos de tu institución.",
    },
    {
      icon: "shield-check",
      title: "Respaldo y garantía",
      description:
        "Condiciones de respaldo y garantía especificadas según el equipo, el fabricante y el alcance de la propuesta.",
    },
    {
      icon: "package",
      title: "Cualquier equipo, a tu medida",
      description:
        "¿No lo ves en nuestras líneas? Cuéntanos qué equipo necesita tu institución y lo gestionamos según tus especificaciones.",
      tag: "Sujeto a cotización",
    },
  ] as { icon: string; title: string; description: string; tag?: string }[],
  /**
   * TEMPORAL: valores aleatorios de prueba para mostrar la animación. REEMPLAZAR por los datos reales
   * antes de entregar. Con `null` se muestra `statPlaceholder` sin animación.
   */
  stats: [
    { label: "Años de trayectoria", value: 17 as number | null, suffix: "+" },
    { label: "Instituciones atendidas", value: 138 as number | null, suffix: "+" },
    { label: "Proyectos ejecutados", value: 120 as number | null, suffix: "+" },
  ],
  statPlaceholder: "[XX]",
};

/* ───────────────────────── 04 · Cómo trabajamos ───────────────────────── */
export interface ProcessStep {
  title: string;
  description: string;
  /** "check" => el círculo muestra un check (que se dibuja al activarse) en lugar del número. */
  marker?: "number" | "check";
}

export const process = {
  id: "como-trabajamos",
  title: "Del requerimiento a la solución",
  description: "Un proceso claro para que sepas qué sigue en cada etapa de tu solicitud.",
  /** `null` => sin botón */
  cta: { label: "Iniciar mi solicitud", href: "#contacto" } as Cta | null,
  /** texto para lectores de pantalla antes de cada paso: "Paso 1:" */
  stepLabel: "Paso",
  steps: [
    {
      title: "Necesidad",
      description: "Escuchamos tu requerimiento y revisamos la aplicación, el alcance y las condiciones del proyecto.",
    },
    {
      title: "Propuesta",
      description: "Definimos una solución con especificaciones, condiciones comerciales y alcance técnico.",
    },
    {
      title: "Aprobación",
      // PENDIENTE: texto provisional, confirmar con el cliente.
      description: "Revisamos contigo la propuesta y formalizamos las condiciones del acuerdo.",
    },
    {
      title: "Entrega",
      description: "Coordinamos el suministro o la ejecución del servicio según lo acordado con tu entidad.",
    },
    {
      title: "Soporte",
      description: "Canalizamos las consultas y el acompañamiento posterior conforme a las condiciones pactadas.",
      marker: "check",
    },
  ] as ProcessStep[],
};

/* ───────────────────────── 05 · Alianzas y documentación ───────────────────────── */
export interface PartnerItem {
  id: string;
  kind: "brand" | "certification";
  name: string;
  status: string;
  /** Logo verificado (import local o "/logos/marca.svg"). Si existe, reemplaza al icono dentro del sector. */
  logo?: Img;
}

export const partners = {
  id: "alianzas",
  title: "Marcas aliadas y certificaciones",
  description: "Espacios reservados para información verificada. No se presentan acreditaciones ni alianzas sin confirmar.",
  /** Centro de la rueda cuando no hay ningún sector seleccionado. */
  idle: {
    name: "Espacios reservados",
    hintHover: "Pasa el cursor sobre un sector",
    hintTouch: "Toca un sector",
  },
  /**
   * Sectores de la rueda (de 3 a 8), en sentido horario desde las 12.
   * PENDIENTE: reemplazar los placeholders solo con información verificada (nombre, `logo`, `status`).
   */
  items: [
    { id: "marca-1", kind: "brand", name: "Marca aliada", status: "Logo pendiente de aprobación" },
    { id: "marca-2", kind: "brand", name: "Marca aliada", status: "Logo pendiente de aprobación" },
    { id: "marca-3", kind: "brand", name: "Marca aliada", status: "Logo pendiente de aprobación" },
    { id: "certificaciones", kind: "certification", name: "Certificaciones", status: "Documentación pendiente de verificación" },
  ] as PartnerItem[],
};

/* ───────────────────────── 06 · Contacto ───────────────────────── */
export const contact = {
  id: "contacto",
  title: "Solicita tu cotización o agenda una visita",
  description:
    "Cuéntanos qué equipo o servicio necesita tu institución. Nuestro equipo revisará tu solicitud para definir el siguiente paso.",
  items: [
    {
      icon: "map-pin",
      label: "Visítanos en Bogotá",
      value: "Calle 197 # 21-61",
      href: "https://www.google.com/maps/search/?api=1&query=Calle+197+%2321-61%2C+Bogot%C3%A1",
    },
    { icon: "phone", label: "Línea comercial", value: site.phone.display, href: `tel:${site.phone.tel}` },
    { icon: "mail", label: "Correo electrónico", value: site.email, href: `mailto:${site.email}` },
  ],
  note: "Si ya tienes especificaciones técnicas, inclúyelas en el mensaje para orientar tu solicitud.",
  form: {
    title: "Cuéntanos qué necesitas",
    hint: "Los campos con * son obligatorios.",
    fields: {
      name: { label: "Nombre completo", placeholder: "Tu nombre" },
      company: { label: "Empresa", placeholder: "Nombre de la organización" },
      entityType: { label: "Tipo de entidad", placeholder: "Selecciona una opción" },
      phone: { label: "Celular", placeholder: "Ej. 318 803 0058" },
      email: { label: "Correo electrónico", placeholder: "nombre@empresa.com" },
      interest: { label: "Interés", placeholder: "Equipo, servicio o visita técnica" },
      message: { label: "Mensaje", placeholder: "Describe el equipo, servicio o alcance de tu proyecto." },
    },
    entityTypes: ["Clínica u hospital", "Laboratorio", "Entidad pública", "Distribuidor", "Otro"],
    interests: [
      { value: "equipo", label: "Equipo" },
      { value: "metrologia", label: "Servicio de metrología" },
      { value: "gases", label: "Diseño o mantenimiento de redes de gases" },
      { value: "visita", label: "Visita técnica" },
    ],
    consent: { before: "Autorizo el tratamiento de mis datos personales de acuerdo con la", link: "política de datos", after: "." },
    submit: "Enviar solicitud",
    sending: "Enviando…",
    helper: "Usaremos tus datos para atender esta solicitud comercial o técnica.",
    errors: {
      required: "Este campo es obligatorio.",
      email: "Ingresa un correo válido, por ejemplo nombre@empresa.com.",
      phone: "Ingresa un número de celular válido.",
      consent: "Debes autorizar el tratamiento de datos para continuar.",
      submit: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    },
    success: {
      title: "¡Solicitud enviada!",
      text: "Gracias por escribirnos. Nuestro equipo revisará tu solicitud y te contactará para definir el siguiente paso.",
      again: "Enviar otra solicitud",
    },
  },
};

/* ───────────────────────── Footer ───────────────────────── */
export const footer = {
  columns: [
    {
      title: "Explora Alaris",
      links: [
        { label: "Inicio", href: "#hero" },
        { label: "Productos", href: "#soluciones" },
        { label: "Servicios", href: "#servicios" },
        { label: "Quiénes somos", href: "#por-que-alaris" },
        { label: "Contáctanos", href: "#contacto" },
      ],
    },
    {
      title: "Soluciones",
      links: [
        { label: "Equipos médicos", href: "#soluciones" },
        { label: "Metrología biomédica", href: "#servicios" },
        { label: "Redes de gases", href: "#servicios" },
        { label: "Visitas técnicas", href: "#contacto" },
      ],
    },
  ],
  socialTitle: "Conecta con nosotros",
  /** PENDIENTE: reemplazar por las URL reales de cada red. */
  social: [
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
    { label: "X", icon: "x", href: "https://x.com/" },
  ],
  copyright: "© ALARIS MÉDICA. Todos los derechos reservados.",
  privacy: "Política de tratamiento de datos personales",
};

/* ───────────────────────── WhatsApp flotante ───────────────────────── */
export const whatsapp = {
  number: "573188030058",
  message: "Hola, quiero información sobre equipos y servicios de Alaris Médica.",
  tooltip: "Escríbenos por WhatsApp",
  label: "Escribir por WhatsApp",
};
