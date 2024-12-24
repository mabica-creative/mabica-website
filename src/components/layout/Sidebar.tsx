import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="container flex justify-center items-center pt-24 gap-2">
      <Link href="/profile">Profile</Link>
      <Link href="/overview">Overview</Link>
      <Link href="/dashboard">Dashboard</Link>
    </aside>
  );
}
