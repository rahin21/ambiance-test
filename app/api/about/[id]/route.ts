import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";

export const GET = async (req:Request,{ params }:{params:{id:string}}) => {
  // GET a about by id
  const url = params.id
  try {
    const getUniqueAbout = await prisma.about.findUnique({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json( getUniqueAbout , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request,{ params }:{params:{id:string}}) => {
  // UPDATE a about by id
  await connectToDatabase();
  
  const url = params.id
  console.log(url);
  let { avatar, title, subTitle, description } = await req.json();
  if (!avatar || !title || !subTitle || !description)
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  try {
    const updateAbout = await prisma.about.update({
      where: {
        id: url || "",
      },
      data: {
        avatar, title, subTitle, description
      },
    });
    return NextResponse.json( updateAbout , { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req:Request,{ params }:{params:{id:string}}) => {
  // DELETE a about by id
  
  const url = params.id
  try {
    const deleteAbout = await prisma.about.delete({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json( deleteAbout , { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
