import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const gallerySchema = z.object({
  imgs: z.string().min(2).array(),
});


export const GET = async (req: Request,{params}:{params:ParamsType}) => {
  // GET a gallery by id
  await connectToDatabase();
  
  const id = params.id;

  try {
    const getUniquegallery = await prisma.gallery.findUnique({
      where: {
        id: id || "",
      },
    });
    return NextResponse.json( getUniquegallery , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request,{params}:{params:ParamsType}) => {
  // UPDATE a gallery by id
  await connectToDatabase();

  let body = await req.json();
  const id = params.id;
  const validation = gallerySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 422 });
  try {
    const updategallery = await prisma.gallery.update({
      where: {
        id: id || "",
      },
      data: body,
    });
    return NextResponse.json({ updategallery }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req: Request,{params}:{params:ParamsType}) => {
  // DELETE a gallery by id
  const id = params.id
  try {
    const deletegallery = await prisma.gallery.delete({
      where: {
        id: id || "",
      },
    });
    return NextResponse.json({ deletegallery }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
