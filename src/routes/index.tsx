import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { LeadJourney } from "@/components/landing/LeadJourney";
import { Analytics } from "@/components/landing/Analytics";
import { CloudInfra } from "@/components/landing/CloudInfra";
import { LeadForm } from "@/components/landing/LeadForm";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IntakeFlow — Never Lose a Lead Again" },
      { name: "description", content: "Cloud-native lead tracking & management for businesses across Egypt and the GCC. Capture, qualify, and convert with deep analytics." },
      { property: "og:title", content: "IntakeFlow — Cloud-Native Lead Management" },
      { property: "og:description", content: "Track, analyze and scale your sales pipeline with enterprise-grade reliability." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Header />
          <main>
            <Hero />
            <LeadJourney />
            <Analytics />
            <CloudInfra />
            <LeadForm />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
