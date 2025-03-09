"use client";

import { useState } from "react";
import {
  User,
  Building,
  Home,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Status types for clearance sections
type ClearanceStatus = "pending" | "approved" | "rejected" | "more-info";

// Student data interface
interface StudentData {
  id: string;
  name: string;
  studentNumber: string;
  department: string;
  hostel: string;
  room: string;
  photoUrl: string;
  clearanceStatus: {
    hostelAdmin: ClearanceStatus;
    roomInspection: ClearanceStatus;
    keyProperty: ClearanceStatus;
    finance: ClearanceStatus;
  };
}

interface StudentClearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData;
}

export function StudentClearanceModal({
  isOpen,
  onClose,
  student,
}: StudentClearanceModalProps) {
  // State to track clearance status
  const [clearanceStatus, setClearanceStatus] = useState<
    Record<string, ClearanceStatus>
  >(student.clearanceStatus);

  // Add toast functionality
  const { toast } = useToast();

  // Calculate overall progress
  const calculateProgress = () => {
    const totalSections = Object.keys(clearanceStatus).length;
    const approvedSections = Object.values(clearanceStatus).filter(
      (status) => status === "approved"
    ).length;
    return (approvedSections / totalSections) * 100;
  };

  // Update status for a specific section
  const updateStatus = (section: string, status: ClearanceStatus) => {
    setClearanceStatus((prev) => ({
      ...prev,
      [section]: status,
    }));
  };

  // Check if all sections are approved
  const isFullyCleared = Object.values(clearanceStatus).every(
    (status) => status === "approved"
  );

  // Handle proceed action
  const handleProceed = () => {
    // Logic to proceed with the clearance process
    console.log("Proceeding with clearance for", student.name);

    // Show success toast
    toast({
      title: "Clearance Successful",
      description: `${student.name} has been successfully cleared.`,
      variant: "default",
    });

    // Close the modal after successful clearance
    onClose();

    // In a real app, this would navigate to the next step or finalize the process
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <DialogHeader className="px-6 py-4">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Student Clearance
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Review and process clearance requirements
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-4">
          {/* Student Information Section */}
          <div className="bg-muted/40 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
                  <img
                    src={
                      student.photoUrl ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{student.name}</h3>
                  <p className="text-muted-foreground font-medium">
                    {student.studentNumber}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-3 bg-background rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Department
                      </p>
                      <p className="font-medium">{student.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-background rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Hostel
                      </p>
                      <p className="font-medium">{student.hostel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-background rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Room Number
                      </p>
                      <p className="font-medium">{student.room}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Clearance Progress</p>
                    <p className="text-sm font-medium">
                      {Math.round(calculateProgress())}%
                    </p>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Clearance Sections */}
          <div className="space-y-6 py-4">
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Clearance Requirements
            </h2>

            {/* Hostel Administration Section */}
            <ClearanceSection
              title="Hostel Administration Approval"
              description="Confirmation that the student has followed all hostel regulations"
              status={clearanceStatus.hostelAdmin}
              onStatusChange={(status) => updateStatus("hostelAdmin", status)}
            />

            {/* Room Inspection Section */}
            <ClearanceSection
              title="Room Inspection & Damage Assessment"
              description="Verification that the room is in acceptable condition"
              status={clearanceStatus.roomInspection}
              onStatusChange={(status) =>
                updateStatus("roomInspection", status)
              }
            />

            {/* Key & Property Return Section */}
            <ClearanceSection
              title="Key & Property Return Confirmation"
              description="Confirmation that all keys and hostel property have been returned"
              status={clearanceStatus.keyProperty}
              onStatusChange={(status) => updateStatus("keyProperty", status)}
            />

            {/* Finance Office Section */}
            <ClearanceSection
              title="Finance Office Clearance"
              description="Verification that all financial obligations have been met"
              status={clearanceStatus.finance}
              onStatusChange={(status) => updateStatus("finance", status)}
            />
          </div>
        </div>

        {/* Certificate Generation */}
        <DialogFooter className="bg-muted/30 border-t px-6 py-4">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full",
                  isFullyCleared
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                )}
              >
                {isFullyCleared ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <div>
                <p className="font-medium">Overall Status</p>
                <p
                  className={cn(
                    "text-sm",
                    isFullyCleared
                      ? "text-green-600 dark:text-green-400"
                      : "text-amber-600 dark:text-amber-400"
                  )}
                >
                  {isFullyCleared ? "Fully Cleared" : "Pending Clearance"}
                </p>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={handleProceed}
                      disabled={!isFullyCleared}
                      className="gap-2 px-6"
                      size="lg"
                    >
                      Proceed
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isFullyCleared
                    ? "Proceed to the next step in the clearance process"
                    : "All sections must be approved before proceeding"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Clearance Section Component
interface ClearanceSectionProps {
  title: string;
  description: string;
  status: ClearanceStatus;
  onStatusChange: (status: ClearanceStatus) => void;
}

function ClearanceSection({
  title,
  description,
  status,
  onStatusChange,
}: ClearanceSectionProps) {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader
        className={cn(
          "pb-3",
          status === "approved" && "bg-green-50/50 dark:bg-green-950/20",
          status === "rejected" && "bg-red-50/50 dark:bg-red-950/20",
          status === "more-info" && "bg-amber-50/50 dark:bg-amber-950/20"
        )}
      >
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription className="mt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-sm">
          {status === "more-info" && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-md mb-4 border border-amber-200 dark:border-amber-800/50">
              <p className="font-medium flex items-center gap-1.5 mb-1">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Additional Information Required
              </p>
              <p className="text-amber-700 dark:text-amber-400">
                Please provide more details about the student's situation.
              </p>
            </div>
          )}

          {status === "rejected" && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 rounded-md mb-4 border border-red-200 dark:border-red-800/50">
              <p className="font-medium flex items-center gap-1.5 mb-1">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                Clearance Rejected
              </p>
              <p className="text-red-700 dark:text-red-400">
                The student has not met the requirements for this section.
              </p>
            </div>
          )}

          {status === "approved" && (
            <div className="p-4 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 rounded-md mb-4 border border-green-200 dark:border-green-800/50">
              <p className="font-medium flex items-center gap-1.5 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                Clearance Approved
              </p>
              <p className="text-green-700 dark:text-green-400">
                The student has successfully met all requirements for this
                section.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 bg-muted/30 border-t py-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={status === "more-info" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange("more-info")}
                className={cn(
                  status === "more-info" &&
                    "bg-amber-600 hover:bg-amber-700 text-white"
                )}
              >
                <AlertCircle className="mr-1 h-4 w-4 text-amber-600" />
                Request Info
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Request additional information from the student
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={status === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange("rejected")}
                className={cn(
                  status === "rejected" &&
                    "bg-red-600 hover:bg-red-700 text-white"
                )}
              >
                <XCircle className="mr-1 h-4 w-4 text-red-600" />
                Reject
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reject this clearance requirement</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={status === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange("approved")}
                className={cn(
                  status === "approved" &&
                    "bg-green-600 hover:bg-green-700 text-white"
                )}
              >
                <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                Approve
              </Button>
            </TooltipTrigger>
            <TooltipContent>Approve this clearance requirement</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: ClearanceStatus }) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50 dark:hover:bg-green-900/40">
          <CheckCircle className="mr-1 h-3 w-3 text-green-600 dark:text-green-400" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50 dark:hover:bg-red-900/40">
          <XCircle className="mr-1 h-3 w-3 text-red-600 dark:text-red-400" />
          Rejected
        </Badge>
      );
    case "more-info":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800/50 dark:hover:bg-amber-900/40">
          <AlertCircle className="mr-1 h-3 w-3 text-amber-600 dark:text-amber-400" />
          Info Requested
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 dark:bg-slate-900/40 dark:text-slate-300 dark:border-slate-800/50 dark:hover:bg-slate-900/40"
        >
          <Clock className="mr-1 h-3 w-3 text-slate-600 dark:text-slate-400" />
          Pending
        </Badge>
      );
  }
}
