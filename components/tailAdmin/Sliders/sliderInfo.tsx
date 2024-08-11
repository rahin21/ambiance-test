import { cn } from "@/lib/utils";
import { sliderType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SliderInfo({
  slider,
  className,
}: {
  slider: sliderType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `border border-stroke bg-black/20 p-5 shadow-default mt-5`,
        className
      )}
    >
      <div className="flex justify-between mb-3">
        <h1 className="text-[1.27rem] font-semibold text-black capitalize text-wrap">
          {slider.key} sliders
        </h1>
        <Link
          href={`/admin/sliders/${slider.key}`}
          className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90"
        >
          Edit
        </Link>
      </div>

      <div className="gap-5 flex overflow-auto">
        {slider.img.map((image) => (
          <div key={image} className="flex flex-col mb-3">
            <div className="aspect-4/3 lg:w-[20rem] w-[15rem] overflow-hidden">
              <Image
                src={image}
                alt="img-home"
                width={1200}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderInfo;
