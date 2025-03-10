import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Room } from "@/pages/room-management";

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  course: string;
  year: number;
  status: "Pending" | "Allocated" | "Cleared";
}

// Mock student data - in a real app, this would come from your backend
const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    registrationNumber: "NKU/2024/001",
    course: "Computer Science",
    year: 2,
    status: "Pending",
  },
  {
    id: "2",
    name: "Jane Smith",
    registrationNumber: "NKU/2024/002",
    course: "Business Administration",
    year: 1,
    status: "Pending",
  },
  {
    id: "3",
    name: "Mike Johnson",
    registrationNumber: "NKU/2024/003",
    course: "Engineering",
    year: 3,
    status: "Pending",
  },
  {
    id: "4",
    name: "Sarah Williams",
    registrationNumber: "NKU/2024/004",
    course: "Medicine",
    year: 2,
    status: "Pending",
  },
];

interface AllocateRoomDialogProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllocate: (studentIds: string[]) => Promise<void>;
}

export function AllocateRoomDialog({
  room,
  open,
  onOpenChange,
  onAllocate,
}: AllocateRoomDialogProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableSpace = room ? room.capacity - room.occupied : 0;

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.status === "Pending" &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      if (selectedStudents.length >= availableSpace) {
        toast({
          title: "Cannot Select More Students",
          description: `This room can only accommodate ${availableSpace} more student${
            availableSpace === 1 ? "" : "s"
          }`,
          variant: "destructive",
        });
        return;
      }
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    }
  };

  const handleAllocate = async () => {
    if (!selectedStudents.length) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student to allocate",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await onAllocate(selectedStudents);
      setSelectedStudents([]);
      onOpenChange(false);
    } catch {
      toast({
        title: "Allocation Failed",
        description: "Failed to allocate room to selected students",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Allocate Room {room.number}</DialogTitle>
          <DialogDescription>
            Select students to allocate to this room. Available space:{" "}
            {availableSpace} student
            {availableSpace === 1 ? "" : "s"}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name or registration number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedStudents.length === filteredStudents.length &&
                        filteredStudents.length > 0
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const availableStudents = filteredStudents
                            .slice(0, availableSpace)
                            .map((s) => s.id);
                          setSelectedStudents(availableStudents);
                        } else {
                          setSelectedStudents([]);
                        }
                      }}
                      disabled={filteredStudents.length === 0}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) =>
                            handleSelectStudent(student.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.registrationNumber}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>Year {student.year}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAllocate}
              disabled={selectedStudents.length === 0 || isLoading}
            >
              <Check className="mr-2 h-4 w-4" />
              Allocate Selected Students
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
