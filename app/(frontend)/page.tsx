'use client'
import Hero from "@/components/home/hero";
import Slider from "@/components/home/slider";
import { serviceType, sliderType } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";



export default function Home() {
  const [slider, setSlider] = useState<sliderType | null >(null)
  const [services, setServices] = useState<serviceType[] | null >(null)
  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await axios.get(`/api/slider/home`);
        const res2 = await axios.get(`/api/service`);
        setSlider(res.data);
        setServices(res2.data);
      } catch (err) {
        console.log('Error fetching slider data');
      }
    }
    getData()
  },[])
  

  if(!slider|| !services){
    return (<Loading/>)
  }

    return (
      <main className="container flex flex-col items-center justify-center mt-5 " >
        <Slider slider={slider} />
        {services?.map((data, i) => (
          <Hero
            key={i}
            heading={data.title}
            subHeading={data.subTitle}
            description={data.description}
            img={data.thumbnail}
            link={data.link.plainUrl}
            linkHeader={data.link.text}
            index={i+1}
          />
        ))}
      </main>
    );
  
}
