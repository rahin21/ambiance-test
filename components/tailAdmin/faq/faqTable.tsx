import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaqType } from "@/types/types";

function FAQTable({ faq }: { faq: FaqType[] }) {
  return (
    <div className="rounded-sm border border-stroke shadow-default overflow-x-auto  bg-black/20 p-5 mt-5">
      <h1 className="text-2xl font-semibold text-black capitalize mb-3">
          FAQ Table
        </h1>
      <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-black/20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Answer
            </th>
            <th scope="col" className="px-6 py-3">
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {faq.map((item) => (
            <tr key={item.id} className="bg-white border-b border-black/20">
              <td className="px-6 py-4">{item.question.length>35?`${item.question.slice(0,40)}...`:item.question}</td>
              <td className="px-6 py-4">{item.answer.length>75?`${item.answer.slice(0,80)}...`:item.answer}</td>

              <td className="px-6 py-4 w-36">
                <Link
                  href={`/admin/faqs/${item.id}`}
                  className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90  "
                >
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

export default FAQTable;
