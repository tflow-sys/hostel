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
import { AlertCircle, Plus } from 'lucide-react';

interface Complaint {
  id: string;
  studentName: string;
  roomNumber: string;
  type: 'Maintenance' | 'Plumbing' | 'Electrical' | 'Other';
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
}

const mockComplaints: Complaint[] = [
  {
    id: '1',
    studentName: 'John Doe',
    roomNumber: 'A101',
    type: 'Plumbing',
    status: 'Open',
    date: '2024-03-15',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    roomNumber: 'B202',
    type: 'Electrical',
    status: 'In Progress',
    date: '2024-03-14',
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    roomNumber: 'C303',
    type: 'Maintenance',
    status: 'Resolved',
    date: '2024-03-13',
  },
];

export default function ComplaintManagement() {
  const [complaints] = useState<Complaint[]>(mockComplaints);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Complaint Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Complaint
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">
                  {complaint.studentName}
                </TableCell>
                <TableCell>{complaint.roomNumber}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {complaint.status}
                  </div>
                </TableCell>
                <TableCell>{complaint.date}</TableCell>
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