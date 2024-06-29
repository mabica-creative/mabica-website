import { AudioNavbar } from "./_components/AudioNavbar"
import { AudioFooter } from "./_components/AudioFooter";

export default function AudioBookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen min-h-screen flex flex-col justify-between">
      <AudioNavbar />
      {children}
      <AudioFooter />
    </div>
  );
}
