import { SocialMedia } from "@/components/social-media";

export function Footer(): React.ReactNode {
  return (
    <footer className="flex gap-2 justify-between py-5  max-w-screen-xl backdrop-blur-lg  w-screen mx-auto px-[7%] items-center">
      <p>© 2024 Mabica Group. All Rights Reserved.</p>
      <SocialMedia />
    </footer>
  );
}
