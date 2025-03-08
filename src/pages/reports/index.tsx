import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const occupancyData = [
  { month: 'Jan', occupancy: 85 },
  { month: 'Feb', occupancy: 88 },
  { month: 'Mar', occupancy: 90 },
  { month: 'Apr', occupancy: 92 },
  { month: 'May', occupancy: 89 },
  { month: 'Jun', occupancy: 87 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000000 },
  { month: 'Feb', revenue: 48000000 },
  { month: 'Mar', revenue: 52000000 },
  { month: 'Apr', revenue: 49000000 },
  { month: 'May', revenue: 51000000 },
  { month: 'Jun', revenue: 50000000 },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="hsl(var(--chart-1))" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (UGX)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(var(--chart-2))" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}