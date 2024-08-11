import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ClientInfo from "@/components/about/clientInfo";
import Magazine from "@/components/about/magazine";
import Loading from "../loading";
import { getAboutData } from "@/constants/admin/aboutData";

export const metadata: Metadata = {
  title: "About",
};



async function Page() {
  const about = await getAboutData();

  if (!about) {
    return <Loading />;
  }

  return (
    <div className="container">
      <ClientInfo about={about} />
      <Magazine />
    </div>
  );
}

export default Page;
