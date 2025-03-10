import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BedDouble,
  Users,
  Wrench,
  Ban,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface RoomStatistics {
  totalRooms: number;
  occupiedRooms: number;
  maintenanceRooms: number;
  reservedRooms: number;
  occupancyRate: number;
  occupancyTrend: {
    value: number;
    isPositive: boolean;
  };
}

interface RoomStatisticsProps {
  statistics: RoomStatistics;
}

export function RoomStatistics({ statistics }: RoomStatisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="stat-card">
            <div className="stat-value">{statistics.totalRooms}</div>
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
          <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="stat-card">
            <div className="stat-value">{statistics.occupiedRooms}</div>
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

      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="stat-card">
            <div className="stat-value">{statistics.maintenanceRooms}</div>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-red-500">
                <ArrowDownRight className="h-4 w-4" />
                3%
              </span>
              <span className="stat-label">from last week</span>
            </div>
          </div>
        </CardContent>
        <div className="dashboard-card-gradient" />
      </Card>

      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reserved Rooms</CardTitle>
          <Ban className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="stat-card">
            <div className="stat-value">{statistics.reservedRooms}</div>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-emerald-500">
                <ArrowUpRight className="h-4 w-4" />
                8%
              </span>
              <span className="stat-label">from last month</span>
            </div>
          </div>
        </CardContent>
        <div className="dashboard-card-gradient" />
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Occupancy Overview</CardTitle>
          <CardDescription>Current room occupancy status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Occupancy Rate</span>
              </div>
              <span className="text-sm font-medium">
                {statistics.occupancyRate}%
              </span>
            </div>
            <Progress value={statistics.occupancyRate} className="h-2" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className={`flex items-center ${
                  statistics.occupancyTrend.isPositive
                    ? 'text-emerald-500'
                    : 'text-red-500'
                }`}
              >
                {statistics.occupancyTrend.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {statistics.occupancyTrend.value}%
              </span>
              <span>from previous period</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}