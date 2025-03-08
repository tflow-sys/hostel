import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building2, Plus } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Triple';
  capacity: number;
  occupied: number;
  status: 'Available' | 'Full' | 'Maintenance';
}

const mockRooms: Room[] = [
  {
    id: '1',
    number: 'A101',
    type: 'Double',
    capacity: 2,
    occupied: 1,
    status: 'Available',
  },
  {
    id: '2',
    number: 'A102',
    type: 'Single',
    capacity: 1,
    occupied: 1,
    status: 'Full',
  },
  {
    id: '3',
    number: 'B201',
    type: 'Triple',
    capacity: 3,
    occupied: 2,
    status: 'Available',
  },
];

export default function RoomManagement() {
  const [rooms] = useState<Room[]>(mockRooms);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Room Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Occupied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {room.number}
                  </div>
                </TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.occupied}</TableCell>
                <TableCell>{room.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}