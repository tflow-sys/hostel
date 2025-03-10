import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BedDouble,
  Users,
  Banknote,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface RoomDetails {
  id: string;
  number: string;
  block: string;
  floor: string;
  type: string;
  capacity: number;
  occupied: number;
  price: number;
  features: string[];
  status: "Available" | "Full" | "Maintenance";
  maintenanceHistory: {
    date: string;
    type: string;
    description: string;
    cost: number;
    status: "Completed" | "Pending" | "In Progress";
  }[];
  currentOccupants: {
    id: string;
    name: string;
    registrationNumber: string;
    checkInDate: string;
    expectedCheckOut: string;
  }[];
  amenities: {
    name: string;
    status: "Working" | "Not Working" | "Needs Attention";
  }[];
}

interface RoomDetailsDialogProps {
  room: RoomDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomDetailsDialog({
  room,
  open,
  onOpenChange,
}: RoomDetailsDialogProps) {
  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            Room {room.number}
            <Badge
              variant={
                room.status === "Available"
                  ? "default"
                  : room.status === "Full"
                  ? "destructive"
                  : "secondary"
              }
            >
              {room.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {room.block}, Floor {room.floor}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <BedDouble className="h-4 w-4 text-muted-foreground" />
                Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {room.occupied}/{room.capacity}
              </div>
              <p className="text-sm text-muted-foreground">Beds occupied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-muted-foreground" />
                Room Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{room.type}</div>
              <p className="text-sm text-muted-foreground">
                {room.capacity} person room
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Banknote className="h-4 w-4 text-muted-foreground" />
                Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {room.price.toLocaleString()} UGX
              </div>
              <p className="text-sm text-muted-foreground">Per semester</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="features">Features & Amenities</TabsTrigger>
            <TabsTrigger value="occupants">Current Occupants</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Features</CardTitle>
                  <CardDescription>
                    Available features in this room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {room.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Amenities Status</CardTitle>
                  <CardDescription>
                    Current status of room amenities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {room.amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{amenity.name}</span>
                        <Badge
                          variant={
                            amenity.status === "Working"
                              ? "default"
                              : amenity.status === "Not Working"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {amenity.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occupants">
            <Card>
              <CardHeader>
                <CardTitle>Current Occupants</CardTitle>
                <CardDescription>
                  Students currently staying in this room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.currentOccupants.map((occupant) => (
                    <div
                      key={occupant.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{occupant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {occupant.registrationNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          Check-in: {occupant.checkInDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expected check-out: {occupant.expectedCheckOut}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>
                  Recent maintenance activities and repairs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.maintenanceHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between border-b pb-4 last:border-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {record.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : record.status === "Pending" ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <p className="font-medium">{record.type}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {record.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {record.cost.toLocaleString()} UGX
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {record.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Edit Room</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
