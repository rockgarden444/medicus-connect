import { createFileRoute } from "@tanstack/react-router";
import { rides, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { Filter, Download, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/rides")({
  component: RidesPage,
});

function RidesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fahrten verwalten</h1>
          <p className="mt-1 text-sm text-muted-foreground">Alle geplanten und laufenden Krankentransporte.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-surface">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-surface">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Neue Fahrt
          </button>
        </div>
      </header>

      <div className="flex gap-1 rounded-md border border-border bg-card p-1 text-sm">
        {["Alle", "Heute", "Pending", "In Transport", "Abgeschlossen"].map((t, i) => (
          <button key={t} className={
            "rounded px-4 py-1.5 font-medium transition " +
            (i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface")
          }>{t}</button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Abholung</th>
              <th className="px-6 py-3 text-left">Ziel</th>
              <th className="px-6 py-3 text-left">Zeit</th>
              <th className="px-6 py-3 text-left">Typ</th>
              <th className="px-6 py-3 text-left">Fahrer</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rides.map((r) => (
              <tr key={r.id} className="hover:bg-surface/60">
                <td className="px-6 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-6 py-3 font-medium">{r.patientName}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.pickup}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.destination}</td>
                <td className="px-6 py-3">{r.scheduledAt}</td>
                <td className="px-6 py-3">{transportLabel[r.type]}</td>
                <td className="px-6 py-3">{r.driver ?? "—"}</td>
                <td className="px-6 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
