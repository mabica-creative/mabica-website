import { editOverview, showOverview } from "@/backend/overview";
import { NextRequest } from "next/server";
import { overview } from "@prisma/client";

export async function GET() {
  try {
    const data = await showOverview();

    return Response.json({ status: "success", data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return Response.json({ status: "has no params" }, { status: 202 });
    }

    const params: overview = {
      id: 1,
      title: body?.title,
      description: body?.description,
      icon: body?.icon,
      color: body?.color,
      image: body?.image,
    };

    if (
      params?.title === undefined &&
      params?.description === undefined &&
      params?.icon === undefined &&
      params?.image === undefined &&
      params?.color == undefined
    ) {
      return Response.json({ status: "params not avaiable" }, { status: 202 });
    }

    const data = await editOverview(params);

    return Response.json({ status: "edited", data }, { status: 201 });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "server error" }, { status: 500 });
  }
}
