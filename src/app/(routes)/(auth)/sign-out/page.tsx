import { signOut } from "@/lib/utils/auth";
import { Button } from "@/components/ui/Button";

export default function SignOutPage() {
  return (
    <form
      className="flex h-screen container justify-center items-center flex-col gap-2"
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
