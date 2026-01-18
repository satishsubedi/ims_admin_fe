import { useState } from "react";
import {
  Home,
  FileUser,
  Briefcase,
  UserRound,
  ChevronRight,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Link, useLocation } from "react-router-dom";

/* ---------- Collapsible Menu Item ---------- */
const CollapsibleMenuItem = ({ icon: Icon, title, subItems }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if any sub-item is active
  const isActiveGroup = subItems.some((sub) => location.pathname === sub.url);

  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={title}
              isActive={isActiveGroup}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Icon />
              <span className="sr-only">{title}</span>
              <ChevronRight className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            className="min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="p-2">{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {subItems.map((subItem) => (
              <DropdownMenuItem key={subItem.title} asChild>
                <Link
                  to={subItem.url}
                  className="flex w-full items-center gap-2 cursor-pointer"
                >
                  <span className="flex h-1.5 w-1.5 rounded-full bg-primary/50" />
                  {subItem.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={title} isActive={isActiveGroup}>
            <Icon />
            <span className="font-medium">{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-4 mt-1 border-l border-sidebar-border pl-2 space-y-1">
            {subItems.map((subItem) => {
              const active = location.pathname === subItem.url;
              return (
                <SidebarMenuButton
                  key={subItem.title}
                  asChild
                  isActive={active}
                  size="sm"
                  className="h-8"
                >
                  <Link to={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </div>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

/* ---------- Sidebar ---------- */
const SideBar = () => {
  const location = useLocation();

  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Users", url: "/users", icon: UserRound },
  ];

  const collapsibleItems = [
    {
      title: "Internship",
      icon: Briefcase,
      subItems: [
        { title: "List Internship", url: "/allinternships" },
        { title: "Create Internship", url: "/create_internship" },
      ],
    },
    {
      title: "Applications",
      icon: FileUser,
      subItems: [{ title: "List Applications", url: "/applications" }],
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">IMS Admin</span>
            <span className="truncate text-xs">Management</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Normal Items */}
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Collapsible Items */}
              {collapsibleItems.map((item) => (
                <CollapsibleMenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  subItems={item.subItems}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
