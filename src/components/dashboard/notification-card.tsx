import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, Bell, Building2 } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "alert" | "warning" | "info";
}

interface NotificationCardProps {
  notifications: Notification[];
  className?: string;
}

export function NotificationCard({ notifications, className }: NotificationCardProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4">
              <span
                className={cn(
                  "mt-1 rounded-full p-2",
                  notification.type === "alert"
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                    : notification.type === "warning"
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                )}
              >
                {notification.type === "alert" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : notification.type === "warning" ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <Building2 className="h-4 w-4" />
                )}
              </span>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}