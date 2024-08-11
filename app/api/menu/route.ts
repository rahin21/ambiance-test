import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers";
import { NextResponse } from "next/server";
import { z } from "zod";

const itemsSchema = z.object({
  name: z.string().min(2),
    link: z.string(),
})

const menuSchema = z.object({
  key: z.string().min(2),
  items: z.array(itemsSchema),
});

export const GET = async () => {
  try {
    await connectToDatabase();
    const menu = await prisma.menu.findMany();
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    let body = await req.json();
    const validation = menuSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 422 });
    const menu = await prisma.menu.create({
      data: body,
    });
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
