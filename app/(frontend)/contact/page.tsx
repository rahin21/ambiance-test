import React from "react";
import type { Metadata } from "next";
import ContactBox from "@/components/contact/contactBox";
import Form from "@/components/contact/form";
import ContactImg from "@/components/contact/contactImg";
import axios from "axios";
import Slider from "@/components/home/slider";


export const metadata: Metadata = {
  title: "Contact",
};

async function getData() {
  try {
    
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/slider/contact`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function page() {

  const slider = await getData();
  return (
    <div className="container">
      <Slider slider={slider}/>
      <div className="lg:flex justify-between items-start min-w-[59.6%] gap-5 pt-3">
        <ContactBox />
        <Form />
      </div>
    </div>
  );
}

export default page;
