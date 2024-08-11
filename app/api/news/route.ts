import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        await connectToDatabase();
        const news = await prisma.news.findMany();
        return NextResponse.json(news, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let { description, title,thumbnail, author, time } = await req.json();
      if (!description || !title || !thumbnail || !author || !time)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const news = await prisma.news.create({
        data: { description, title,thumbnail, author, time },
      });
      
      return NextResponse.json({ news }, {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  