import logo from "@/assets/medicus-logo.png";

export function Logo({ className = "h-9", showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="MediCus — Ihr freundlicher Krankenfahrdienst" className={className} />
      {showTagline && (
        <span className="hidden text-xs font-medium text-muted-foreground md:inline">
          Ihr freundlicher Krankenfahrdienst
        </span>
      )}
    </div>
  );
}
