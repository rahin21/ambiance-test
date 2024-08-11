import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";
import { z } from "zod";

const gallerySchema = z.object({
  imgs: z.string().min(2).array(),
});

export const GET = async () => {
    try {
        await connectToDatabase();
        const gallery = await prisma.gallery.findMany();
        return NextResponse.json(gallery, {status:200});
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      await connectToDatabase();
      let body = await req.json();
      const validation = gallerySchema.safeParse(body);
      if (!validation.success)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const gallery = await prisma.gallery.create({
        data: body,
      });
      return NextResponse.json( gallery , {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  