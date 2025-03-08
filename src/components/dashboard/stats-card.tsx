import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="stat-card">
          <div className="stat-value">{value}</div>
          {(trend || description) && (
            <div className="flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    "flex items-center",
                    trend.isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {trend.value}%
                </span>
              )}
              {description && (
                <span className="stat-label">{description}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <div className="dashboard-card-gradient" />
    </Card>
  );
}