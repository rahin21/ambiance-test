import SliderForm from "@/components/tailAdmin/Sliders/sliderForm";
import { ParamsType } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function SliderKey({ params }: { params: ParamsType }) {
  const key = params.key;
  let data = [];
  let imgs = [];
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/slider/${key}`);
    data = res.data;
    imgs = res.data.img;
  } catch (error) {
    console.log(error);
  }


  return (
    <div>
      <SliderForm params={params} imgs={imgs} isUpdate />
    </div>
  );
}

export default SliderKey;
