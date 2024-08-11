import Image from "next/image";
import Link from "next/link";
import React from "react";
import LinkOverLogo from "../linkOverLogo";
import axios from "axios";
import { GalleryType } from "@/types/types";
import ImagePreviewer from "../portfolio/imagePreviewer";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gallery`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function Magazine() {
  const gallery=  await getData();
  let imgs:string[]=[];

  gallery.map((item:GalleryType)=>{
    imgs.push(...item.imgs)
  })
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-[1px] w-full bg-gray-300 mt-8"></div>
      <h1 className=" text-lightText text-center font-palatino text-[20px] lg:tracking-[5px] tracking-[3px] py-8">
        GALLERY
      </h1>
      {/* magazine */}
      <ImagePreviewer images={imgs} />

      <div className="my-8">
        <LinkOverLogo link="/portfolio" linkHeader="OUR PORTFOLIO" />
      </div>
    </div>
  );
}

export default Magazine;
