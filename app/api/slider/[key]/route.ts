import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const sliderSchema = z.object({
  key: z.string().min(2),
  img: z.string().min(2).array(),
});


export const GET = async (req: Request,{params}:{params:ParamsType}) => {
  // GET a slider by id
  await connectToDatabase();
  
  const key = params.key;

  try {
    const getUniqueSlider = await prisma.slider.findUnique({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json( getUniqueSlider , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request,{params}:{params:ParamsType}) => {
  // UPDATE a slider by id
  await connectToDatabase();

  let body = await req.json();
  const key = params.key;
  const validation = sliderSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 422 });
  try {
    const updateSlider = await prisma.slider.update({
      where: {
        key: key || "",
      },
      data: body,
    });
    return NextResponse.json({ updateSlider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req: Request,{params}:{params:ParamsType}) => {
  // DELETE a slider by id
  const key = params.key
  try {
    const deleteSlider = await prisma.slider.delete({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json({ deleteSlider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
