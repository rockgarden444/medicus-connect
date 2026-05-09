import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/medicus/Logo";
import {
  LayoutDashboard,
  ListChecks,
  Calendar,
  MapPin,
  UserCircle,
  Truck,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Disposition — MediCus" },
      { name: "description", content: "Dispositions-Cockpit für MediCus: Fahrten, Fahrer, Flotte und Patienten in Echtzeit verwalten." },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Übersicht", icon: LayoutDashboard, exact: true },
  { to: "/admin/rides", label: "Fahrten", icon: ListChecks, exact: false },
  { to: "/admin/dispatch", label: "Live-Disposition", icon: MapPin, exact: false },
  { to: "/admin/calendar", label: "Kalender", icon: Calendar, exact: false },
  { to: "/admin/drivers", label: "Fahrer", icon: UserCircle, exact: false },
  { to: "/admin/vehicles", label: "Fahrzeuge", icon: Truck, exact: false },
  { to: "/admin/patients", label: "Patienten", icon: Users, exact: false },
  { to: "/admin/analytics", label: "Berichte", icon: BarChart3, exact: false },
  { to: "/admin/settings", label: "Einstellungen", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const { pathname } = useLocation();
  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-surface">
      {/* Sidebar */}
      <aside className="flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="border-b border-sidebar-border px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-8 brightness-0 invert" />
          </Link>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-sidebar-foreground/60">
            Disposition · Berlin
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              SD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Stefan Dietrich</p>
              <p className="text-xs text-sidebar-foreground/60">Disponent</p>
            </div>
            <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background px-8">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Fahrt-ID, Patient oder Fahrer suchen…"
              className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success" /> System aktiv
            </span>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
