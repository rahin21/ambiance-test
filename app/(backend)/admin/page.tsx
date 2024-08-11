import React from "react";
import { Metadata } from "next";
import { getSliderData } from "@/constants/admin/slidersData";
import SliderInfo from "@/components/tailAdmin/Sliders/sliderInfo";
import { sliderType } from "@/types/types";
import ServiceTable from "@/components/tailAdmin/Services/serviceTable";
import { getServiceData } from "@/constants/admin/serviceData";

export const metadata: Metadata = {
  title: "Admin",
};

async function page() {
  const sliders = await getSliderData();
  const services = await getServiceData();

  return (
    <div >
      <h1 className="text-xl font-semibold text-black capitalize">sliders</h1>
      <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-7">
        {sliders.map((slider: sliderType) => (
          <div key={slider.id} className="">
            <SliderInfo
              slider={slider}
            />
          </div>
        ))}
      </div>
      <h1 className="text-xl font-semibold text-black capitalize mb-3 mt-5">
        Servies
      </h1>
      <ServiceTable service={services} />
    </div>
  );
}

export default page;
