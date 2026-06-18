import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { makeLeadSchema, submitLead, SALES_EMAIL, type LeadFormValues } from "@/lib/lead-schema";

export function LeadForm() {
  const { t } = useI18n();
  const schema = useMemo(() => makeLeadSchema(t.form.errors), [t]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      businessName: "",
      industry: "",
      email: "",
      phone: "",
      teamSize: undefined as unknown as "1-5",
      outcomes: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    if (data.honeypot && data.honeypot.length > 0) {
      setStatus("success");
      reset();
      return;
    }
    setStatus("submitting");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      await submitLead(data, controller.signal);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  };

  const errClass = "text-xs font-medium text-destructive mt-1";

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 glow-brand opacity-40 blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.form.eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.form.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.form.sub}</p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
          {status === "success" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/95 p-6 text-center backdrop-blur">
              <div className="flex size-14 items-center justify-center rounded-full bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)]">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="font-display text-2xl font-bold">{t.form.successTitle}</h3>
              <p className="max-w-sm text-sm text-muted-foreground">{t.form.successBody}</p>
              <Button variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
                {t.form.successAgain}
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="businessName">{t.form.labels.businessName}</Label>
                <Input id="businessName" placeholder={t.form.placeholders.businessName} {...register("businessName")} className="mt-1.5" />
                {errors.businessName && <p className={errClass}>{errors.businessName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">{t.form.labels.email}</Label>
                <Input id="email" type="email" placeholder={t.form.placeholders.email} {...register("email")} className="mt-1.5" />
                {errors.email && <p className={errClass}>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="industry">{t.form.labels.industry}</Label>
              <Textarea id="industry" rows={3} placeholder={t.form.placeholders.industry} {...register("industry")} className="mt-1.5" />
              {errors.industry && <p className={errClass}>{errors.industry.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">{t.form.labels.phone}</Label>
                <Input id="phone" type="tel" placeholder={t.form.placeholders.phone} {...register("phone")} className="mt-1.5" />
                {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="teamSize">{t.form.labels.teamSize}</Label>
                <select
                  id="teamSize"
                  {...register("teamSize")}
                  defaultValue=""
                  className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="" disabled>{t.form.placeholders.teamSizeSelect}</option>
                  <option value="1-5">{t.form.teamSizes.s1}</option>
                  <option value="6-20">{t.form.teamSizes.s2}</option>
                  <option value="20+">{t.form.teamSizes.s3}</option>
                </select>
                {errors.teamSize && <p className={errClass}>{errors.teamSize.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="outcomes">{t.form.labels.outcomes}</Label>
              <Textarea id="outcomes" rows={3} placeholder={t.form.placeholders.outcomes} {...register("outcomes")} className="mt-1.5" />
              {errors.outcomes && <p className={errClass}>{errors.outcomes.message}</p>}
            </div>

            {/* Honeypot — visually hidden, off-screen, not focusable */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden", opacity: 0 }}>
              <label>
                Do not fill
                <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
              </label>
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <div>
                  <div className="font-semibold">{t.form.errorTitle}</div>
                  <div className="text-destructive/80">{t.form.errorBody}</div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="mt-2 w-full bg-gradient-to-r from-primary to-[color-mix(in_oklab,var(--brand)_70%,var(--accent-emerald))] text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.form.submitting}
                </>
              ) : (
                t.form.submit
              )}
            </Button>
          </form>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="size-4" />
          {t.form.contactEmail}{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-primary hover:underline">
            {SALES_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
