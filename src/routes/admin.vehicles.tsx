import { createFileRoute } from "@tanstack/react-router";
import { vehicles } from "@/lib/mock-data";
import { Truck, Wrench } from "lucide-react";

export const Route = createFileRoute("/admin/vehicles")({
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Fahrzeugflotte</h1>
        <p className="mt-1 text-sm text-muted-foreground">Verfügbarkeit, Ausstattung und Wartung.</p>
      </header>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3 text-left">Kennzeichen</th>
              <th className="px-6 py-3 text-left">Typ</th>
              <th className="px-6 py-3 text-left">Fahrer</th>
              <th className="px-6 py-3 text-left">Verfügbar</th>
              <th className="px-6 py-3 text-left">Nächste Wartung</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-surface/60">
                <td className="px-6 py-3 font-mono text-sm">
                  <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> {v.plate}</span>
                </td>
                <td className="px-6 py-3">{v.type}</td>
                <td className="px-6 py-3 text-muted-foreground">{v.driver ?? "—"}</td>
                <td className="px-6 py-3">
                  <span className={
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium " +
                    (v.available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground")
                  }>
                    <span className={"h-1.5 w-1.5 rounded-full " + (v.available ? "bg-success" : "bg-muted-foreground")} />
                    {v.available ? "Verfügbar" : "Im Einsatz"}
                  </span>
                </td>
                <td className="px-6 py-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Wrench className="h-3.5 w-3.5" /> {v.nextService}</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="text-xs font-medium text-primary hover:underline">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
