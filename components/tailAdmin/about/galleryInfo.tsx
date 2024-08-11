
import { GalleryType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";


function GalleryInfo({gallery}:{gallery:GalleryType}) {

  return (
    <div className="border border-stroke bg-black/20 p-5 shadow-default mt-8">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-semibold text-black capitalize">
          Gallery
        </h1>
        <Link
          href={`/admin/gallery/${gallery.id}`}
          className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90 "
        >
          Edit
        </Link>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-start gap-5 h-[20rem] overflow-y-auto">
        {gallery.imgs.map((image) => (
          <div key={image} className="aspect-square w-[150px] inline-block overflow-hidden">
            <Image src={image} alt="img-home" width={150} height={150} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryInfo;
