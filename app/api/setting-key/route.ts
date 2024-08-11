import prisma from "@/prisma";

import { NextResponse } from "next/server";
import { ParamsType } from "@/types/types";
import { connectToDatabase } from "../helpers/server-helpers";

  
export const GET = async (req:Request,{params}:{params:ParamsType}) => {

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
  
    try {
      const getSetting = await prisma.setting.findMany({
        where: {
          key: key || "",
        },
      });
      return NextResponse.json( getSetting , { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    } finally {
      prisma.$disconnect();
    }
  };