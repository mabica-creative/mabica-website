import { SocialMedia } from "@/components/social-media";
import { TeamCard } from "@/components/team-card";
import Link from "next/link";

export function TeamSection() {
  return (
    <section
      id="team"
      className="flex flex-col lg:flex-row gap-6 justify-between py-20 max-w-screen-xl w-screen mx-auto px-[7%]"
    >
      <div className=" flex flex-col gap-2 ">
        <span className="font-medium text-xl text-text opacity-50">Endless</span>
        <h2 className="text-6xl -mt-4 ">Backend</h2>
        <p className="font-medium text-text opacity-50 w-2/3">
          “Meet the brilliant minds behind the inception of Mabica Grup.”
        </p>
        <div className="flex gap-2">
          <Link href="/team">
            <button className="border border-text rounded py-1 px-4">
              See More
            </button>
          </Link>
          <SocialMedia />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full lg:w-7/12 min-h-64 rounded-lg">
        <TeamCard name="@ray" heading="Jack of all trade" />
        <TeamCard name="@rian" heading="Jack of all trade" />
        <TeamCard name="@cemy" heading="Jack of all trade" />
      </div>
    </section>
  );
}
