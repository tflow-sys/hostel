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
import { Users, Plus } from 'lucide-react';
import { InputWithSearch } from '@/components/ui/input-with-search';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  roomNumber: string;
  course: string;
  year: number;
  contact: string;
  status: 'Active' | 'Inactive' | 'Graduated';
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    registrationNumber: 'NKU/2024/001',
    roomNumber: 'A101',
    course: 'Bachelor of Computer Science',
    year: 2,
    contact: '+256 700 123456',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    registrationNumber: 'NKU/2024/002',
    roomNumber: 'B202',
    course: 'Bachelor of Business Administration',
    year: 3,
    contact: '+256 701 234567',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    registrationNumber: 'NKU/2023/150',
    roomNumber: 'C303',
    course: 'Bachelor of Engineering',
    year: 4,
    contact: '+256 702 345678',
    status: 'Active',
  },
];

export default function StudentManagement() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.registrationNumber.toLowerCase().includes(searchTerm) ||
      student.roomNumber.toLowerCase().includes(searchTerm) ||
      student.course.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">
            Manage student records and accommodation details
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <InputWithSearch
            onSearch={handleSearch}
            placeholder="Search by name, registration number, room, or course..."
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>{student.registrationNumber}</TableCell>
                <TableCell>{student.roomNumber}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>Year {student.year}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>
                  <span className="status-badge status-badge-available">
                    {student.status}
                  </span>
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