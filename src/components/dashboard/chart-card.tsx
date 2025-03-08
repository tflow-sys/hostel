import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartCardProps {
  title: string;
  data: any[];
  className?: string;
  dataKeys: {
    x: string;
    bars: Array<{
      key: string;
      color: string;
      name: string;
    }>;
  };
}

export function ChartCard({ title, data, className, dataKeys }: ChartCardProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKeys.x} />
              <YAxis />
              <Tooltip />
              {dataKeys.bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  fill={bar.color}
                  name={bar.name}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}