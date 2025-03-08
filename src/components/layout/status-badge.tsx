import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function StatusBadge({
  status,
  variant = 'info',
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'status-badge',
        {
          'status-badge-available': variant === 'success',
          'status-badge-maintenance': variant === 'warning',
          'status-badge-full': variant === 'error',
          'status-badge-pending': variant === 'info',
        },
        className
      )}
    >
      {status}
    </span>
  );
}