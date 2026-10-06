import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-administration";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["PROVIDER"]}>
      <DashboardShell role="PROVIDER">{children}</DashboardShell>
    </RoleGuard>
  );
}