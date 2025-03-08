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
import { CreditCard, Plus } from 'lucide-react';

interface Fee {
  id: string;
  studentName: string;
  roomNumber: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

const mockFees: Fee[] = [
  {
    id: '1',
    studentName: 'John Doe',
    roomNumber: 'A101',
    amount: 500000,
    status: 'Paid',
    dueDate: '2024-03-15',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    roomNumber: 'B202',
    amount: 500000,
    status: 'Pending',
    dueDate: '2024-03-20',
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    roomNumber: 'C303',
    amount: 500000,
    status: 'Overdue',
    dueDate: '2024-03-10',
  },
];

export default function FeeManagement() {
  const [fees] = useState<Fee[]>(mockFees);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Amount (UGX)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.studentName}</TableCell>
                <TableCell>{fee.roomNumber}</TableCell>
                <TableCell>{fee.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {fee.status}
                  </div>
                </TableCell>
                <TableCell>{fee.dueDate}</TableCell>
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