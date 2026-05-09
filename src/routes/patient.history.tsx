import { createFileRoute } from "@tanstack/react-router";
import { rides, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/patient/history")({
  component: History,
});

function History() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Fahrtverlauf</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alle bisherigen und kommenden Fahrten.</p>
      </header>
      <ul className="space-y-3">
        {rides.map((r) => (
          <li key={r.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted-foreground">{r.id}</p>
              <StatusBadge status={r.status} />
            </div>
            <p className="mt-2 text-base font-semibold">{r.destination}</p>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {r.pickup}</p>
              <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {r.scheduledAt} · {transportLabel[r.type]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
