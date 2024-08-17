import { Logo } from "@/components/ui/Logo";
import { NavMenu } from "@/components/fragments/NavMenu";

const Navbar = () => {
  return (
    <div className="fixed z-40 top-0 left-0 right-0 backdrop-blur">
      <header className="container flex justify-between items-center py-2">
        <Logo />
        <NavMenu />
      </header>
    </div>
  );
};

export { Navbar };
