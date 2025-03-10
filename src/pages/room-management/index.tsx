import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddRoomDialog as ImportedAddRoomDialog } from "@/components/room-management/add-room-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2 } from "lucide-react";
import { InputWithSearch } from "@/components/ui/input-with-search";
import { AcademicPeriodSelector } from "@/components/room-management/academic-period-selector";
import { RoomStatistics } from "@/components/room-management/room-statistics";
import { RoomDetailsDialog } from "@/components/room-management/room-details-dialog";
import { RoomFilters } from "@/components/room-management/room-filters";
import { BulkActions } from "@/components/room-management/bulk-actions";
import { useToast } from "@/hooks/use-toast";

// Extended Room interface with more details
export interface Room {
  id: string;
  number: string;
  block: string;
  floor: string;
  type: "Single" | "Double" | "Triple" | "Quad";
  capacity: number;
  occupied: number;
  price: number;
  features: string[];
  status: "Available" | "Full" | "Maintenance";
  maintenanceHistory: {
    date: string;
    type: string;
    description: string;
    cost: number;
    status: "Completed" | "Pending" | "In Progress";
  }[];
  currentOccupants: {
    id: string;
    name: string;
    registrationNumber: string;
    checkInDate: string;
    expectedCheckOut: string;
  }[];
  amenities: {
    name: string;
    status: "Working" | "Not Working" | "Needs Attention";
  }[];
}

// Generate more mock data
const generateMockRooms = (count: number): Room[] => {
  const blocks = ["A", "B", "C"];
  const floors = ["1", "2", "3"];
  const types = ["Single", "Double", "Triple", "Quad"] as const;

  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const capacity =
      type === "Single" ? 1 : type === "Double" ? 2 : type === "Triple" ? 3 : 4;
    const occupied = Math.floor(Math.random() * (capacity + 1));
    const block = blocks[Math.floor(Math.random() * blocks.length)];
    const floor = floors[Math.floor(Math.random() * floors.length)];

    return {
      id: (i + 1).toString(),
      number: `${block}${floor}${((i % 20) + 1).toString().padStart(2, "0")}`,
      block,
      floor,
      type,
      capacity,
      occupied,
      price: 500000 + Math.floor(Math.random() * 5) * 100000,
      features: [
        "Air Conditioning",
        "Private Bathroom",
        "Study Table",
        "Wardrobe",
        "Reading Lamp",
      ].slice(0, Math.floor(Math.random() * 5) + 1),
      status:
        occupied >= capacity
          ? "Full"
          : Math.random() > 0.9
          ? "Maintenance"
          : "Available",
      maintenanceHistory: [],
      currentOccupants: [],
      amenities: [
        { name: "Air Conditioner", status: "Working" },
        { name: "Study Lamp", status: "Working" },
        { name: "Ceiling Fan", status: "Needs Attention" },
      ],
    };
  });
};

const mockRooms = generateMockRooms(50);

const mockStatistics = {
  totalRooms: mockRooms.length,
  occupiedRooms: mockRooms.filter((r) => r.occupied > 0).length,
  maintenanceRooms: mockRooms.filter((r) => r.status === "Maintenance").length,
  reservedRooms: Math.floor(mockRooms.length * 0.1),
  occupancyRate: Math.floor(
    (mockRooms.reduce((acc, r) => acc + r.occupied, 0) /
      mockRooms.reduce((acc, r) => acc + r.capacity, 0)) *
      100
  ),
  occupancyTrend: {
    value: 5,
    isPositive: true,
  },
};

export default function RoomManagement() {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedIntake, setSelectedIntake] = useState("february");
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  interface RoomFilters {
    block?: string;
    floor?: string;
    type?: string;
    status?: string;
    occupancy?: string;
  }

  const [filters, setFilters] = useState<RoomFilters>({});
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleLoadData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate new mock data for the selected period
    const newRooms = generateMockRooms(Math.floor(Math.random() * 20) + 40);
    setRooms(newRooms);

    toast({
      title: "Data Loaded Successfully",
      description: `Loaded room data for ${selectedYear} ${selectedIntake} intake`,
    });
    setIsLoading(false);
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Apply filters to the current rooms (in a real app, this would be a server call)
    const filteredRooms = mockRooms.filter((room) => {
      if (filters.block && room.block !== filters.block) return false;
      if (filters.floor && room.floor !== filters.floor) return false;
      if (filters.type && room.type !== filters.type) return false;
      if (filters.status && room.status !== filters.status) return false;
      if (filters.occupancy) {
        if (filters.occupancy === "empty" && room.occupied > 0) return false;
        if (
          filters.occupancy === "partial" &&
          (room.occupied === 0 || room.occupied === room.capacity)
        )
          return false;
        if (filters.occupancy === "full" && room.occupied !== room.capacity)
          return false;
      }
      return true;
    });

    setRooms(filteredRooms);
    toast({
      title: "Filters Applied",
      description: `Found ${filteredRooms.length} rooms matching the criteria`,
    });
    setIsLoading(false);
  };

  const handleBulkAction = async (action: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Bulk Action Completed",
      description: `Successfully performed ${action} on ${selectedRooms.length} room(s)`,
    });
    setSelectedRooms([]);
    setIsLoading(false);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toLowerCase().includes(searchTerm) ||
      room.type.toLowerCase().includes(searchTerm) ||
      room.status.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
          <p className="text-muted-foreground">
            Manage and monitor hostel rooms efficiently
          </p>
        </div>
        <ImportedAddRoomDialog
          onRoomAdded={(room: Room) => setRooms([...rooms, room])}
        />
      </div>

      <div className="flex items-center justify-between">
        <AcademicPeriodSelector
          onYearChange={setSelectedYear}
          onIntakeChange={setSelectedIntake}
          onLoad={handleLoadData}
          isLoading={isLoading}
        />
      </div>

      <RoomStatistics statistics={mockStatistics} />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <InputWithSearch
              onSearch={handleSearch}
              placeholder="Search by room number, type, or status..."
            />
          </div>
          {selectedRooms.length > 0 && (
            <BulkActions
              selectedRooms={selectedRooms}
              onAction={handleBulkAction}
            />
          )}
        </div>

        <RoomFilters
          filters={filters}
          onFilterChange={setFilters}
          onFilterClear={() => setFilters({})}
          onApplyFilters={handleApplyFilters}
          isLoading={isLoading}
        />
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRooms.length === filteredRooms.length &&
                    filteredRooms.length > 0
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRooms(filteredRooms.map((room) => room.id));
                    } else {
                      setSelectedRooms([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Occupied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price (UGX)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow
                key={room.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedRoom(room);
                  setIsDetailsOpen(true);
                }}
              >
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRooms([...selectedRooms, room.id]);
                      } else {
                        setSelectedRooms(
                          selectedRooms.filter((id) => id !== room.id)
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {room.number}
                  </div>
                </TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.occupied}</TableCell>
                <TableCell>
                  <span
                    className={`status-badge ${
                      room.status === "Available"
                        ? "status-badge-available"
                        : room.status === "Full"
                        ? "status-badge-full"
                        : "status-badge-maintenance"
                    }`}
                  >
                    {room.status}
                  </span>
                </TableCell>
                <TableCell>{room.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">
                    Click to view details
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoomDetailsDialog
        room={selectedRoom}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
}

interface AddRoomDialogProps {
  onRoomAdded: (room: Room) => void;
}

export function AddRoomDialog({
  onRoomAdded,
}: AddRoomDialogProps): JSX.Element {
  return (
    <button
      onClick={() => {
        const newRoom: Room = {
          id: Date.now().toString(),
          number: "",
          block: "",
          floor: "",
          type: "Single",
          capacity: 1,
          occupied: 0,
          price: 0,
          features: [],
          status: "Available",
          maintenanceHistory: [],
          currentOccupants: [],
          amenities: [],
        };
        onRoomAdded(newRoom);
      }}
    >
      Add Room
    </button>
  );
}
