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
import { ClipboardCheck, Plus } from 'lucide-react';

interface Clearance {
  id: string;
  studentName: string;
  registrationNumber: string;
  roomNumber: string;
  clearanceType: 'Semester End' | 'Final' | 'Transfer';
  items: {
    fees: boolean;
    room: boolean;
    library: boolean;
    property: boolean;
  };
  status: 'Pending' | 'In Progress' | 'Cleared' | 'Rejected';
  submittedDate: string;
}

const mockClearances: Clearance[] = [
  {
    id: '1',
    studentName: 'John Doe',
    registrationNumber: 'NKU/2024/001',
    roomNumber: 'A101',
    clearanceType: 'Semester End',
    items: {
      fees: true,
      room: true,
      library: false,
      property: true,
    },
    status: 'In Progress',
    submittedDate: '2024-03-15',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    registrationNumber: 'NKU/2024/002',
    roomNumber: 'B202',
    clearanceType: 'Final',
    items: {
      fees: true,
      room: true,
      library: true,
      property: true,
    },
    status: 'Cleared',
    submittedDate: '2024-03-14',
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    registrationNumber: 'NKU/2023/150',
    roomNumber: 'C303',
    clearanceType: 'Transfer',
    items: {
      fees: false,
      room: true,
      library: true,
      property: false,
    },
    status: 'Pending',
    submittedDate: '2024-03-16',
  },
];

export default function ClearanceManagement() {
  const [clearances] = useState<Clearance[]>(mockClearances);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Clearance Management
          </h2>
          <p className="text-muted-foreground">
            Process and track student clearance requests
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Clearance
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clearances.map((clearance) => (
              <TableRow key={clearance.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{clearance.studentName}</span>
                  </div>
                </TableCell>
                <TableCell>{clearance.registrationNumber}</TableCell>
                <TableCell>{clearance.roomNumber}</TableCell>
                <TableCell>{clearance.clearanceType}</TableCell>
                <TableCell>
                  <span
                    className={`status-badge ${
                      clearance.status === 'Cleared'
                        ? 'status-badge-paid'
                        : clearance.status === 'Rejected'
                        ? 'status-badge-overdue'
                        : clearance.status === 'In Progress'
                        ? 'status-badge-pending'
                        : 'status-badge-maintenance'
                    }`}
                  >
                    {clearance.status}
                  </span>
                </TableCell>
                <TableCell>{clearance.submittedDate}</TableCell>
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