import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  AlertCircle,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  BedDouble,
  Utensils,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const occupancyData = [
  { month: "Jan", occupancy: 85, revenue: 45000000 },
  { month: "Feb", occupancy: 88, revenue: 48000000 },
  { month: "Mar", occupancy: 90, revenue: 52000000 },
  { month: "Apr", occupancy: 92, revenue: 49000000 },
  { month: "May", occupancy: 89, revenue: 51000000 },
  { month: "Jun", occupancy: 87, revenue: 50000000 },
];

const notifications = [
  {
    id: 1,
    title: "Room Maintenance Alert",
    description: "Block A needs urgent plumbing maintenance",
    time: "10 minutes ago",
    type: "alert",
  },
  {
    id: 2,
    title: "New Room Allocation",
    description: "15 new students allocated to Block B",
    time: "30 minutes ago",
    type: "info",
  },
  {
    id: 3,
    title: "Fee Payment Due",
    description: "20 students have pending payments",
    time: "1 hour ago",
    type: "warning",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Monitor and manage hostel operations efficiently
          </p>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            View All Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="stat-card">
              <div className="stat-value">250</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  2%
                </span>
                <span className="stat-label">from last month</span>
              </div>
            </div>
          </CardContent>
          <div className="dashboard-card-gradient" />
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="stat-card">
              <div className="stat-value">450</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  12%
                </span>
                <span className="stat-label">from last month</span>
              </div>
            </div>
          </CardContent>
          <div className="dashboard-card-gradient" />
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="stat-card">
              <div className="stat-value">15</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-red-500">
                  <ArrowDownRight className="h-4 w-4" />
                  8%
                </span>
                <span className="stat-label">from last week</span>
              </div>
            </div>
          </CardContent>
          <div className="dashboard-card-gradient" />
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="stat-card">
              <div className="stat-value">90%</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  5%
                </span>
                <span className="stat-label">from last month</span>
              </div>
            </div>
          </CardContent>
          <div className="dashboard-card-gradient" />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Occupancy & Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="occupancy"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Occupancy %"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                    name="Revenue (UGX)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <span
                    className={`mt-1 rounded-full p-2 ${
                      notification.type === 'alert'
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                        : notification.type === 'warning'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                    }`}
                  >
                    {notification.type === 'alert' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : notification.type === 'warning' ? (
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <BedDouble className="mr-2 h-4 w-4" />
              Allocate Rooms
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report Maintenance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Utensils className="mr-2 h-4 w-4" />
              Manage Meal Plans
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available Rooms</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Under Maintenance</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reserved</span>
                <span className="font-medium">10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">New Check-ins</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Complaints</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Visitors Today</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}