import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddRoomDialog } from "@/components/room-management/add-room-dialog";
import { AllocateRoomDialog } from "@/components/room-management/allocate-room-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users } from "lucide-react";
import { InputWithSearch } from "@/components/ui/input-with-search";
import { AcademicPeriodSelector } from "@/components/room-management/academic-period-selector";
import { RoomStatistics } from "@/components/room-management/room-statistics";
import { RoomDetailsDialog } from "@/components/room-management/room-details-dialog";
import { RoomFilters } from "@/components/room-management/room-filters";
import { BulkActions } from "@/components/room-management/bulk-actions";
import { Button } from "@/components/ui/button";
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
  const [filters, setFilters] = useState<{
    block?: string;
    floor?: string;
    type?: string;
    status?: string;
    occupancy?: string;
  }>({});
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [roomToAllocate, setRoomToAllocate] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleLoadData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Bulk Action Completed",
      description: `Successfully performed ${action} on ${selectedRooms.length} room(s)`,
    });
    setSelectedRooms([]);
    setIsLoading(false);
  };

  const handleAllocateRoom = (room: Room) => {
    if (room.status === "Maintenance") {
      toast({
        title: "Cannot Allocate Room",
        description: "This room is currently under maintenance",
        variant: "destructive",
      });
      return;
    }

    if (room.status === "Full") {
      toast({
        title: "Cannot Allocate Room",
        description: "This room is already at full capacity",
        variant: "destructive",
      });
      return;
    }

    setRoomToAllocate(room);
    setIsAllocateOpen(true);
  };

  const handleAllocateStudents = async (studentIds: string[]) => {
    if (!roomToAllocate) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedRooms = rooms.map((room) => {
      if (room.id === roomToAllocate.id) {
        const newOccupied = room.occupied + studentIds.length;
        const newStatus: "Available" | "Full" | "Maintenance" =
          newOccupied >= room.capacity ? "Full" : "Available";
        return {
          ...room,
          occupied: newOccupied,
          status: newStatus,
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    setIsLoading(false);

    toast({
      title: "Room Allocated",
      description: `Successfully allocated ${studentIds.length} student(s) to room ${roomToAllocate.number}`,
    });
  };

  const handleAddRoom = (newRoom: Room) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    toast({
      title: "Room Added",
      description: `Successfully added room ${newRoom.number}`,
    });
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
        <AddRoomDialog onRoomAdded={handleAddRoom} />
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
          <div className="flex items-center gap-2">
            {selectedRooms.length > 0 && (
              <BulkActions
                selectedRooms={selectedRooms}
                onAction={handleBulkAction}
              />
            )}
            <Button
              onClick={() => {
                const room = rooms.find((r) => r.id === selectedRooms[0]);
                if (room) handleAllocateRoom(room);
              }}
              disabled={selectedRooms.length !== 1 || isLoading}
            >
              <Users className="mr-2 h-4 w-4" />
              Allocate Room
            </Button>
          </div>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAllocateRoom(room);
                    }}
                    disabled={room.status !== "Available"}
                  >
                    {room.status === "Available" ? "Allocate" : room.status}
                  </Button>
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

      <AllocateRoomDialog
        room={roomToAllocate}
        open={isAllocateOpen}
        onOpenChange={setIsAllocateOpen}
        onAllocate={handleAllocateStudents}
      />
    </div>
  );
}
