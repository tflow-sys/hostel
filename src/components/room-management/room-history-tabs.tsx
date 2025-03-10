import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ClipboardList, MessageSquare, Users, PenTool as Tool, Bed, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomHistory {
  damages: Array<{
    id: string;
    date: string;
    description: string;
    status: 'Pending' | 'Repaired' | 'Scheduled';
    cost: number;
    reportedBy: string;
    repairDate?: string;
  }>;
  inventory: Array<{
    id: string;
    item: string;
    quantity: number;
    condition: 'Good' | 'Fair' | 'Poor';
    lastChecked: string;
    addedDate: string;
    replacementDate?: string;
  }>;
  complaints: Array<{
    id: string;
    date: string;
    description: string;
    status: 'Open' | 'Resolved' | 'In Progress';
    reportedBy: string;
    resolvedDate?: string;
    resolution?: string;
  }>;
  occupants: Array<{
    id: string;
    name: string;
    period: string;
    registrationNumber: string;
    status: 'Current' | 'Past';
    checkInDate: string;
    checkOutDate?: string;
    academicYear: string;
    intake: string;
  }>;
  maintenance: Array<{
    id: string;
    type: string;
    date: string;
    description: string;
    cost: number;
    status: 'Completed' | 'Scheduled' | 'In Progress';
    contractor?: string;
    nextMaintenanceDate?: string;
  }>;
}

interface RoomHistoryTabsProps {
  history: RoomHistory;
}

export function RoomHistoryTabs({ history }: RoomHistoryTabsProps) {
  return (
    <Tabs defaultValue="damages" className="space-y-4">
      <TabsList className="grid grid-cols-5 gap-4">
        <TabsTrigger value="damages" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Damages
        </TabsTrigger>
        <TabsTrigger value="inventory" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Inventory
        </TabsTrigger>
        <TabsTrigger value="complaints" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Complaints
        </TabsTrigger>
        <TabsTrigger value="occupants" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Occupants
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-2">
          <Tool className="h-4 w-4" />
          Maintenance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="damages">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Damage Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost (UGX)</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Repair Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.damages.map((damage) => (
                  <TableRow key={damage.id}>
                    <TableCell>{damage.date}</TableCell>
                    <TableCell>{damage.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          damage.status === 'Repaired'
                            ? 'default'
                            : damage.status === 'Pending'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {damage.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{damage.cost.toLocaleString()}</TableCell>
                    <TableCell>{damage.reportedBy}</TableCell>
                    <TableCell>{damage.repairDate || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="inventory">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Room Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Added Date</TableHead>
                  <TableHead>Replacement Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.condition === 'Good'
                            ? 'default'
                            : item.condition === 'Fair'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {item.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastChecked}</TableCell>
                    <TableCell>{item.addedDate}</TableCell>
                    <TableCell>{item.replacementDate || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="complaints">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Complaint History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Resolved Date</TableHead>
                  <TableHead>Resolution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          complaint.status === 'Resolved'
                            ? 'default'
                            : complaint.status === 'Open'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{complaint.reportedBy}</TableCell>
                    <TableCell>{complaint.resolvedDate || '-'}</TableCell>
                    <TableCell>{complaint.resolution || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="occupants">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Occupancy History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Registration Number</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Intake</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.occupants.map((occupant) => (
                  <TableRow key={occupant.id}>
                    <TableCell>{occupant.name}</TableCell>
                    <TableCell>{occupant.registrationNumber}</TableCell>
                    <TableCell>{occupant.academicYear}</TableCell>
                    <TableCell>{occupant.intake}</TableCell>
                    <TableCell>{occupant.checkInDate}</TableCell>
                    <TableCell>{occupant.checkOutDate || '-'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={occupant.status === 'Current' ? 'default' : 'secondary'}
                      >
                        {occupant.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="maintenance">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tool className="h-5 w-5" />
              Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Cost (UGX)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Next Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.maintenance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{record.cost.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === 'Completed'
                            ? 'default'
                            : record.status === 'Scheduled'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.contractor || '-'}</TableCell>
                    <TableCell>{record.nextMaintenanceDate || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}