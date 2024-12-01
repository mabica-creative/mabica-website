import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";
import { Sidebar } from "./_components/Sidebar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="background">
      <Navbar />
      <div>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
