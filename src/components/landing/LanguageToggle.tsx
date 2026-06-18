import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label="Toggle language"
      className="rounded-full px-3 font-semibold tracking-wide"
    >
      {lang === "en" ? "AR" : "EN"}
    </Button>
  );
}
