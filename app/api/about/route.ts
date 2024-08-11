import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        await connectToDatabase();
        const about = await prisma.about.findMany();
        return NextResponse.json(about, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let { avatar, title, subTitle, description } = await req.json();
      if (!avatar || !title || !subTitle || !description)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const about = await prisma.about.create({
        data: { avatar, title, subTitle, description },
      });
      return NextResponse.json(about, {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  