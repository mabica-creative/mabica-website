import { Hero } from "@/components/page/home/Hero";
import { Banner } from "@/components/page/home/Banner";
import { About } from "@/components/page/home/About";
import { Audiobook } from "@/components/page/home/Audiobook";
import { Donation } from "@/components/page/home/Donation";
import { getOverview } from "@/lib/fetch/getOverview";

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
