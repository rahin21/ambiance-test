import SiteTable from '@/components/tailAdmin/Setting/siteTables';
import SliderInfo from '@/components/tailAdmin/Sliders/sliderInfo';
import axios from 'axios';
import React from 'react'

async function getSetting() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/setting-key?key=contact`, 
    {
    next: { tags: ["setting"] },
  }
);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch setting data");
  }

  return res.json();
}


async function getSliders() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/slider/contact`, 
    {
    next: { tags: ["slider"] },
  }
);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch slider data");
  }

  return res.json();
}


async function Contact() {
  let slider = await getSliders();
  let settings = await getSetting();
  
  return (
    <div>
      <SliderInfo slider={slider}/>
      <SiteTable settings={settings}/>
    </div>
  )
}

export default Contact