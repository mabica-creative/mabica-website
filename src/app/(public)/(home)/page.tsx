import { Hero } from "./_components/Hero";
import { Banner } from "./_components/Banner";
import { About } from "./_components/About";
import { Audiobook } from "./_components/Audiobook";
import { Donation } from "./_components/Donation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Banner />
      <About />
      <Audiobook />
      <Donation />
    </>
  );
}
