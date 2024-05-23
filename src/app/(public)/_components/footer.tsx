import { SocialMedia } from "@/components/social-media";

export function Footer(): React.ReactNode {
  return (
    <footer className="flex flex-col gap-2 justify-center py-5 items-center">
      <p>© 2024 Mabica Group. All Rights Reserved.</p>
      <SocialMedia />
    </footer>
  );
}
