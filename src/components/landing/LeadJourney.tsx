import { Inbox, Filter, MessagesSquare, Trophy, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons = [Inbox, Filter, MessagesSquare, Trophy];

export function LeadJourney() {
  const { t } = useI18n();
  return (
    <section id="features" className="relative border-t border-border/60 bg-[var(--surface-2)]/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.journey.eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.journey.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.journey.sub}</p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.journey.stages.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="absolute -top-3 start-6 inline-flex h-6 items-center rounded-full bg-gradient-to-r from-primary to-[var(--accent-emerald)] px-2.5 text-[11px] font-bold text-primary-foreground">
                  0{i + 1}
                </div>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>

                {i < t.journey.stages.length - 1 && (
                  <div className="pointer-events-none absolute -end-3 top-1/2 hidden -translate-y-1/2 text-border lg:block">
                    <ArrowRight className="size-5 rtl:rotate-180" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
