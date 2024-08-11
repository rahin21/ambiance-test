import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

interface ParamsType {
  id: string;
}

export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  await connectToDatabase();

  const url = params.id;
  console.log(url);

  try {
    const getUniquePost = await prisma.news.findUnique({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json(getUniquePost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request, { params }: { params: ParamsType }) => {
  // UPDATE a news by id
  await connectToDatabase();
  const url = params.id;
  let { description, title, thumbnail, author, time } = await req.json();
  if (!description || !title || !thumbnail || !author || !time)
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  try {
    const updatePost = await prisma.news.update({
      where: {
        id: url || "",
      },
      data: {
        description,
        title,
        thumbnail,
        author,
        time,
      },
    });
    return NextResponse.json(updatePost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: ParamsType }
) => {
  // DELETE a news by id
  const url = params.id;
  try {
    const deletePost = await prisma.news.delete({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ deletePost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
