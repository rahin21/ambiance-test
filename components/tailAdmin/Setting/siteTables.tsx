import { settingType } from "@/types/types";
import Link from "next/link";
import React from "react";

function SiteTable({ settings }: { settings: settingType[] }) {
  return (
    <div className="relative overflow-x-auto mt-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-black/20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Setting
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {settings.map((setting: settingType) => (
            <tr key={setting.id} className="bg-white border-b border-black/20">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {setting.key}
              </th>
              <td className="px-6 py-4">{setting.name}</td>
              <td className="px-6 py-4">{setting.description}</td>
              <td className="px-6 py-4 text-end">
                <Link
                  href={`/admin/site/${setting.id}`}
                  className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90 "
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

export default SiteTable;
