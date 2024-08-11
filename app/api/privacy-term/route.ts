import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDatabase();
        const privacyTerms = await prisma.privacyTerms.findMany();
        return NextResponse.json(privacyTerms, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let {key, description } = await req.json();
      if (!key || !description)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const privacyTerms = await prisma.privacyTerms.create({
        data: { key, description },
      });
      return NextResponse.json( privacyTerms , {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  