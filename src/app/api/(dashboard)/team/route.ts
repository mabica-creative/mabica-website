import {
  editTeam,
  addTeam,
  showTeam,
} from "@/backend/team";
import { NextRequest } from "next/server";
import { team } from "@prisma/client";

export async function GET() {
  try {
    const data = await showTeam();

    return Response.json({ status: "success", data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "server error" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return Response.json({ status: "has no params" }, { status: 202 });
    }

    const params: team = {
      id: 1,
      name: body?.name,
      description: body?.description,
      color: body?.color,
      role: body?.role,
      image: body?.image,
    };

    if (
      params?.name === undefined &&
      params?.description === undefined &&
      params?.image === undefined &&
      params?.role === undefined &&
      params?.color == undefined
    ) {
      return Response.json({ status: "params not avaiable" }, { status: 202 });
    }

    const data = await addTeam(params);

    return Response.json({ status: "edited", data }, { status: 201 });
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

    const params: team = {
      id: 1,
      name: body?.name,
      description: body?.description,
      color: body?.color,
      image: body?.image,
      role: body?.role,
    };

    if (
      params?.name === undefined &&
      params?.description === undefined &&
      params?.image === undefined &&
      params?.role === undefined &&
      params?.color == undefined
    ) {
      return Response.json({ status: "params not avaiable" }, { status: 202 });
    }

    const data = await editTeam(params);

    return Response.json({ status: "edited", data }, { status: 201 });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "server error" }, { status: 500 });
  }
}
