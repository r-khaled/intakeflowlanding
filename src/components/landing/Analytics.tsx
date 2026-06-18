import { TrendingUp, AlertTriangle, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { DashboardMockup } from "./DashboardMockup";

const icons = [TrendingUp, AlertTriangle, Heart];

export function Analytics() {
  const { t } = useI18n();
  return (
    <section id="analytics" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{t.analytics.eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.analytics.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.analytics.sub}</p>

            <div className="mt-8 space-y-4">
              {t.analytics.cards.map((c, i) => {
                const Icon = icons[i];
                return (
                  <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-[var(--accent-emerald)]/15 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
