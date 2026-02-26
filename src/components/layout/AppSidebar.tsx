import {
  LayoutDashboard,
  Send,
  Users,
  Radio,
  Hash,
  Crown,
  BarChart3,
  Settings,
  MessageSquare,
  Shield,
  Building,
  Activity,
  UserCog,
  ScrollText,
  Wrench,
  ChevronsUpDown,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePortal } from "@/contexts/PortalContext";

const tenantNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Campaigns", url: "/campaigns", icon: Send },
  { title: "Contacts & Groups", url: "/contacts", icon: Users },
  { title: "Sender IDs", url: "/sender-ids", icon: Radio },
  { title: "Shortcodes", url: "/shortcodes", icon: Hash },
  { title: "Premium SMS", url: "/premium-sms", icon: Crown },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const adminNavItems = [
  { title: "System Overview", url: "/admin", icon: Activity },
  { title: "Tenant Management", url: "/admin/tenants", icon: Building },
  { title: "User Management", url: "/admin/users", icon: UserCog },
  { title: "Audit Log", url: "/admin/audit", icon: ScrollText },
  { title: "Platform Settings", url: "/admin/settings", icon: Wrench },
];

export function AppSidebar() {
  const { portalMode, switchPortal } = usePortal();
  const navItems = portalMode === "admin" ? adminNavItems : tenantNavItems;
  const isAdmin = portalMode === "admin";

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isAdmin ? "bg-destructive" : "bg-sidebar-primary"}`}>
            {isAdmin ? (
              <Shield className="h-4 w-4 text-destructive-foreground" />
            ) : (
              <MessageSquare className="h-4 w-4 text-sidebar-primary-foreground" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-sidebar-primary-foreground tracking-tight">BulkSMS Pro</h2>
            <p className="text-[10px] text-sidebar-foreground/60">
              {isAdmin ? "Super Admin" : "Enterprise Platform"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Portal Switcher */}
      <div className="px-3 pt-3 pb-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/50 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              {isAdmin ? (
                <Shield className="h-4 w-4 text-destructive shrink-0" />
              ) : (
                <Building className="h-4 w-4 text-primary shrink-0" />
              )}
              <span className="flex-1 text-left font-medium">
                {isAdmin ? "Super Admin" : "Tenant Portal"}
              </span>
              <ChevronsUpDown className="h-3.5 w-3.5 text-sidebar-foreground/50 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuItem
              onClick={() => switchPortal("tenant")}
              className={portalMode === "tenant" ? "bg-accent" : ""}
            >
              <Building className="h-4 w-4 mr-2 text-primary" />
              Tenant Portal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchPortal("admin")}
              className={portalMode === "admin" ? "bg-accent" : ""}
            >
              <Shield className="h-4 w-4 mr-2 text-destructive" />
              Super Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/" || item.url === "/admin"}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
