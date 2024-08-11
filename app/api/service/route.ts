import prisma from "@/prisma";
import { connectToDatabase } from "../helpers/server-helpers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const services = await prisma.service.findMany({
      include: { link: true }, // Include the associated Link
    });
    return NextResponse.json( services , { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const { thumbnail, title, subTitle, description, text, plainUrl } = await req.json();

    if (!thumbnail || !title || !subTitle || !description || !text || !plainUrl) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // Create the Link first
    const link = await prisma.link.create({
      data: {
        text,
        plainUrl,
      },
    });

    // Create the Service with the linkId
    const service = await prisma.service.create({
      data: {
        thumbnail,
        title,
        subTitle,
        description,
        linkId: link.id,
      },
    });

    // Fetch the Service again to include the associated Link
    const serviceWithLink = await prisma.service.findUnique({
      where: { id: service.id },
      include: { link: true },
    });

    return NextResponse.json({ service: serviceWithLink }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};