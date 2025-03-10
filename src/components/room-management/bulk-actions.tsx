import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

interface BulkActionsProps {
  selectedRooms: string[];
  onAction: (action: string) => Promise<void>;
}

export function BulkActions({ selectedRooms, onAction }: BulkActionsProps) {
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<{
    type: string;
    title: string;
    description: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: string) => {
    switch (action) {
      case 'maintenance':
        setCurrentAction({
          type: action,
          title: 'Mark Rooms for Maintenance',
          description: `Are you sure you want to mark ${selectedRooms.length} room(s) for maintenance? This will temporarily make them unavailable for allocation.`,
        });
        break;
      case 'clear':
        setCurrentAction({
          type: action,
          title: 'Clear Room Allocation',
          description: `Are you sure you want to clear the allocation for ${selectedRooms.length} room(s)? This will remove all current occupants.`,
        });
        break;
      case 'export':
        setIsLoading(true);
        await onAction(action);
        setIsLoading(false);
        return;
    }
    setIsActionDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (!currentAction) return;
    setIsLoading(true);
    await onAction(currentAction.type);
    setIsLoading(false);
    setIsActionDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Bulk Actions'
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel>
            {selectedRooms.length} room(s) selected
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction('maintenance')}>
            Mark for Maintenance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('clear')}>
            Clear Allocation
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction('export')}>
            Export Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isActionDialogOpen}
        onOpenChange={setIsActionDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{currentAction?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {currentAction?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}