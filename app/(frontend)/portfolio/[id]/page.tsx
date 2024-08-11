import LinkOverLogo from "@/components/linkOverLogo";
import ImagePreviewer from "@/components/portfolio/imagePreviewer";
import { ParamsType } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React from "react";

async function PortfolioId({ params }: { params: ParamsType }) {
  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/post/${params.id}`
  );
  let post = res.data;
  return (
    <div className="container">
      <div className="py-5">
        <LinkOverLogo link="/portfolio" linkHeader="BACK TO GALLERIES" />
      </div>
      <h1 className="header text-center text-lightText font-palatino text-[17px] tracking-[5px] uppercase">
        {post?.title}
      </h1>
      <div className="flex justify-center p-8 mb-10">
        <Image width="80" height="10" src="/divider.png" alt="divder" />
      </div>
      <ImagePreviewer images={post?.gallery} />
      <div className="py-5">
        <LinkOverLogo link="/portfolio" linkHeader="BACK TO GALLERIES" />
      </div>
    </div>
  );
}

export default PortfolioId;
