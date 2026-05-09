import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, MapPin, Building2, Clock, CheckCircle2, Circle } from "lucide-react";
import { StatusBadge } from "@/components/medicus/StatusBadge";

export const Route = createFileRoute("/patient/tracking")({
  component: Tracking,
});

const steps = [
  { label: "Anfrage akzeptiert", done: true, time: "09:12" },
  { label: "Fahrer zugewiesen", done: true, time: "09:14" },
  { label: "Fahrer unterwegs", done: true, time: "09:18" },
  { label: "Patient an Bord", done: false, time: "—" },
  { label: "Ziel erreicht", done: false, time: "—" },
];

function Tracking() {
  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fahrt MC-2041</p>
          <h1 className="text-2xl font-bold tracking-tight">Live-Verfolgung</h1>
        </div>
        <StatusBadge status="driver_arriving" />
      </header>

      {/* Map placeholder */}
      <div className="relative h-64 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.94_0.04_240)_0%,oklch(0.97_0.01_240)_70%)]" />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.92 0.01 240)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M 40 220 Q 140 180 200 140 T 360 60" stroke="oklch(0.42 0.19 264)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="0" />
        </svg>
        <div className="absolute left-8 top-12 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold shadow-md">
          <span className="h-2 w-2 rounded-full bg-cyan-accent" /> Fahrzeug
        </div>
        <div className="absolute bottom-10 right-10 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold shadow-md">
          <Building2 className="h-3.5 w-3.5 text-primary" /> Charité
        </div>
        <div className="absolute right-3 top-3 rounded-md bg-card px-2.5 py-1 text-xs font-semibold shadow-md">
          ETA · <span className="text-primary">4 Min</span>
        </div>
      </div>

      {/* Driver card */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary">
            AH
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Ihr Fahrer</p>
            <p className="text-base font-semibold">Anna Hoffmann</p>
            <p className="text-xs text-muted-foreground">B-MC 2210 · Liegendtransport</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline"><MessageSquare className="h-4 w-4" /></Button>
            <Button size="icon" className="bg-success hover:bg-success/90"><Phone className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Abholung</p>
            <p className="text-sm font-medium">Hauptstraße 12, 10115 Berlin</p>
          </div>
        </div>
        <div className="ml-2 h-4 border-l-2 border-dashed border-border" />
        <div className="flex items-start gap-3">
          <Building2 className="mt-0.5 h-4 w-4 text-cyan-accent" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ziel</p>
            <p className="text-sm font-medium">Charité Universitätsmedizin</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="mb-4 text-sm font-semibold">Status-Verlauf</p>
        <ol className="space-y-4">
          {steps.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              {s.done ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground/40" />
              )}
              <span className={s.done ? "text-sm font-medium" : "text-sm text-muted-foreground"}>{s.label}</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {s.time}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
