import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { rm } from "fs/promises";

export const DELETE = async (req:NextRequest) => {
    try {
        const { dir } = await req.json();
        if (!dir)
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        const deleteDir = path.join(process.cwd(), "public", `${dir}`);
        await rm(deleteDir, { recursive: true, force: true });
        console.log(`Deleted: ${dir}`);
        return NextResponse.json({ message: "All deletions successful" }, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}