import { Navbar } from "./_components/Navbar";
import { Footer } from "./_components/Footer";

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
