import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  return (
    <form
      className="flex h-screen container justify-center items-center flex-col gap-2"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
