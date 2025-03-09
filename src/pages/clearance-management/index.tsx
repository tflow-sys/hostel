"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardCheck, Plus } from "lucide-react";
import { InputWithSearch } from "@/components/ui/input-with-search";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
import { StudentClearanceModal } from "./student-clearance-modal";

interface ClearanceItem {
  name: string;
  status: "cleared" | "pending" | "failed";
  description?: string;
}

interface Clearance {
  id: string;
  studentName: string;
  registrationNumber: string;
  roomNumber: string;
  clearanceType: "Semester End" | "Final" | "Transfer";
  items: {
    fees: boolean;
    room: boolean;
    library: boolean;
    property: boolean;
  };
  status: "Pending" | "In Progress" | "Cleared" | "Rejected";
  submittedDate: string;
  clearanceItems: ClearanceItem[];
  department?: string;
  photoUrl?: string;
}

type ClearanceStatus = "approved" | "pending" | "rejected";

// Map clearance status to the format expected by StudentClearanceModal
const mapClearanceStatus = (
  status: "cleared" | "pending" | "failed"
): ClearanceStatus => {
  switch (status) {
    case "cleared":
      return "approved";
    case "pending":
      return "pending";
    case "failed":
      return "rejected";
    default:
      return "pending";
  }
};

const mockClearances: Clearance[] = [
  {
    id: "1",
    studentName: "John Doe",
    registrationNumber: "NKU/2024/001",
    roomNumber: "A101",
    clearanceType: "Semester End",
    items: {
      fees: true,
      room: true,
      library: false,
      property: true,
    },
    status: "In Progress",
    submittedDate: "2024-03-15",
    clearanceItems: [
      {
        name: "Outstanding Fees",
        status: "cleared",
        description: "All fees paid",
      },
      {
        name: "Room Condition",
        status: "cleared",
        description: "Room in good condition",
      },
      {
        name: "Library Books",
        status: "pending",
        description: "2 books pending return",
      },
      {
        name: "Property Damage",
        status: "cleared",
        description: "No damage reported",
      },
      {
        name: "Disciplinary Record",
        status: "cleared",
        description: "No incidents reported",
      },
    ],
    department: "Computer Science",
    photoUrl: "https://images.app.goo.gl/gK7qGEQfcGnVWwQd8",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    registrationNumber: "NKU/2024/002",
    roomNumber: "B202",
    clearanceType: "Final",
    items: {
      fees: true,
      room: true,
      library: true,
      property: true,
    },
    status: "Cleared",
    submittedDate: "2024-03-14",
    clearanceItems: [
      {
        name: "Outstanding Fees",
        status: "cleared",
        description: "All fees paid",
      },
      {
        name: "Room Condition",
        status: "cleared",
        description: "Room in good condition",
      },
      {
        name: "Library Books",
        status: "cleared",
        description: "All books returned",
      },
      {
        name: "Property Damage",
        status: "cleared",
        description: "No damage reported",
      },
      {
        name: "Disciplinary Record",
        status: "cleared",
        description: "No incidents reported",
      },
    ],
    department: "Business Administration",
    photoUrl: "https://images.app.goo.gl/gK7qGEQfcGnVWwQd8",
  },
  {
    id: "3",
    studentName: "Mike Johnson",
    registrationNumber: "NKU/2023/150",
    roomNumber: "C303",
    clearanceType: "Transfer",
    items: {
      fees: false,
      room: true,
      library: true,
      property: false,
    },
    status: "Pending",
    submittedDate: "2024-03-16",
    clearanceItems: [
      {
        name: "Outstanding Fees",
        status: "failed",
        description: "Balance: 500,000 UGX",
      },
      {
        name: "Room Condition",
        status: "cleared",
        description: "Room in good condition",
      },
      {
        name: "Library Books",
        status: "cleared",
        description: "All books returned",
      },
      {
        name: "Property Damage",
        status: "failed",
        description: "Damaged furniture reported",
      },
      {
        name: "Disciplinary Record",
        status: "cleared",
        description: "No incidents reported",
      },
    ],
    department: "Engineering",
    photoUrl: "https://images.app.goo.gl/gK7qGEQfcGnVWwQd8",
  },
];

export default function ClearanceManagement() {
  const [clearances] = useState<Clearance[]>(mockClearances);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClearance, setSelectedClearance] = useState<Clearance | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredClearances = clearances.filter(
    (clearance) =>
      clearance.studentName.toLowerCase().includes(searchTerm) ||
      clearance.registrationNumber.toLowerCase().includes(searchTerm) ||
      clearance.roomNumber.toLowerCase().includes(searchTerm)
  );

  // Convert clearance data to the format expected by StudentClearanceModal
  const mapToStudentData = (clearance: Clearance) => {
    // Find the status of each clearance item
    const hostelAdmin =
      clearance.clearanceItems.find(
        (item) => item.name === "Room Condition" || item.name.includes("Room")
      )?.status || "pending";

    const roomInspection =
      clearance.clearanceItems.find(
        (item) =>
          item.name === "Property Damage" || item.name.includes("Property")
      )?.status || "pending";

    const keyProperty =
      clearance.clearanceItems.find(
        (item) => item.name.includes("Library") || item.name.includes("Books")
      )?.status || "pending";

    const finance =
      clearance.clearanceItems.find(
        (item) => item.name === "Outstanding Fees" || item.name.includes("Fees")
      )?.status || "pending";

    return {
      id: clearance.id,
      name: clearance.studentName,
      studentNumber: clearance.registrationNumber,
      department: clearance.department || "Not specified",
      hostel: clearance.roomNumber.charAt(0) + " Block",
      room: clearance.roomNumber,
      photoUrl:
        clearance.photoUrl || "https://images.app.goo.gl/gK7qGEQfcGnVWwQd8",
      clearanceStatus: {
        hostelAdmin: mapClearanceStatus(hostelAdmin),
        roomInspection: mapClearanceStatus(roomInspection),
        keyProperty: mapClearanceStatus(keyProperty),
        finance: mapClearanceStatus(finance),
      },
    };
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClearance(null);
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
                  <Badge
                    variant={
                      clearance.status === "Cleared"
                        ? "default"
                        : clearance.status === "Rejected"
                        ? "destructive"
                        : clearance.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {clearance.status}
                  </Badge>
                </TableCell>
                <TableCell>{clearance.submittedDate}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedClearance(clearance);
                      setIsModalOpen(true);
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

      {/* Render the StudentClearanceModal when a clearance is selected */}
      {selectedClearance && (
        <StudentClearanceModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          student={mapToStudentData(selectedClearance)}
        />
      )}
    </div>
  );
}
