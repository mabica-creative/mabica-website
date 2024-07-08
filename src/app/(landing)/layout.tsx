import { Header } from "./_components/header";
import { Footer } from "./_components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-hidden scroll-smooth flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
