import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Einstellungen</h1>
        <p className="mt-1 text-sm text-muted-foreground">Organisations- und Systemeinstellungen.</p>
      </header>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold">Organisation</h2>
        <div className="mt-4 grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="org">Firmenname</Label>
            <Input id="org" defaultValue="MediCus Krankenfahrdienst GmbH" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Telefon Disposition</Label><Input defaultValue="030 123 456 78" /></div>
            <div className="space-y-1.5"><Label>E-Mail</Label><Input defaultValue="dispatch@medicus.de" /></div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold">Benachrichtigungen</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {["Neue Fahrtanfrage", "Fahrer-Update", "Wartung fällig", "Tagesabschluss"].map((t) => (
            <li key={t} className="flex items-center justify-between rounded-md border border-border px-4 py-3">
              <span>{t}</span>
              <span className="relative h-5 w-9 rounded-full bg-primary">
                <span className="absolute left-4 top-0.5 h-4 w-4 rounded-full bg-card" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Button className="bg-primary hover:bg-primary/90">Änderungen speichern</Button>
    </div>
  );
}
