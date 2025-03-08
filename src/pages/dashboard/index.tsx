import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  AlertCircle,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const occupancyData = [
  { month: "Jan", occupancy: 85 },
  { month: "Feb", occupancy: 88 },
  { month: "Mar", occupancy: 90 },
  { month: "Apr", occupancy: 92 },
  { month: "May", occupancy: 89 },
  { month: "Jun", occupancy: 87 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Here's an overview of your hostel's performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Active Complaints
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <BarChart
                width={600}
                height={350}
                data={occupancyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="occupancy"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New student check-in
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Room A101 assigned to John Doe
                  </p>
                </div>
                <div className="ml-auto font-medium">2m ago</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Maintenance completed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Plumbing issue in Room B202 resolved
                  </p>
                </div>
                <div className="ml-auto font-medium">1h ago</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Payment received
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hostel fee payment from Jane Smith
                  </p>
                </div>
                <div className="ml-auto font-medium">3h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
