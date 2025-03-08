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
import { ClipboardCheck, Plus, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputWithSearch } from '@/components/ui/input-with-search';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ClearanceItem {
  name: string;
  status: 'cleared' | 'pending' | 'failed';
  description?: string;
}

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
  clearanceItems: ClearanceItem[];
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
    clearanceItems: [
      { name: 'Outstanding Fees', status: 'cleared', description: 'All fees paid' },
      { name: 'Room Condition', status: 'cleared', description: 'Room in good condition' },
      { name: 'Library Books', status: 'pending', description: '2 books pending return' },
      { name: 'Property Damage', status: 'cleared', description: 'No damage reported' },
      { name: 'Disciplinary Record', status: 'cleared', description: 'No incidents reported' },
    ],
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
    clearanceItems: [
      { name: 'Outstanding Fees', status: 'cleared', description: 'All fees paid' },
      { name: 'Room Condition', status: 'cleared', description: 'Room in good condition' },
      { name: 'Library Books', status: 'cleared', description: 'All books returned' },
      { name: 'Property Damage', status: 'cleared', description: 'No damage reported' },
      { name: 'Disciplinary Record', status: 'cleared', description: 'No incidents reported' },
    ],
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
    clearanceItems: [
      { name: 'Outstanding Fees', status: 'failed', description: 'Balance: 500,000 UGX' },
      { name: 'Room Condition', status: 'cleared', description: 'Room in good condition' },
      { name: 'Library Books', status: 'cleared', description: 'All books returned' },
      { name: 'Property Damage', status: 'failed', description: 'Damaged furniture reported' },
      { name: 'Disciplinary Record', status: 'cleared', description: 'No incidents reported' },
    ],
  },
];

export default function ClearanceManagement() {
  const [clearances, setClearances] = useState<Clearance[]>(mockClearances);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClearance, setSelectedClearance] = useState<Clearance | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredClearances = clearances.filter((clearance) =>
    clearance.studentName.toLowerCase().includes(searchTerm) ||
    clearance.registrationNumber.toLowerCase().includes(searchTerm) ||
    clearance.roomNumber.toLowerCase().includes(searchTerm)
  );

  const handleClearStudent = (clearance: Clearance) => {
    const allCleared = clearance.clearanceItems.every(
      (item) => item.status === 'cleared'
    );

    if (allCleared) {
      const updatedClearances = clearances.map((c) =>
        c.id === clearance.id ? { ...c, status: 'Cleared' } : c
      );
      setClearances(updatedClearances);
      toast({
        title: "Clearance Approved",
        description: `${clearance.studentName} has been successfully cleared.`,
      });
    } else {
      toast({
        title: "Cannot Clear Student",
        description: "All clearance items must be cleared first.",
        variant: "destructive",
      });
    }
    setIsDetailsOpen(false);
  };

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

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <InputWithSearch
            onSearch={handleSearch}
            placeholder="Search by name, registration number, or room..."
          />
        </div>
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
            {filteredClearances.map((clearance) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedClearance(clearance);
                      setIsDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Clearance Details</DialogTitle>
            <DialogDescription>
              Review clearance status and requirements
            </DialogDescription>
          </DialogHeader>

          {selectedClearance && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Student Information</h4>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>Name: {selectedClearance.studentName}</p>
                    <p>Registration: {selectedClearance.registrationNumber}</p>
                    <p>Room: {selectedClearance.roomNumber}</p>
                    <p>Clearance Type: {selectedClearance.clearanceType}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Current Status</h4>
                  <div className="mt-2">
                    <Badge variant={selectedClearance.status === 'Cleared' ? 'default' : 'secondary'}>
                      {selectedClearance.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Clearance Requirements</h4>
                <div className="space-y-4">
                  {selectedClearance.clearanceItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.status === 'cleared'
                            ? 'default'
                            : item.status === 'failed'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => handleClearStudent(selectedClearance)}
                  disabled={selectedClearance.status === 'Cleared'}
                >
                  Clear Student
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}