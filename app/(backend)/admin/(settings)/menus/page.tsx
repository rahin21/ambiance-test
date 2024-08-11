// import MenuForm from "../components/menuForm";
import MenuForm from "@/components/tailAdmin/Setting/menuForm";
import { menuType } from "@/types/types";
import axios from "axios";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/menu`, { next:{tags:["menu"]}})
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 

async function Menus() {
  const data = await getData();
  return (
    <div>
      <div className="">
        <h4 className="text-2xl font-semibold text-black mb-4">
          Add a new menu
        </h4>
        <MenuForm params={{ key: "" }} items={[{ name: "", link: "" }]} />
      </div>
      <div className="border border-stroke bg-black/20 px-7.5 py-6 shadow-default mt-8">
        <div className="rounded-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((menu: menuType) => (
            <div key={menu.id} className="p-3 border border-black">
              <div className="flex justify-between gap-x-4 border-b-[1px] pb-1">
                <h4 className="text-2xl font-semibold text-black capitalize">
                  {menu.key}
                </h4>

                <Link
                  href={`/admin/menus/${menu.key}`}
                  className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90 "
                >
                  Edit
                </Link>
              </div>
              <ul>
                {menu.items.map((item) => (
                  <li key={`${menu.key}-${item.name}`}>{item.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menus;
