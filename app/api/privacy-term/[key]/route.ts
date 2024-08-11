import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";

export const GET = async (req: Request,{params}:{params:ParamsType}) => {
  // GET a privacyTerms by key
  await connectToDatabase();

  const key = params.key;
  try {
    const getUniquePrivacyTerms = await prisma.privacyTerms.findUnique({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json( getUniquePrivacyTerms , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request,{params}:{params:ParamsType}) => {
  // UPDATE a privacyTerms by key
  await connectToDatabase();
  const urlKey = params.key;
  let {  key, description } = await req.json();

  if (!key || !description )
    return NextResponse.json({ message: "Invalkey Data" }, { status: 422 });
  try {
    const updateprivacyTerms = await prisma.privacyTerms.update({
      where: {
        key: urlKey || "",
      },
      data: {
        description,
        key
      },
    });
    return NextResponse.json({ updateprivacyTerms }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req: Request,{params}:{params:ParamsType}) => {
  // DELETE a privacyTerms by key
  const key = params.key
  try {
    const deleteprivacyTerms = await prisma.privacyTerms.delete({
      where: {
        key: key || "",
      },
    });
    return NextResponse.json( deleteprivacyTerms , { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
