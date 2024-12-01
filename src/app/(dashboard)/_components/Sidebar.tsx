import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="container flex justify-center items-center py-20 gap-2">
      <Link href="/dashboard">Overview</Link>
      <Link href="/dashboard/audiobooks">Audiobooks</Link>
    </aside>
  );
}
