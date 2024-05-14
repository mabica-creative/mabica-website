import Link from 'next/link'

export default function Home(): React.ReactNode  {
  return <main className="flex h-[100dvh] gap-2 justify-center items-center">
    <Link href="/dashboard">Dashboard</Link>
    <Link href="/team">Team</Link>
    <Link href="/about">About</Link>
    <Link href="/overview">overview</Link>
    <Link href="/login">login</Link>
  </main>;
}
