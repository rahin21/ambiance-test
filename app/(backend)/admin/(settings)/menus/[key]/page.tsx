import MenuForm from "@/components/tailAdmin/Setting/menuForm";
import { ParamsType } from "@/types/types";
import axios from "axios";
import React from "react";

async function Key({ params }: { params: ParamsType }) {
  const key = params.key;
  let data = [];
  let items = [];
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/menu/${key}`);
    data = res.data;
    items = res.data.items;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {items && (
        <div>
          <h4 className="text-2xl font-semibold text-black mb-5">Update menu</h4>
          <MenuForm params={params} items={items} isUpdate />
        </div>
      )}
    </div>
  );
}

export default Key;
