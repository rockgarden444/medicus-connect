import { createFileRoute, Link } from "@tanstack/react-router";
import { rides, drivers, vehicles, weeklyStats, transportLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/medicus/StatusBadge";
import { ArrowUpRight, Activity, Users, Truck, Clock, MapPin } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const active = rides.filter((r) => !["completed", "cancelled"].includes(r.status));
  const onlineDrivers = drivers.filter((d) => d.online).length;
  const availableVehicles = vehicles.filter((v) => v.available).length;
  const pending = rides.filter((r) => r.status === "pending").length;

  const kpis = [
    { label: "Aktive Fahrten heute", value: active.length, delta: "+12 %", icon: Activity, tone: "primary" as const },
    { label: "Fahrer online", value: `${onlineDrivers} / ${drivers.length}`, delta: "Live", icon: Users, tone: "info" as const },
    { label: "Verfügbare Fahrzeuge", value: `${availableVehicles} / ${vehicles.length}`, delta: "Flotte", icon: Truck, tone: "success" as const },
    { label: "Offene Anfragen", value: pending, delta: "Aktion nötig", icon: Clock, tone: "warning" as const },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Samstag, 9. Mai 2026</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Übersicht Disposition</h1>
        </div>
        <Link
          to="/admin/dispatch"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Live-Disposition öffnen <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k.label}</p>
              <span className={
                "flex h-8 w-8 items-center justify-center rounded-md " +
                (k.tone === "primary" ? "bg-primary-soft text-primary" :
                 k.tone === "info" ? "bg-info/15 text-info" :
                 k.tone === "success" ? "bg-success/15 text-success" :
                 "bg-warning/15 text-warning-foreground")
              }>
                <k.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{k.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.delta}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Fahrten der Woche</h2>
              <p className="text-xs text-muted-foreground">Geplant vs. abgeschlossen</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary" /> Geplant</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-success" /> Abgeschlossen</span>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStats} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.5 0.025 255)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.025 255)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "oklch(0.96 0.008 240)" }} contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 240)", fontSize: 12 }} />
                <Bar dataKey="rides" fill="oklch(0.42 0.19 264)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="oklch(0.62 0.16 152)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold">Schnellzugriff</h2>
          <ul className="mt-4 space-y-2">
            {[
              { to: "/admin/rides", label: "Fahrten verwalten" },
              { to: "/admin/drivers", label: "Fahrerflotte" },
              { to: "/admin/patients", label: "Patientenakten" },
              { to: "/admin/analytics", label: "Berichte exportieren" },
            ].map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium hover:border-primary/40 hover:bg-surface">
                  {q.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-base font-semibold">Aktive Fahrten</h2>
            <p className="text-xs text-muted-foreground">Echtzeit-Statusupdates</p>
          </div>
          <Link to="/admin/rides" className="text-sm font-medium text-primary hover:underline">Alle Fahrten →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3 text-left">Fahrt</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Route</th>
              <th className="px-6 py-3 text-left">Typ</th>
              <th className="px-6 py-3 text-left">Fahrer</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {active.map((r) => (
              <tr key={r.id} className="hover:bg-surface/60">
                <td className="px-6 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-6 py-3 font-medium">{r.patientName}</td>
                <td className="px-6 py-3 text-muted-foreground">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-primary" /> {r.pickup}</div>
                  <div className="ml-4 text-xs">→ {r.destination}</div>
                </td>
                <td className="px-6 py-3">{transportLabel[r.type]}</td>
                <td className="px-6 py-3">{r.driver ?? <span className="text-warning-foreground">— nicht zugewiesen</span>}</td>
                <td className="px-6 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
