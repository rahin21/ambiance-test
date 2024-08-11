import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    await connectToDatabase();
    const menu = await prisma.faq.findMany();
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
    let {question, answer} = await req.json();

    if (!question || !answer)
      return NextResponse.json({message:`Invalid Data`}, { status: 422 });
    const menu = await prisma.faq.create({
      data: {
        question,answer
      },
    });
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
