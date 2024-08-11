import AboutForm from "@/components/tailAdmin/about/aboutForm";
import AboutInfo from "@/components/tailAdmin/about/aboutInfo";
import GalleryForm from "@/components/tailAdmin/about/galleryForm";
import GalleryInfo from "@/components/tailAdmin/about/galleryInfo";
import { GalleryType } from "@/types/types";
import React from "react";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/about`, {
    next: { tags: ["about"] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getGalleryData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gallery`, {
    next: { tags: ["gallery"] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function About() {
  let data = await getData();
  let gallerys = await getGalleryData();

  return (
    <div>
      <AboutForm />
      <GalleryForm />
      {gallerys.map((gallery:GalleryType)=>(
        <GalleryInfo key={gallery.id} gallery={gallery} />
      ))
    }
      {data.length > 0 && <AboutInfo about={data} />}
    </div>
  );
}

export default About;
