import Image from "next/image";
import React from "react";
import Link from "next/link";
import {newsType } from "@/types/types";


function NewsTable({news}:{news:newsType[]}) {
  return (
    <div className="rounded-sm border border-stroke shadow-default bg-black/20 p-5 mt-5 overflow-auto">

    <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-black/20">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Thumbnail
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Author
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Update
                </th>
            </tr>
        </thead>
        <tbody>
            {news.map((item)=>(
            <tr key={item.id} className="bg-white border-b border-black/20">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <Image src={item.thumbnail} width={100} height={100} alt={`about image`} />
                </td>
                <td className="px-6 py-4">
                    {item.title}
                </td>
                <td className="px-6 py-4 w-0.8">
                    {item.description.slice(0,50)}...
                </td>
                <td className="px-6 py-4">
                    
                    {item.author}
                </td>
                <td className="px-6 py-4">
                    
                    {item.time.split("T")[0]}
                </td>
                <td className="px-6 py-4">
                    <Link href={`/admin/news/${item.id}`} className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90 ">
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

export default NewsTable;
