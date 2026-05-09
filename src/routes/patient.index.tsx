import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { rides, statusLabel, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { Plus, MapPin, Phone, Calendar, ArrowRight, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/patient/")({
  component: PatientHome,
});

function PatientHome() {
  const upcoming = rides.filter((r) => r.status !== "completed" && r.status !== "cancelled").slice(0, 1)[0];
  const recent = rides.filter((r) => r.status === "completed").slice(0, 3);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm text-muted-foreground">Guten Morgen,</p>
        <h1 className="text-2xl font-bold tracking-tight">Frau Schmidt</h1>
      </section>

      <Button asChild size="lg" className="h-auto w-full justify-between rounded-xl bg-primary py-5 text-left hover:bg-primary/90">
        <Link to="/patient/book">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <Plus className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold">Neuen Transport buchen</span>
              <span className="block text-xs font-normal text-primary-foreground/80">Antwort in unter 90 Sekunden</span>
            </span>
          </span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </Button>

      {upcoming && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nächste Fahrt</p>
            <StatusBadge status={upcoming.status} />
          </div>
          <p className="mt-3 text-lg font-semibold">{upcoming.destination}</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {upcoming.pickup}</p>
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {upcoming.scheduledAt} · {transportLabel[upcoming.type]}</p>
            {upcoming.driver && <p className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" /> Fahrer: {upcoming.driver}</p>}
          </div>
          <div className="mt-5 flex gap-2">
            <Button asChild className="flex-1"><Link to="/patient/tracking">Live verfolgen</Link></Button>
            <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Letzte Fahrten</h2>
          <Link to="/patient/history" className="text-xs font-medium text-primary hover:underline">Alle ansehen</Link>
        </div>
        <ul className="mt-3 space-y-2">
          {recent.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-semibold">{r.destination}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.scheduledAt} · {transportLabel[r.type]}</p>
              </div>
              <StatusBadge status={r.status} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-primary-soft p-5">
        <p className="text-sm font-semibold text-primary">Notfall-Kontakt</p>
        <p className="mt-1 text-xs text-primary/80">24/7 erreichbar — wir sind für Sie da.</p>
        <Button asChild variant="outline" className="mt-4 w-full border-primary/30 bg-card">
          <a href="tel:+493012345678"><Phone className="mr-2 h-4 w-4" /> 030 123 456 78</a>
        </Button>
      </section>
    </div>
  );
}
