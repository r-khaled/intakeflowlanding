import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { DashboardMockup } from "./DashboardMockup";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-32 start-1/2 -z-10 size-[600px] -translate-x-1/2 glow-brand blur-3xl opacity-70" />
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3 text-[var(--accent-emerald)]" />
              {t.hero.badge}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title1}
              <br />
              <span className="text-foreground">{t.hero.title2}</span>
              <span className="bg-gradient-to-r from-primary to-[var(--accent-emerald)] bg-clip-text text-transparent">
                {t.hero.brand}
              </span>
              .
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
              {t.hero.sub}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToId("contact")}
                className="w-full bg-gradient-to-r from-primary to-[color-mix(in_oklab,var(--brand)_70%,var(--accent-emerald))] text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95 sm:w-auto"
              >
                {t.hero.cta1}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId("analytics")} className="w-full sm:w-auto">
                <PlayCircle className="size-4" />
                {t.hero.cta2}
              </Button>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6 mx-auto lg:mx-0">
              {t.hero.stats.map((s, i) => (
                <div key={i} className="text-center lg:text-start">
                  <div className="font-display text-xl font-bold sm:text-2xl">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground sm:text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
