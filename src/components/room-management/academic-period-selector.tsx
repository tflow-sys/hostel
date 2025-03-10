import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface AcademicPeriodSelectorProps {
  onYearChange: (year: string) => void;
  onIntakeChange: (intake: string) => void;
  onLoad: () => Promise<void>;
  isLoading?: boolean;
}

export function AcademicPeriodSelector({
  onYearChange,
  onIntakeChange,
  onLoad,
  isLoading = false,
}: AcademicPeriodSelectorProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex items-center gap-4">
      <div className="grid gap-2">
        <Label htmlFor="year">Academic Year</Label>
        <Select onValueChange={onYearChange} defaultValue={currentYear.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="intake">Intake</Label>
        <Select onValueChange={onIntakeChange} defaultValue="february">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select intake" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="february">February Intake</SelectItem>
            <SelectItem value="august">August Intake</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>&nbsp;</Label>
        <Button onClick={onLoad} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Load Data
        </Button>
      </div>
    </div>
  );
}