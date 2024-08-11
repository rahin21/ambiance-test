import SliderForm from "@/components/tailAdmin/Sliders/sliderForm";
import SliderInfo from "@/components/tailAdmin/Sliders/sliderInfo";
import { getSliderData } from "@/constants/admin/slidersData";
import { sliderType } from "@/types/types";
import React from "react";



async function Sliders() {
  const data = await getSliderData();

  return (
    <div>
      <SliderForm params={{ key: "" }} imgs={[""]} />
      <div>
        {data.map((slider: sliderType) => (
          <SliderInfo key={slider.id} slider={slider} />
        ))}
      </div>
    </div>
  );
}

export default Sliders;
