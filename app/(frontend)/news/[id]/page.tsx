import LinkOverLogo from "@/components/linkOverLogo";
import ImagePreviewer from "@/components/portfolio/imagePreviewer";
import { getNewsData } from "@/constants/admin/newsData";
import { ParamsType } from "@/types/types";
import Image from "next/image";
import React from "react";

async function NewsId({ params }: { params: ParamsType }) {
  const news = await getNewsData(params.id);
  let dateObj = new Date(news.time);
  let year = dateObj.getUTCFullYear();
  let month = dateObj.getUTCMonth() + 1; // Months are zero-based
  let day = dateObj.getUTCDate();

  // Extract time components
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let minuteStr;
  let monthStr;
  let dayStr;
  let hourStr;

  if (hours < 10) {
    hourStr = `0${hours}`;
  } else {
    hourStr = hours;
  }
  if (minutes < 10) {
    minuteStr = `0${minutes}`;
  } else {
    minuteStr = minutes;
  }
  if (month < 10) {
    monthStr = `0${month}`;
  } else {
    monthStr = month;
  }
  if (day < 10) {
    dayStr = `0${day}`;
  } else {
    dayStr = day;
  }

  return (
    <div className="container">
      <div className="py-5">
        <LinkOverLogo link="/news" linkHeader="BACK TO News" />
      </div>
      <h1 className=" text-lightText lg:text-start text-center font-palatino text-2xl tracking-[5px] uppercase">
        {news?.title}
      </h1>
      <div className=" pt-5 flex md:flex-row flex-col md:justify-between items-center text-lightText">
        <p>
          <i>Author:</i> {news.author}
        </p>
        <p>
          <i>Date:</i> {`${year}-${monthStr}-${dayStr},  `}
          <i>Time:</i> {`${hourStr}:${minuteStr}`}
        </p>
      </div>
      <div className="flex justify-center bg-black pt-[1px] mb-10"></div>
      <div className="flex justify-center items-center">
        <div className="aspect-4/3 lg:w-[50%] overflow-hidden inline-block">
          <Image
            width={1000}
            height={500}
            alt="News Image"
            src={news?.thumbnail}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="mt-10">{news.description}</p>
    </div>
  );
}

export default NewsId;
