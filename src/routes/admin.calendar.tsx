import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar")({
  component: CalendarPage,
});

const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const drivers = ["Markus W.", "Anna H.", "Tobias K.", "Sabine M."];
const blocks = [
  { driver: 0, h: 1, span: 2, label: "MC-2041 · Charité", tone: "primary" },
  { driver: 1, h: 2, span: 1, label: "MC-2042 · Heimfahrt", tone: "cyan" },
  { driver: 2, h: 3, span: 2, label: "MC-2043 · Dialyse", tone: "info" },
  { driver: 0, h: 5, span: 1, label: "MC-2045 · Charité", tone: "primary" },
  { driver: 3, h: 4, span: 2, label: "Reserve", tone: "muted" },
];

function CalendarPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fahrtkalender</h1>
          <p className="mt-1 text-sm text-muted-foreground">Heute · Samstag, 9. Mai 2026</p>
        </div>
      </header>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid" style={{ gridTemplateColumns: `140px repeat(${hours.length}, minmax(0,1fr))` }}>
          <div className="border-b border-r border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Fahrer</div>
          {hours.map((h) => (
            <div key={h} className="border-b border-r border-border bg-surface px-3 py-2 text-xs font-semibold text-muted-foreground">{h}</div>
          ))}
          {drivers.map((d, i) => (
            <>
              <div key={d} className="border-b border-r border-border px-3 py-4 text-sm font-semibold">{d}</div>
              {hours.map((h, hi) => {
                const block = blocks.find((b) => b.driver === i && b.h === hi);
                return (
                  <div key={d + h} className="relative h-16 border-b border-r border-border">
                    {block && (
                      <div
                        className={
                          "absolute inset-1 flex items-center rounded-md px-2 text-xs font-semibold " +
                          (block.tone === "primary" ? "bg-primary text-primary-foreground" :
                           block.tone === "cyan" ? "bg-cyan-accent/20 text-cyan-accent" :
                           block.tone === "info" ? "bg-info/15 text-info" :
                           "bg-muted text-muted-foreground")
                        }
                        style={{ width: `calc(${block.span * 100}% - 0.5rem)` }}
                      >
                        {block.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
