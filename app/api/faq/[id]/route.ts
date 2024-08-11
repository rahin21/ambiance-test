import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  // GET a menu by id
  await connectToDatabase();

  const id = params.id;

  try {
    const getUniqueMenu = await prisma.faq.findUnique({
      where: {
        id: id || "",
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
  let {question, answer} = await req.json();
  const id = params.id;
  
  if (!question|| !answer)
    return NextResponse.json({message:`Invalid Data`}, { status: 422 });
  try {
    const updateMenu = await prisma.faq.update({
      where: {
        id: id || "",
      },
      data: {
        question, answer
      }
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
 const id = params.id
  try {
    const deleteMenu = await prisma.faq.delete({
      where: {
        id: id || "",
      },
    });
    return NextResponse.json({ deleteMenu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
