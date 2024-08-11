import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        await connectToDatabase();
        const post = await prisma.post.findMany();
        return NextResponse.json(post, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let { key, title,thumbnail, gallery } = await req.json();
      if (!key || !title || !thumbnail || !gallery)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const post = await prisma.post.create({
        data: { key, title,thumbnail, gallery },
      });
      
      return NextResponse.json({ post }, {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  