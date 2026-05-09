import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/medicus/Logo";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Clock,
  MapPin,
  HeartPulse,
  Accessibility,
  Phone,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediCus — Ihr freundlicher Krankenfahrdienst" },
      {
        name: "description",
        content:
          "Sicherer und zuverlässiger Krankentransport in Berlin. Rollstuhl, Liegendtransport und Begleitung für Patienten — buchbar in wenigen Sekunden.",
      },
      { property: "og:title", content: "MediCus — Krankenfahrdienst" },
      {
        property: "og:description",
        content: "Professioneller Patiententransport: Klinik, Dialyse, Reha. Buchung in Echtzeit, GPS-Tracking, geschultes Personal.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#leistungen" className="hover:text-foreground">Leistungen</a>
            <a href="#ablauf" className="hover:text-foreground">Ablauf</a>
            <a href="#kontakt" className="hover:text-foreground">Kontakt</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Anmelden</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/patient">Transport buchen</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,oklch(0.94_0.04_240)_0%,transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <HeartPulse className="h-3.5 w-3.5" /> Zertifizierter Krankenfahrdienst
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
              Sicherer Krankentransport — <span className="text-primary">menschlich, pünktlich, professionell.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              MediCus bringt Patienten zuverlässig zur Klinik, Dialyse oder nach Hause. Geschultes Personal,
              barrierefreie Fahrzeuge und transparente Echtzeit-Verfolgung — Tag und Nacht.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/patient/book">
                  Jetzt Fahrt anfordern <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+493012345678">
                  <Phone className="mr-1 h-4 w-4" /> 030 123 456 78
                </a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {[
                "24/7 Verfügbarkeit",
                "Krankenkassen anerkannt",
                "GPS-Live-Tracking",
                "DSGVO-konform",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Booking preview card */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_30px_60px_-30px_oklch(0.42_0.19_264_/_0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Schnellbuchung</h3>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                  Verfügbar
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-lg border border-border bg-surface px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Abholung</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-primary" /> Hauptstraße 12, 10115 Berlin
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Ziel</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                    <Building2 className="h-4 w-4 text-cyan-accent" /> Charité Universitätsmedizin
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-surface px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Datum</p>
                    <p className="mt-1 text-sm font-medium">Heute · 09:30</p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Typ</p>
                    <p className="mt-1 text-sm font-medium">Rollstuhl</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-5 w-full bg-primary hover:bg-primary/90" size="lg">
                <Link to="/patient/book">Fahrt anfordern</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Durchschnittliche Antwortzeit · <span className="font-semibold text-foreground">unter 90 Sekunden</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="leistungen" className="border-b border-border/60 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Unsere Leistungen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Spezialisiert auf medizinischen Patiententransport
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Accessibility, title: "Rollstuhltransport", text: "Barrierefreie Fahrzeuge mit zertifizierten Rampen und Sicherungssystemen." },
              { icon: HeartPulse, title: "Liegendtransport", text: "Professionelle Tragen-Beförderung mit medizinisch geschultem Personal." },
              { icon: Stethoscope, title: "Dialyse & Reha", text: "Wiederkehrende Fahrten zu Dialysezentren und Rehabilitations­einrichtungen." },
              { icon: Building2, title: "Klinik-Transfer", text: "Sichere Verlegung zwischen Krankenhäusern und Pflegeeinrichtungen." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="ablauf" className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">In drei Schritten</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                So einfach buchen Sie eine Fahrt
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Ob telefonisch oder online — unser Disponent koordiniert Fahrer und Fahrzeug
                in wenigen Augenblicken.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                { t: "Fahrt anfordern", d: "Adresse, Ziel und Transportart eingeben — oder rufen Sie uns an." },
                { t: "Bestätigung & Fahrer", d: "Disposition weist Fahrzeug zu, Sie erhalten Bestätigung und ETA." },
                { t: "Live-Verfolgung", d: "Verfolgen Sie das Fahrzeug in Echtzeit bis zur sicheren Ankunft." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-base font-semibold">{s.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Trust / portal access */}
      <section id="kontakt" className="bg-medical-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Vertraut von Kliniken, Pflegediensten und Patienten in ganz Berlin.
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">
              Mit unserem Dispositions-Cockpit behalten Sie Fahrten, Fahrer und Flotte
              jederzeit im Blick — entwickelt für medizinische Standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/admin">Disponenten-Portal</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/0 text-primary-foreground hover:bg-white/10">
                <Link to="/driver">Fahrer-App</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6" />
              <p className="text-sm font-semibold">Sicherheit & Compliance</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
              <li className="flex gap-2"><Clock className="h-4 w-4" /> 24/7 Notdisposition</li>
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4" /> DSGVO &amp; Schweigepflicht</li>
              <li className="flex gap-2"><HeartPulse className="h-4 w-4" /> Geschultes Sanitätspersonal</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">© 2026 MediCus Krankenfahrdienst · Berlin</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Impressum</a>
            <a href="#" className="hover:text-foreground">Datenschutz</a>
            <a href="#" className="hover:text-foreground">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
