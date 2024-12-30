import { Sidebar } from "@/components/layout/Sidebar";
import { AuthAdmin } from "@/components/layout/AuthAdmin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthAdmin>
        <Sidebar />
      </AuthAdmin>
      {children}
    </>
  );
}
