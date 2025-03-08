import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InputWithSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export function InputWithSearch({ className, onSearch, ...props }: InputWithSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder="Search..."
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
    </div>
  );
}