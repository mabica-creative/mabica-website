import Link from "next/link";
import { links } from "@/lib/data/dataNavbar"

interface FooterLinksProps {
  heading: string;
  links: links[];
}

const FooterLinks = ({ data }: { data: FooterLinksProps[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {data.map(({ heading, links }) => (
        <div key={heading}>
          <h3 className="text-xl font-medium">{heading}</h3>
          <ul className="opacity-80">
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { FooterLinks };
export type { FooterLinksProps }