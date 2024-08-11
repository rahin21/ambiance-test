import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();
        const link = await prisma.link.findMany();
        return NextResponse.json({link}, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let { text, plainUrl } = await req.json();
      if (!text || !plainUrl)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const link = await prisma.link.create({
        data: { text, plainUrl },
      });
      return NextResponse.json({ link }, {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  