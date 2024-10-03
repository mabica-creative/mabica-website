import { signOut, auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <form
      className="flex h-screen container justify-center items-center flex-col gap-2"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      ADMIN
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button type="submit">Sign Out</button>
    </form>
  );
}
