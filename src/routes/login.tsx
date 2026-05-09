import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/medicus/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ShieldCheck, HeartPulse, Users } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Anmelden — MediCus" },
      { name: "description", content: "Melden Sie sich bei MediCus an, um Ihren Krankentransport zu buchen oder zu verwalten." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"patient" | "dispatcher" | "driver">("patient");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "patient") navigate({ to: "/patient" });
    else if (role === "dispatcher") navigate({ to: "/admin" });
    else navigate({ to: "/driver" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-medical-gradient text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link to="/"><Logo className="h-10 brightness-0 invert" /></Link>
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-balance">
            Sichere Mobilität für Patienten — koordiniert in Echtzeit.
          </h2>
          <p className="mt-5 max-w-md text-primary-foreground/85">
            Eine Plattform für Patienten, Disposition und Fahrer.
          </p>
          <div className="mt-10 grid gap-4">
            {[
              { i: ShieldCheck, t: "DSGVO-konform & verschlüsselt" },
              { i: HeartPulse, t: "Medizinischer Standard" },
              { i: Users, t: "Patient · Disposition · Fahrer" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <x.i className="h-4 w-4" />
                </span>
                {x.t}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-primary-foreground/70">© 2026 MediCus Krankenfahrdienst</p>
      </div>

      {/* Right form */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><Logo /></div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight">Willkommen zurück</h1>
          <p className="mt-1 text-sm text-muted-foreground">Wählen Sie Ihren Zugang und melden Sie sich an.</p>

          <div className="mt-6 grid grid-cols-3 gap-1 rounded-lg border border-border bg-surface p-1 text-xs font-medium">
            {(["patient", "dispatcher", "driver"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={
                  "rounded-md px-2 py-2 transition " +
                  (role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")
                }
              >
                {r === "patient" ? "Patient" : r === "dispatcher" ? "Disposition" : "Fahrer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-Mail oder Telefon</Label>
              <Input id="email" type="text" placeholder="name@medicus.de" required />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Passwort vergessen?</a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
              Anmelden
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Noch kein Konto? <a href="#" className="font-medium text-primary hover:underline">Registrieren</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
