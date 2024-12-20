import { signOut, auth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <section className="container flex justify-center items-center py-5">
      <div className="w-full max-w-lg p-6 rounded-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-foreground">
          Admin Dashboard
        </h1>

        <div className="text-center">
          <h2 className="text-lg font-medium text-muted-foreground mb-4">
            Session Details
          </h2>
          <div className="space-y-4">
            {session && (
              <div className="flex flex-col items-center">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                    width="100"
                    height="100"
                  />
                )}
                <p className="font-medium text-muted-foreground">
                  {session.user?.name}
                </p>
                <p className="text-muted-foreground">{session.user?.email}</p>
              </div>
            )}
          </div>
        </div>

        <form
          className="flex flex-col items-center gap-4"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            type="submit"
            className="w-full py-3 text-center font-semibold"
          >
            Sign Out
          </Button>
        </form>
      </div>
    </section>
  );
}
