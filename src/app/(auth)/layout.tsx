import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
