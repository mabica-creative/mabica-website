import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="container flex justify-center items-center py-24 gap-2">
      <Link href="/dashboard">Profile</Link>
      <Link href="/dashboard/overview">Overview</Link>
      <Link href="/dashboard/audiobooks">Audiobooks</Link>
    </aside>
  );
}
