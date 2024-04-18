import { prisma } from "./prismaConect";

export interface editMetadataType {
  name: string | null;
  description: string | null;
  icon: string | null;
  color: string | null;
}

export async function showMetadata() {
  const req = await prisma.metadata.findFirst();

  return req;
}

export async function editMetadata(data: editMetadataType) {
  const req = await prisma.metadata.update({
    where: {
      id: 1,
    },
    data,
  });

  return req;
}
