import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/medicus/Logo";
import { rides, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { Phone, Navigation, CheckCircle2, MapPin, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/driver")({
  head: () => ({
    meta: [
      { title: "Fahrer-App — MediCus" },
      { name: "description", content: "MediCus Fahrer-App: zugewiesene Fahrten, Navigation und Statusupdates." },
    ],
  }),
  component: DriverApp,
});

function DriverApp() {
  const myRides = rides.filter((r) => ["driver_assigned", "driver_arriving", "in_transport", "accepted"].includes(r.status));
  const current = myRides[0];

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/"><Logo className="h-8 brightness-0 invert" /></Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-success/20 px-2.5 py-1 text-xs font-semibold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold">AH</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-4 py-5">
        <section>
          <p className="text-sm text-muted-foreground">Schicht aktiv · 06:00 — 18:00</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Hallo Anna</h1>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {[
            { l: "Heute", v: "5" },
            { l: "Erledigt", v: "2" },
            { l: "Distanz", v: "47 km" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{s.l}</p>
              <p className="mt-1 text-xl font-bold">{s.v}</p>
            </div>
          ))}
        </section>

        {current && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Aktuelle Fahrt</p>
              <StatusBadge status={current.status} />
            </div>
            <p className="mt-3 text-lg font-semibold">{current.patientName}</p>
            <p className="text-xs text-muted-foreground">{current.id} · {transportLabel[current.type]}</p>

            <div className="mt-4 space-y-3 rounded-xl bg-surface p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-[11px] font-semibold uppercase text-muted-foreground">Abholung</p>
                  <p className="text-sm font-medium">{current.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 text-cyan-accent" />
                <div>
                  <p className="text-[11px] font-semibold uppercase text-muted-foreground">Ziel</p>
                  <p className="text-sm font-medium">{current.destination}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" /> {current.scheduledAt}
                {current.eta && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">ETA {current.eta}</span>}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button className="bg-primary hover:bg-primary/90"><Navigation className="mr-1 h-4 w-4" /> Navi</Button>
              <Button variant="outline"><Phone className="mr-1 h-4 w-4" /> Patient</Button>
              <Button className="bg-success hover:bg-success/90 text-success-foreground"><CheckCircle2 className="mr-1 h-4 w-4" /> Status</Button>
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-base font-semibold">Nächste Fahrten</h2>
          <ul className="space-y-2">
            {myRides.slice(1).map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold">{r.patientName}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.scheduledAt} · {r.destination}</p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
            {myRides.length <= 1 && <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Keine weiteren Fahrten geplant.</p>}
          </ul>
        </section>
      </main>
    </div>
  );
}
