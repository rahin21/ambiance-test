import SiteForm from "@/components/tailAdmin/Setting/siteForm";
import SiteTable from "@/components/tailAdmin/Setting/siteTables";
import { settingType } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import React from "react";
async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/setting`, 
    {
    next: { tags: ["setting"] },
  }
);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function Site() {
  let data = await getData();

  return (
    <div>
      <h4 className="text-2xl font-semibold text-black mb-4">
        Add a new setting
      </h4>
      <SiteForm />

      
  <SiteTable settings={data}/>
    </div>
  );
}

export default Site;
