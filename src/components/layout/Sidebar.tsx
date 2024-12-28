import Link from "next/link";
import { auth } from "@/lib/utils/auth";

export async function Sidebar() {
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];
  const session = await auth();

  // Handle unauthorized access
  if (!session || !session.user || !session.user.email) {
    return null; // Return null if session is invalid
  }

  // Check if user email is allowed
  if (!allowedEmails.includes(session.user.email)) {
    return null; // Return null if user is not authorized
  }

  return (
    <aside className="container flex justify-center items-center pt-24 gap-4">
      <Link href="/profile" className="text-blue-500 hover:underline">
        Profile
      </Link>
      <Link href="/overview" className="text-blue-500 hover:underline">
        Overview
      </Link>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Dashboard
      </Link>
    </aside>
  );
}
