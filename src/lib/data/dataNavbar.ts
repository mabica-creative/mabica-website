interface links {
  title: string;
  href: string;
}

const dataNavbar: links[] = [
  { title: "Home", href: "/#" },
  { title: "About Us", href: "/#about" },
  { title: "Previews", href: "/#audiobooks" },
  { title: "Audiobooks", href: "/audiobooks" },
  { title: "Donation", href: "/#donation" },
];

export { dataNavbar };
export type { links };
