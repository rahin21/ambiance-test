import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();
        const setting = await prisma.setting.findMany();
        return NextResponse.json(setting, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let {key, name, description } = await req.json();
      if (!key || !name || !description)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const setting = await prisma.setting.create({
        data: { key, name, description },
      });
      return NextResponse.json( setting , {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  