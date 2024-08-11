import Image from "next/image";
import React from "react";
import aboutImage from "@/public/uploads/home/Brainstorming - Frame 2.jpg";
import Link from "next/link";
import { aboutType } from "@/types/types";


function AboutInfo({about}:{about:aboutType[]}) {
  return (
    <div className="rounded-sm border border-stroke shadow-default bg-black/20 p-5 mt-5 overflow-auto">

    <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-black/20">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Avatar
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Sub Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Update
                </th>
            </tr>
        </thead>
        <tbody>
            {about.map((item)=>(
            <tr key={item.id} className="bg-white border-b border-black/20">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <Image src={item.avatar[0]} width={100} height={100} alt={`about image`} />
                </td>
                <td className="px-6 py-4">
                    {item.title}
                </td>
                <td className="px-6 py-4">
                    
                    {item.subTitle}
                </td>
                <td className="px-6 py-4 w-0.8">
                    {item.description.slice(0,50)}...
                </td>
                <td className="px-6 py-4">
                    <Link href={`/admin/about/${item.id}`} className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90 ">
                      Edit
                    </Link>
                </td>
            </tr>
            ))}

        </tbody>
    </table>

   
    </div>
  );
}

export default AboutInfo;
