import { Bell, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePortal } from "@/contexts/PortalContext";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const { portalMode } = usePortal();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-4 gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {portalMode === "admin" && (
          <Badge variant="destructive" className="text-[10px] uppercase tracking-wider">
            Admin
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-8 h-9 bg-muted/50 border-0"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            3
          </span>
        </Button>

        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AM</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-none">Alex Mutiso</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
