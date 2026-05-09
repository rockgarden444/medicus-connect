import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/medicus/Logo";
import { Bell, Home, Plus, MapPin, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patient")({
  head: () => ({
    meta: [
      { title: "Patient — MediCus" },
      { name: "description", content: "Buchen Sie Ihren Krankentransport, verfolgen Sie Ihre Fahrt live und sehen Sie Ihre Historie." },
    ],
  }),
  component: PatientLayout,
});

const tabs = [
  { to: "/patient", label: "Start", icon: Home, exact: true },
  { to: "/patient/book", label: "Buchen", icon: Plus },
  { to: "/patient/tracking", label: "Verfolgen", icon: MapPin },
  { to: "/patient/history", label: "Verlauf", icon: Clock },
  { to: "/patient/profile", label: "Profil", icon: User },
] as const;

function PatientLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/"><Logo className="h-8" /></Link>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">
        <Outlet />
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-5">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium transition",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <t.icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
