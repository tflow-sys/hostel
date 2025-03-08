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
import { UserCheck, Plus } from 'lucide-react';

interface Attendance {
  id: string;
  studentName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string | null;
  status: 'In' | 'Out' | 'Leave';
}

const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentName: 'John Doe',
    roomNumber: 'A101',
    checkIn: '2024-03-15 08:00',
    checkOut: null,
    status: 'In',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    roomNumber: 'B202',
    checkIn: '2024-03-15 07:30',
    checkOut: '2024-03-15 17:00',
    status: 'Out',
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    roomNumber: 'C303',
    checkIn: '2024-03-14 09:00',
    checkOut: null,
    status: 'Leave',
  },
];

export default function AttendanceManagement() {
  const [attendance] = useState<Attendance[]>(mockAttendance);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Attendance Management
        </h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Record Entry/Exit
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.studentName}</TableCell>
                <TableCell>{record.roomNumber}</TableCell>
                <TableCell>{record.checkIn}</TableCell>
                <TableCell>{record.checkOut || '-'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    {record.status}
                  </div>
                </TableCell>
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