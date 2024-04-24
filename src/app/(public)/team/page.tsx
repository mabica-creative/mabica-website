import { getTeam } from "@/frontend/team";
import { team } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function TeamPage() {
  const data = await getTeam();
  // console.log(data);

  if (data?.status !== "success") {
    return (
      <main className="flex justify-center gap-2 items-center">
        ada yang salah
      </main>
    );
  }

  const team = data?.data;

  return (
    <main className="flex justify-center gap-2 items-center">
      {team.map((member: team) => (
        <a key={member?.id}>{member?.name}</a>
      ))}
    </main>
  );
}
