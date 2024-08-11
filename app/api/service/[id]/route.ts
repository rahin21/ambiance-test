import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/types";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  // GET a service by id
  await connectToDatabase();
  const url = params.id;

  try {
    const getUniqueService = await prisma.service.findUnique({
      where: {
        id: url || "",
      },
      include: { link: true },
    });
    return NextResponse.json(
      getUniqueService,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();
    const { thumbnail, title, subTitle, description, text, plainUrl } =
      await req.json();
    const serviceId = params.id;

    if (
      !serviceId ||
      !thumbnail ||
      !title ||
      !subTitle ||
      !description ||
      !text ||
      !plainUrl
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // Fetch the existing service to get the associated linkId
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { link: true },
    });

    if (!existingService || !existingService.link) {
      return NextResponse.json(
        { message: "Service or associated Link not found" },
        { status: 404 }
      );
    }

    const linkId = existingService.link.id;

    // Update the Service
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        thumbnail,
        title,
        subTitle,
        description,
      },
    });

    // Update the Link
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        text,
        plainUrl,
      },
    });

    // Fetch the updated Service with the associated Link
    const serviceWithLink = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { link: true },
    });

    return NextResponse.json({ service: serviceWithLink }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: ParamsType }
) => {
  // DELETE a service by id

  const url = params.id;
  try {
    const deleteService = await prisma.service.delete({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ deleteService: deleteService }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
