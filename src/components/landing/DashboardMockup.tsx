import { ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function DashboardMockup() {
  const { t } = useI18n();
  const m = t.analytics.mock;
  const bars = [40, 65, 50, 78, 55, 88, 72, 95, 80, 92, 70, 85];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 glow-brand blur-2xl opacity-60" />
      <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="text-[11px] font-medium text-muted-foreground">app.intakeflow.io</div>
          <div className="w-12" />
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">{m.sub}</div>
            <div className="font-display text-lg font-semibold">{m.title}</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
            <ArrowUpRight className="size-3" /> +24.6%
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: Users, label: m.leads, value: "1,284" },
            { icon: TrendingUp, label: m.won, value: "312" },
            { icon: DollarSign, label: m.revenue, value: "$184k" },
          ].map((k, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background/50 p-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <k.icon className="size-3" /> {k.label}
              </div>
              <div className="mt-1 font-display text-base font-semibold sm:text-lg">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-medium">{m.conv}</span>
            <span className="text-muted-foreground">68.2%</span>
          </div>
          <div className="flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-primary origin-bottom"
                style={{ height: `${h}%`, animation: `pulse-bar 3s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="mb-2 text-[11px] font-medium">{m.dropoff}</div>
            <div className="space-y-1.5">
              {[100, 72, 48, 28].map((w, i) => (
                <div key={i} className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-[var(--accent-emerald)]" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="mb-2 text-[11px] font-medium">{m.csat}</div>
            <div className="flex items-end justify-between">
              <div className="font-display text-2xl font-bold">4.8<span className="text-sm text-muted-foreground">/5</span></div>
              <div className="text-[11px] text-emerald-500">+0.3 vs prev</div>
            </div>
            <div className="mt-2 flex gap-0.5 text-amber-400">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
