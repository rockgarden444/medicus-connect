import { createFileRoute } from "@tanstack/react-router";
import { patients } from "@/lib/mock-data";
import { Search, Plus, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/patients")({
  component: PatientsPage,
});

function PatientsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patientenakten</h1>
          <p className="mt-1 text-sm text-muted-foreground">{patients.length} aktive Patienten</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Neuer Patient
        </button>
      </header>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="Nach Name, Telefon oder ID suchen…" className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patients.map((p) => (
          <article key={p.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">{p.rides} Fahrten</span>
            </div>
            <p className="mt-3 text-base font-semibold">{p.name}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {p.phone}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {p.address}</p>
            {p.notes && (
              <p className="mt-3 rounded-md border-l-2 border-primary/40 bg-primary-soft px-3 py-2 text-xs text-primary">
                {p.notes}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
