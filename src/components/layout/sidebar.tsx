import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Building2,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  UserCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Users,
  BedDouble,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Room Management', href: '/rooms', icon: BedDouble },
  { name: 'Student Management', href: '/students', icon: Users },
  { name: 'Fee Management', href: '/fees', icon: CreditCard },
  { name: 'Complaints', href: '/complaints', icon: MessageSquare },
  { name: 'Attendance', href: '/attendance', icon: UserCheck },
  { name: 'Clearance', href: '/clearance', icon: ClipboardCheck },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        'fixed inset-y-0 z-50 flex flex-col transition-all duration-300',
        open ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4 ring-1 ring-border">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className={cn(
              'flex items-center gap-x-3',
              !open && 'justify-center w-full'
            )}
          >
            <Building2 className="h-8 w-8 text-primary" />
            {open && (
              <span className="text-xl font-semibold">Nkumba Hostels</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          'flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground',
                          !open && 'justify-center'
                        )}
                      >
                        <Icon className="h-6 w-6 shrink-0" />
                        {open && <span>{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}