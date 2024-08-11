import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";

export const GET = async (req: Request,{params}:{params:ParamsType}) => {
  // GET a link by id
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");

  try {
    const getUniqueLink = await prisma.link.findUnique({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ getUniqueLink }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request,{params}:{params:ParamsType}) => {
  // UPDATE a link by id
  await connectToDatabase();
  let { text,  plainUrl} = await req.json();
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");
  if (!text || !plainUrl)
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  try {
    const updateLink = await prisma.link.update({
      where: {
        id: url || "",
      },
      data: {
        text,
        plainUrl,
      },
    });
    return NextResponse.json({ updateLink }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req: Request,{params}:{params:ParamsType}) => {
  // DELETE a link by id
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");
  try {
    const deleteLink = await prisma.link.delete({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ deleteLink }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
