import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../helpers/server-helpers";

export const GET = async () => {
    try {
        await connectToDatabase();
        const users = await prisma.user.findMany();
        return NextResponse.json(users, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request) => {
    try {
      let { name,email, password, role, phone,avatar } = await req.json();
      if (!name || !email || !password || !role || !phone || !avatar)
        return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
      password = await bcrypt.hash(password, 10);
      await connectToDatabase;
      const users = await prisma.user.findMany();
      if(users.length<1){
        const user = await prisma.user.create({ data: { name,email, password, role, phone,avatar } });
        return NextResponse.json({ user }, { status: 201 });
      }
      return NextResponse.json({message:"Cannot be more than one User."}, {status: 500})
  
    } catch (error) {
      console.log(error);
  
      return NextResponse.json({message:"Server Error"}, {status: 500})
    } finally {
      await prisma.$disconnect();
    }
  };