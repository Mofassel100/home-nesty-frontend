import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types";
import { Menu } from "lucide-react";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className="flex text-4xl h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger size="lg" className="text-lg [&_svg]:size-12" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}