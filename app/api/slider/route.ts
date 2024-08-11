import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers"
import { NextResponse } from "next/server";
import { z } from "zod";

const sliderSchema = z.object({
  key: z.string().min(2),
  img: z.string().min(2).array(),
});

export const GET = async () => {
    try {
        await connectToDatabase();
        const slider = await prisma.slider.findMany();
        return NextResponse.json(slider, {status:200});
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
      const validation = sliderSchema.safeParse(body);
      if (!validation.success)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      const slider = await prisma.slider.create({
        data: body,
      });
      return NextResponse.json( slider , {status: 201});
    } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };
  