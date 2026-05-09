import { createFileRoute } from "@tanstack/react-router";
import { drivers } from "@/lib/mock-data";
import { Phone, Star } from "lucide-react";

export const Route = createFileRoute("/admin/drivers")({
  component: DriversPage,
});

function DriversPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Fahrerflotte</h1>
        <p className="mt-1 text-sm text-muted-foreground">Verfügbarkeit, Bewertungen und Zuweisungen.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {drivers.map((d) => (
          <article key={d.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary">
                  {d.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-card ${d.online ? "bg-success" : "bg-muted-foreground/40"}`} />
              </div>
              <div>
                <p className="text-base font-semibold">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.vehicle}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-md bg-surface px-3 py-2">
                <p className="text-muted-foreground">Status</p>
                <p className={`mt-0.5 font-semibold ${d.online ? "text-success" : "text-muted-foreground"}`}>{d.online ? "Online" : "Offline"}</p>
              </div>
              <div className="rounded-md bg-surface px-3 py-2">
                <p className="text-muted-foreground">Bewertung</p>
                <p className="mt-0.5 flex items-center gap-1 font-semibold"><Star className="h-3 w-3 fill-warning text-warning" /> {d.rating}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{d.phone}</span>
              <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:bg-surface">
                <Phone className="h-3 w-3" /> Kontakt
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
