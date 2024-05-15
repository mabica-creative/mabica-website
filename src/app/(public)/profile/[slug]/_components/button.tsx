import Link from "next/link";

export function Button({ children, link }: { children: React.ReactNode, link: string }) {
  return (
    <Link
      className="font-semibold border border-1 duration-300 border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] flex justify-center items-center rounded py-2 w-full hover:bg-[var(--background)] hover:text-[var(--primary)]"
      href={link}
    >
      {children}
    </Link>
  );
}
