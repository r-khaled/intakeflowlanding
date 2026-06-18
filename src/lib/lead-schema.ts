import { z } from "zod";

export const GAS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzslntsY3F7xtLfbBGAPTjihU9uwELI89P0yAz4kHFGxusq106EvPD9mmsD0QNWxR14Ig/exec";

export const SALES_EMAIL = "sales.mail@intakeflow.qzz.io";

export const phoneRegex = /^[+\d][\d\s\-()]{6,20}$/;

export function makeLeadSchema(msgs: {
  required: string;
  email: string;
  phone: string;
  min: string;
  max: string;
}) {
  return z.object({
    businessName: z.string().trim().min(2, msgs.required).max(120, msgs.max),
    industry: z.string().trim().min(5, msgs.min).max(500, msgs.max),
    email: z.string().trim().email(msgs.email).max(255, msgs.max),
    phone: z.string().trim().regex(phoneRegex, msgs.phone),
    teamSize: z.enum(["1-5", "6-20", "20+"], { errorMap: () => ({ message: msgs.required }) }),
    outcomes: z.string().trim().min(5, msgs.min).max(1000, msgs.max),
    honeypot: z.string().max(0).optional().or(z.literal("")),
  });
}

export type LeadFormValues = z.infer<ReturnType<typeof makeLeadSchema>>;

export async function submitLead(data: LeadFormValues, signal?: AbortSignal) {
  const payload = {
    businessName: data.businessName,
    businessDescription: data.industry,
    businessEmail: data.email,
    phoneNumber: data.phone,
    teamSize: data.teamSize,
    expectedOutcomes: data.outcomes,
    honeypot: data.honeypot ?? "",
  };
  const res = await fetch(GAS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as { status?: string };
  if (json.status !== "success") throw new Error("Submission failed");
  return json;
}
