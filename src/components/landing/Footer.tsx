import { Workflow } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[var(--accent-emerald)] text-primary-foreground">
            <Workflow className="size-3.5" />
          </span>
          <span className="font-display font-semibold">IntakeFlow</span>
          <span className="text-sm text-muted-foreground">— {t.footer.tagline}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} IntakeFlow. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
