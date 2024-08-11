import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { ParamsType } from "@/types/types";
import { connectToDatabase } from "@/app/api/helpers/server-helpers";

export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  const id = params.id;

  try {
    await connectToDatabase();
    const users = await prisma.user.findUnique({
      where: {
        id: id || "",
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, { params }: { params: ParamsType }) => {
    const id = params.id;
    try {
      let { name, email, password, role, phone, avatar } = await req.json();
      if (!name || !email || !password || !role || !phone || !avatar)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      await connectToDatabase();
      const updateUser = await prisma.user.update({
        where: {
          id: id || "",
        },
        data: {
          name,
          email,
          password,
          role,
          phone,
          avatar,
        },
      });
      return NextResponse.json(updateUser, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };

export const DELETE = async (req: Request, { params }: { params: ParamsType }) => {
    const id = params.id;
  console.log(id);
  try {
    await connectToDatabase();
    const deleteUser = await prisma.user.delete({
      where: {
        id: id || "",
      },
    });
    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
