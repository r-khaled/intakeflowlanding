import { CloudLightning, ShieldCheck, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons = [CloudLightning, ShieldCheck];

export function CloudInfra() {
  const { t } = useI18n();
  return (
    <section id="cloud" className="relative border-y border-border/60 bg-[var(--surface-2)]/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.cloud.eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.cloud.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.cloud.sub}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.cloud.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="absolute -top-12 -end-12 size-40 rounded-full bg-gradient-to-br from-primary/20 to-[var(--accent-emerald)]/20 blur-2xl" />
                <div className="relative">
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--accent-emerald)] text-primary-foreground shadow-md">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {it.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 text-[var(--accent-emerald)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
