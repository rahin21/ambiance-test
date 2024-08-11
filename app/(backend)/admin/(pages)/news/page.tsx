import NewsForm from "@/components/tailAdmin/news/newsForm";
import NewsTable from "@/components/tailAdmin/news/newsTable";
import SliderInfo from "@/components/tailAdmin/Sliders/sliderInfo";
import axios from "axios";
import React from "react";
import Loading from "../../loading";
import { getNewsData } from "@/constants/admin/newsData";

async function News() {
  let slider;
  const news = await getNewsData();
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/slider/news`);
    slider = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <NewsForm />
      <h1 className="text-2xl font-semibold text-black mt-5 capitalize">
        Slider
      </h1>
      <SliderInfo slider={slider} />
      {news.length>0 ? (
        <>
          <h1 className="text-2xl font-semibold text-black capitalize my-5">
            news posts
          </h1>
          <NewsTable news={news} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default News;
