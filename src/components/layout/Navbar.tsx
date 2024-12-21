import { auth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";
import { NavMenu } from "@/components/fragments/NavMenu";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed z-40 top-0 left-0 right-0 backdrop-blur">
      <header className="container flex justify-between items-center py-2">
        <Logo />
        <NavMenu sessionImage={session?.user?.image as string} />
      </header>
    </div>
  );
};

export { Navbar };
