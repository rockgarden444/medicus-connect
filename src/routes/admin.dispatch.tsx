import { createFileRoute } from "@tanstack/react-router";
import { rides, drivers, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { Phone, Navigation } from "lucide-react";

export const Route = createFileRoute("/admin/dispatch")({
  component: DispatchPage,
});

function DispatchPage() {
  const active = rides.filter((r) => !["completed", "cancelled"].includes(r.status));
  return (
    <div className="grid h-[calc(100vh-9rem)] grid-cols-[320px_1fr_320px] gap-4">
      {/* Pending list */}
      <aside className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Anfragen heute</p>
          <h2 className="mt-0.5 text-base font-semibold">{active.length} aktiv</h2>
        </div>
        <ul className="flex-1 divide-y divide-border overflow-y-auto">
          {active.map((r) => (
            <li key={r.id} className="cursor-pointer px-4 py-3 hover:bg-surface">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                <StatusBadge status={r.status} />
              </div>
              <p className="mt-1 text-sm font-semibold">{r.patientName}</p>
              <p className="text-xs text-muted-foreground">{r.scheduledAt} · {transportLabel[r.type]}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">→ {r.destination}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Live map */}
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.94_0.04_240)_0%,oklch(0.97_0.01_240)_70%)]" />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="g2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.92 0.01 240)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g2)" />
          <path d="M 80 400 Q 250 320 380 280 T 700 140" stroke="oklch(0.42 0.19 264)" strokeWidth="3" fill="none" />
          <path d="M 200 100 Q 350 200 500 260 T 800 320" stroke="oklch(0.65 0.13 230)" strokeWidth="3" fill="none" strokeDasharray="6 4" />
        </svg>
        {[
          { x: "20%", y: "60%", l: "B-MC 1042", c: "bg-primary" },
          { x: "55%", y: "40%", l: "B-MC 2210", c: "bg-cyan-accent" },
          { x: "78%", y: "25%", l: "B-MC 0918", c: "bg-success" },
          { x: "35%", y: "30%", l: "B-MC 3301", c: "bg-warning" },
        ].map((p) => (
          <div key={p.l} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full ${p.c} ring-4 ring-background`}>
              <span className="h-2 w-2 rounded-full bg-white/70" />
            </span>
            <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-0.5 text-[10px] font-semibold shadow-md">
              {p.l}
            </span>
          </div>
        ))}
        <div className="absolute right-4 top-4 rounded-md border border-border bg-card px-3 py-2 text-xs shadow-md">
          <p className="font-semibold">Live-Karte Berlin</p>
          <p className="mt-0.5 text-muted-foreground">4 Fahrzeuge aktiv</p>
        </div>
      </section>

      {/* Drivers */}
      <aside className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fahrer</p>
          <h2 className="mt-0.5 text-base font-semibold">Verfügbarkeit</h2>
        </div>
        <ul className="flex-1 divide-y divide-border overflow-y-auto">
          {drivers.map((d) => (
            <li key={d.id} className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                    {d.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card ${d.online ? "bg-success" : "bg-muted-foreground/40"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.vehicle}{d.currentRide ? ` · Fahrt ${d.currentRide}` : ""}</p>
                </div>
                <button className="rounded-md border border-border p-1.5 hover:bg-surface"><Phone className="h-3.5 w-3.5" /></button>
                <button className="rounded-md border border-border p-1.5 hover:bg-surface"><Navigation className="h-3.5 w-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
