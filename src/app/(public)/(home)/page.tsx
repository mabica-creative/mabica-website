import { Hero } from "./_components/Hero";
import { Banner } from "./_components/Banner";
import { About } from "./_components/About";
import { Audiobook } from "./_components/Audiobook";
import { Donation } from "./_components/Donation";
import { getOverview } from "@/lib/action";

export default async function HomePage() {
  const dataOverview = await getOverview({ cache: "no-cache" });

  return (
    <>
      <Hero dataOverview={dataOverview} />
      <Banner dataOverview={dataOverview} />
      <About dataOverview={dataOverview} />
      <Audiobook />
      <Donation dataOverview={dataOverview} />
    </>
  );
}
