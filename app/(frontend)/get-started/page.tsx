import React from "react";
import type { Metadata } from "next";
import AccordionComponent from "@/components/getStarted/accordion";

export const metadata: Metadata = {
  title: "Get Started",
};

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/faq`, {
      next: { tags: ["faq"] },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function page() {
  const questions = await getData();
  return (
    <div className="container">
      <h1 className="header font-palatino text-lightText text-[24px] tracking-[5px] text-center py-5">
        F.A.Q
      </h1>
      <AccordionComponent questions={questions} />
    </div>
  );
}

export default page;
