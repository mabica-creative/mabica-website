import { prisma } from "./prismaConect";
import { team } from "@prisma/client";

export async function showTeam() {
  const req = await prisma.team.findMany();

  return req;
}

export async function addTeam(data: team) {
  const req = await prisma.team.update({
    where: {
      id: 1,
    },
    data,
  });

  return req;
}

export async function editTeam(data: team) {
  const req = await prisma.team.update({
    where: {
      id: 1,
    },
    data,
  });

  return req;
}
