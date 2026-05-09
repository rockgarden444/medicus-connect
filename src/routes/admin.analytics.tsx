import { createFileRoute } from "@tanstack/react-router";
import { weeklyStats } from "@/lib/mock-data";
import { Download } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

const monthly = [
  { m: "Dez", v: 1180 }, { m: "Jan", v: 1250 }, { m: "Feb", v: 1310 },
  { m: "Mär", v: 1280 }, { m: "Apr", v: 1390 }, { m: "Mai", v: 1485 },
];

function AnalyticsPage() {
  const total = weeklyStats.reduce((s, d) => s + d.rides, 0);
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Berichte</h1>
          <p className="mt-1 text-sm text-muted-foreground">Operative Kennzahlen und Auslastung.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-surface">
          <Download className="h-4 w-4" /> Export PDF
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Fahrten / Woche", v: total },
          { l: "Pünktlichkeit", v: "97,4 %" },
          { l: "Ø Wartezeit", v: "8 Min" },
          { l: "Auslastung Flotte", v: "82 %" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k.l}</p>
            <p className="mt-2 text-2xl font-bold">{k.v}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold">Fahrten — letzte 6 Monate</h2>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.42 0.19 264)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.42 0.19 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" vertical={false} />
              <XAxis dataKey="m" stroke="oklch(0.5 0.025 255)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.5 0.025 255)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 240)", fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="oklch(0.42 0.19 264)" strokeWidth={2} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
