import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Shield, FileText, LogOut } from "lucide-react";

export const Route = createFileRoute("/patient/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-5">
      <header className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          HS
        </div>
        <div>
          <h1 className="text-xl font-bold">Hannelore Schmidt</h1>
          <p className="text-sm text-muted-foreground">Patientin · seit 2024</p>
        </div>
      </header>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold">Persönliche Daten</p>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Hannelore Schmidt" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" defaultValue="+49 30 1112233" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addr">Hauptadresse</Label>
            <Input id="addr" defaultValue="Hauptstraße 12, 10115 Berlin" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact">Kontaktperson</Label>
            <Input id="contact" defaultValue="Klaus Schmidt · +49 30 9988776" />
          </div>
        </div>
        <Button className="w-full">Speichern</Button>
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {[
          { i: Bell, t: "Benachrichtigungen" },
          { i: Shield, t: "Datenschutz & DSGVO" },
          { i: FileText, t: "Medizinische Hinweise" },
        ].map((x) => (
          <button key={x.t} className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm hover:bg-surface">
            <x.i className="h-4 w-4 text-primary" /> {x.t}
          </button>
        ))}
      </ul>

      <Button variant="outline" className="w-full text-destructive hover:text-destructive">
        <LogOut className="mr-2 h-4 w-4" /> Abmelden
      </Button>
    </div>
  );
}
