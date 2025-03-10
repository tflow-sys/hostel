import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, X } from 'lucide-react';

interface RoomFilters {
  block?: string;
  floor?: string;
  type?: string;
  status?: string;
  occupancy?: string;
}

interface RoomFiltersProps {
  filters: RoomFilters;
  onFilterChange: (filters: RoomFilters) => void;
  onFilterClear: () => void;
  onApplyFilters: () => Promise<void>;
  isLoading?: boolean;
}

export function RoomFilters({
  filters,
  onFilterChange,
  onFilterClear,
  onApplyFilters,
  isLoading = false,
}: RoomFiltersProps) {
  const handleFilterChange = (key: keyof RoomFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} active</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClear}
              className="h-8 px-2 text-xs"
            >
              <X className="mr-1 h-4 w-4" />
              Clear all
            </Button>
          )}
          <Button
            size="sm"
            onClick={onApplyFilters}
            disabled={isLoading || activeFiltersCount === 0}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="block-filter">Block</Label>
          <Select
            value={filters.block}
            onValueChange={(value) => handleFilterChange('block', value)}
          >
            <SelectTrigger id="block-filter">
              <SelectValue placeholder="All blocks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Block A</SelectItem>
              <SelectItem value="B">Block B</SelectItem>
              <SelectItem value="C">Block C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="floor-filter">Floor</Label>
          <Select
            value={filters.floor}
            onValueChange={(value) => handleFilterChange('floor', value)}
          >
            <SelectTrigger id="floor-filter">
              <SelectValue placeholder="All floors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="G">Ground Floor</SelectItem>
              <SelectItem value="1">First Floor</SelectItem>
              <SelectItem value="2">Second Floor</SelectItem>
              <SelectItem value="3">Third Floor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type-filter">Room Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger id="type-filter">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Double">Double</SelectItem>
              <SelectItem value="Triple">Triple</SelectItem>
              <SelectItem value="Quad">Quad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Full">Full</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupancy-filter">Occupancy</Label>
          <Select
            value={filters.occupancy}
            onValueChange={(value) => handleFilterChange('occupancy', value)}
          >
            <SelectTrigger id="occupancy-filter">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empty">Empty</SelectItem>
              <SelectItem value="partial">Partially Occupied</SelectItem>
              <SelectItem value="full">Fully Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}