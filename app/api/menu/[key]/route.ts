import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const itemsSchema = z.object({
  name: z.string().min(2),
  link: z.string(),
});

const menuSchema = z.object({
  key: z.string().min(2),
  items: z.array(itemsSchema),
});

export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  // GET a menu by id
  await connectToDatabase();

  const key = params.key;

  try {
    const getUniqueMenu = await prisma.menu.findUnique({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json( getUniqueMenu , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request, { params }: { params: ParamsType }) => {
  // UPDATE a menu by id
  await connectToDatabase();
  let body = await req.json();
  const key = params.key;
  const validation = menuSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 422 });
  try {
    const updateMenu = await prisma.menu.update({
      where: {
        key: key || "",
      },
      data: body,
    });
    return NextResponse.json({ updateMenu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: ParamsType }
) => {
  // DELETE a menu by id
 const key = params.key
  try {
    const deleteMenu = await prisma.menu.delete({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json({ deleteMenu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
