import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { dataNavbar } from "@/lib/data/dataNavbar";
import {
  FooterLinks,
  FooterLinksProps,
} from "@/components/fragments/FooterLinks";

const dataFooterLinks: FooterLinksProps[] = [
  {
    heading: "Follow Us",
    links: [
      { title: "Instagram", href: "https://instagram.com" },
      { title: "WhatsApp", href: "https://whatsapp.com" },
    ],
  },
  {
    heading: "Company",
    links: dataNavbar,
  },
];

const Footer = () => {
  return (
    <footer className="container flex flex-col lg:flex-row lg:justify-between lg:flex-wrap gap-4 lg:gap-8 py-10">
      <div>
        <Logo />
        <h3 className="text-xl font-medium mt-2">Mabica Creative Studio</h3>
        <p className="opacity-80 ">Lazy to read? Just Listen, Stories Await.</p>
      </div>

      <FooterLinks data={dataFooterLinks} />

      <div className="flex flex-col gap-2 lg:w-full lg:flex-row lg:justify-between">
        <p className="text-base opacity-80 text-center lg:text-left ">
          © 2024 Mabica Creative. All Rights Reserved.
        </p>
        <Button className="w-full lg:w-max">Get Story</Button>
      </div>
    </footer>
  );
};

export { Footer };
