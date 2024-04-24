import { prisma } from "./prismaConect";
import { overview } from "@prisma/client";

export async function showOverview() {
  const req = await prisma.overview.findFirst();

  return req;
}

export async function editOverview(data: overview) {
  const req = await prisma.overview.update({
    where: {
      id: 1,
    },
    data,
  });

  return req;
}
