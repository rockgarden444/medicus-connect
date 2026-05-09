import type { RideStatus } from "@/lib/mock-data";
import { statusLabel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const styles: Record<RideStatus, string> = {
  pending: "bg-warning/15 text-warning-foreground border-warning/30",
  accepted: "bg-info/15 text-info border-info/30",
  driver_assigned: "bg-info/15 text-info border-info/30",
  driver_arriving: "bg-cyan-accent/15 text-cyan-accent border-cyan-accent/30",
  in_transport: "bg-primary/10 text-primary border-primary/30",
  completed: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

export function StatusBadge({ status, className }: { status: RideStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}
