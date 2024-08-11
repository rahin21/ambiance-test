"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import ClickOutside from "../ClickOutside";
import SidebarItem from "./SidebarItem";
import { TbSettings } from "react-icons/tb";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { MdHomeRepairService } from "react-icons/md";
import { MdOutlinePages } from "react-icons/md";
import { BsFillPostcardFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    
    name: "MENU",
    menuItems: [
      {
        icon: <BiSolidDashboard className="text-xl" />,
        label: "Dashboard",
        route: "/admin",
      },
      {
        icon: <MdOutlinePages className="text-xl" />,
        label: "Pages",
        route: "#",
        children: [
          { label: "Home", route: "/admin/home" },
          { label: "About", route: "/admin/about" },
          { label: "Portfolio", route: "/admin/portfolio" },
          { label: "News", route: "/admin/news" },
          { label: "FAQs", route: "/admin/faqs" },
          { label: "Contact", route: "/admin/contact" },
          { label: "Privacy Information", route: "/admin/privacy" },
          { label: "Terms of Services", route: "/admin/terms-of-services" },
        ],
      },
      {
        icon: <TbSettings className="text-xl" />,
        label: "Settings",
        route: "#",
        children: [
          { label: "Menus", route: "/admin/menus" },
          { label: "Site", route: "/admin/site" },
        ],
      },
      {
        icon: <MdHomeRepairService className="text-xl" />,
        label: "Services",
        route: "/admin/services",
      },
      {
        icon: <TfiLayoutSliderAlt className="text-xl" />,
        label: "Sliders",
        route: "/admin/sliders",
      },
      {
        icon: <BsFillPostcardFill className="text-xl" />,
        label: "Posts",
        route: "/admin/posts",
      },
    ],
  },
  // {
  //   name: "OTHERS",
  //   menuItems: [
  //     {
  //       icon: <IoPersonOutline className="text-xl" />,
  //       label: "Profile",
  //       route: "/admin/profile",
  //     },
  //   ],
  // },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#C7CBD1] duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-black">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                      sidebarOpen={sidebarOpen} 
                      setSidebarOpen={setSidebarOpen}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
