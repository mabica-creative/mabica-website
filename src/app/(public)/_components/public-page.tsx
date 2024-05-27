import { HeroSection } from "./hero-section";

import { AboutSection } from "./about-section";
import { TeamSection } from "./team-section";
import { Scroll } from "./scroll"

export function PublicPage(): React.ReactNode {
  return (
    <>
      <HeroSection />
      <Scroll />
      <AboutSection />
      <TeamSection />
    </>
  );
}
