/**
 * Único punto de envío del formulario de contacto.
 *
 * TODO(backend): definir el endpoint real (CRM, email transaccional, función serverless, etc.)
 * y ponerlo en `PUBLIC_LEADS_ENDPOINT` (ver .env.example). Mientras la variable no exista,
 * NO se envía nada: se simula un envío exitoso para poder mostrar el flujo completo.
 * Ajusta aquí el formato del cuerpo y las cabeceras que pida el backend.
 */

export interface Lead {
  name: string;
  company: string;
  entityType: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  consent: boolean;
  /** de dónde viene la solicitud (útil para el CRM) */
  source: string;
}

export interface SubmitResult {
  ok: true;
  /** true cuando no hay endpoint configurado y el envío fue simulado */
  simulated: boolean;
}

const endpoint = import.meta.env.PUBLIC_LEADS_ENDPOINT as string | undefined;

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (!endpoint) {
    console.warn("[submitLead] PUBLIC_LEADS_ENDPOINT no está configurado: la solicitud NO se envió (simulada).", lead);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, simulated: true };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`El endpoint respondió ${res.status}`);
  return { ok: true, simulated: false };
}
