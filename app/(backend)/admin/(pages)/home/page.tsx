import SliderInfo from "@/components/tailAdmin/Sliders/sliderInfo";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ServiceTable from "@/components/tailAdmin/Services/serviceTable";
import { getServiceData } from "@/constants/admin/serviceData";

async function Home() {
  let slider;
  let services;
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/slider/home`);
    slider = res.data;
    services = await getServiceData();
  } catch (error) {
    console.log(error);
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black capitalize">
        Sliders
      </h1>
      <SliderInfo slider={slider}/>
      <h1 className="text-2xl font-semibold text-black capitalize mb-3 mt-5">
        Servies
      </h1>
      <ServiceTable service={services}/>
    </div>
  );
}

export default Home;
