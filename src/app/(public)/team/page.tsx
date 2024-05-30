// import { getTeam } from "@/frontend/team";
// import { team } from "@prisma/client";
// import { notFound } from "next/navigation";
import { TeamCard } from "@/components/team-card";

interface CardInterface {
  link?: string | undefined;
  image?: string | undefined;
  name: string;
  heading: string;
}

export default async function TeamPage() {
  // const data = await getTeam();
  // console.log(data);

  // if (data?.status !== "success") return notFound();

  // const team = data?.data;
  const team = [
    {
      name: "BackEnd",
      members: [
        { name: "@cemy", title: "Useless Item", image:"/profile.png", link:"/" },
        { name: "@Ray", title: "Jack of all trade", image:"/profile.png", link:"/"  },
        { name: "@Karin", title: "Leader of Domain", image:"/profile.png", link:"/"  },
      ],
    },
    {
      name: "Voice Actor",
      members: [
        { name: "@Wibu", title: "Useless Item", image:"/profile.png", link:"/"  },
        { name: "@Nonw", title: "Jack of all trade" , image:"/profile.png", link:"/" },
        { name: "@Riam", title: "Leader of Domain" , image:"/profile.png", link:"/" },
        { name: "@Wibu", title: "Useless Item", image:"/profile.png", link:"/"  },
        { name: "@Riam", title: "Leader of Domain" , image:"/profile.png", link:"/" },
        { name: "@Riam", title: "Leader of Domain" , image:"/profile.png", link:"/" },
        { name: "@Nonw", title: "Jack of all trade" , image:"/profile.png", link:"/" },
      ],
    },
  ];

  return (
    <main className="flex min-h-[85dvh] flex flex-col min-h-screen max-w-screen-xl w-screen mx-auto px-[7%]">
      <h1 className="text-3xl py-20 text-center mt-10">About Us</h1>
      <div className="flex flex-col gap-3">
        {team.map((devision, index) => (
          <div key={index}>
            <h2 className="text-2xl">{devision?.name}</h2>
            <div className="flex gap-2 flex-wrap">
              {devision.members.map((member, i) => (
                <TeamCard key={i} name={member.name} heading={member.title} image={member?.image} link={member?.link} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
