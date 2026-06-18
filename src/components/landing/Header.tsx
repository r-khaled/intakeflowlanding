import { useState } from "react";
import { Menu, X, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { id: "features", label: t.nav.features },
    { id: "analytics", label: t.nav.analytics },
    { id: "cloud", label: t.nav.cloud },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[var(--accent-emerald)] text-primary-foreground shadow-sm">
            <Workflow className="size-4" />
          </span>
          IntakeFlow
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <Button
            onClick={() => scrollToId("contact")}
            className="hidden bg-gradient-to-r from-primary to-[color-mix(in_oklab,var(--brand)_70%,var(--accent-emerald))] text-primary-foreground shadow-md hover:opacity-95 sm:inline-flex"
          >
            {t.nav.requestDemo}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => { setOpen(false); scrollToId(l.id); }}
                className="rounded-md px-3 py-2 text-start text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => { setOpen(false); scrollToId("contact"); }}
              className="mt-2 w-full bg-gradient-to-r from-primary to-[color-mix(in_oklab,var(--brand)_70%,var(--accent-emerald))]"
            >
              {t.nav.requestDemo}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
