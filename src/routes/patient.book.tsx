import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Accessibility, HeartPulse, User, Users, MapPin, Building2, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patient/book")({
  component: BookRide,
});

const types = [
  { id: "standard", label: "Standard", icon: User, desc: "Sitzend, ohne Hilfsmittel" },
  { id: "wheelchair", label: "Rollstuhl", icon: Accessibility, desc: "Barrierefreies Fahrzeug" },
  { id: "stretcher", label: "Liegend", icon: HeartPulse, desc: "Tragenbeförderung" },
  { id: "elderly", label: "Begleitung", icon: Users, desc: "Senioren-Assistenz" },
] as const;

function BookRide() {
  const navigate = useNavigate();
  const [type, setType] = useState<typeof types[number]["id"]>("wheelchair");
  const [urgent, setUrgent] = useState(false);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); navigate({ to: "/patient/tracking" }); }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Transport buchen</h1>
        <p className="mt-1 text-sm text-muted-foreground">Geben Sie Ihre Fahrt­details ein.</p>
      </header>

      {/* Locations */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
        <div className="space-y-1.5">
          <Label htmlFor="pickup" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Abholort
          </Label>
          <Input id="pickup" defaultValue="Hauptstraße 12, 10115 Berlin" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dest" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 text-cyan-accent" /> Ziel
          </Label>
          <Input id="dest" placeholder="Krankenhaus, Praxis oder Adresse" defaultValue="Charité Universitätsmedizin" />
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="mb-3 text-sm font-semibold">Transportart</p>
        <div className="grid grid-cols-2 gap-3">
          {types.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition",
                type === t.id
                  ? "border-primary bg-primary-soft ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg",
                type === t.id ? "bg-primary text-primary-foreground" : "bg-surface text-primary")}>
                <t.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date / urgent */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Datum</Label>
            <Input id="date" type="date" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="time" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Uhrzeit</Label>
            <Input id="time" type="time" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setUrgent(!urgent)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition",
            urgent ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-surface",
          )}
        >
          <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Sofort / ASAP</span>
          <span className={cn("relative h-5 w-9 rounded-full transition", urgent ? "bg-destructive" : "bg-muted")}>
            <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-card transition", urgent ? "left-4" : "left-0.5")} />
          </span>
        </button>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hinweise (optional)</Label>
        <Textarea id="notes" placeholder="z. B. Etage, medizinische Hinweise, Begleitperson…" rows={3} />
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Geschätzte Wartezeit</span>
          <span className="font-semibold text-foreground">~ 8 Min</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-muted-foreground">
          <span>Distanz</span>
          <span className="font-semibold text-foreground">6,4 km</span>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
        <Calendar className="mr-2 h-4 w-4" /> Fahrt verbindlich buchen
      </Button>
    </form>
  );
}
