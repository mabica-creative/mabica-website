import { auth } from "@/lib/utils/auth";

export async function AuthAdmin({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}
