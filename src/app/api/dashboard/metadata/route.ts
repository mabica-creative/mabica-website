import {
  editMetadata,
  editMetadataType,
  showMetadata,
} from "@/backend/metadata";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const data = await showMetadata();

    return Response.json({ status: "sucsess", data }, { status: 200 });
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

    const params: editMetadataType = {
      name: body?.name,
      description: body?.description,
      icon: body?.icon,
      color: body?.color,
    };

    if (
      params?.name === undefined &&
      params?.description === undefined &&
      params?.icon === undefined &&
      params?.icon == undefined
    ) {
      return Response.json({ status: "params not avaiable" }, { status: 202 });
    }

    const data = await editMetadata(params);

    return Response.json({ status: "edited", data }, { status: 201 });
  } catch (e) {
    console.log(e);
    return Response.json({ status: "server error" }, { status: 500 });
  }
}
