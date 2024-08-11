import ServiceForm from "@/components/tailAdmin/Services/serviceForm";
import { ParamsType } from "@/types/types";
import axios from "axios";
import React from "react";

async function ServiceId({ params }: { params: ParamsType }) {
  const id = params.id;
  let data = [];
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/service/${id}`);
    data = res.data;
  } catch (error) {
    console.log(error);
  }
  
  return <div>
    <ServiceForm service={data} isUpdate/>
  </div>;
}

export default ServiceId;
