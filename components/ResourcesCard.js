/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaLink } from "react-icons/fa";
import Image from "next/image";
import Tilt from "react-vanilla-tilt";

export default function ResourcesCard({ data }) {
  return (
    <>
    <Tilt options={{ scale: 0.5, max: 35,}} style={{
      backgroundColor: "transparent",
    }}>
    <div className="relative w-[250px] h-[315px] backdrop-blur rounded-3xl">
      <img
        src="/images/servicesRectangle.png" alt="servicesRectangle"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute text-white inset-0 h-full w-full z-10 flex flex-col items-center justify-center">
        <div className="p-2 mt-2 relative w-full overflow-hidden h-[200px] rounded">
          <Image placeholder="blur" blurDataURL="/images/spinner.svg" height={data.image.height} width={data.image.width}
            src={data.image.url} alt={data.name}
            className="object-cover w-[70%] mx-auto mt-auto h-auto absolute inset-0  rounded"
          />
        </div>
        <span className="inline-block pt-4 pb-2 font-semibold text-sm lg:text-lg mx-1 px-1">{data.name}</span>
        <p className="text-xs lg:text-sm font-light opacity-70 mt-3 px-3">
          {data.description}
        </p>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="bg-card_bg px-4 p-1 text-xs rounded mx-1">
            <span className="text-white font-medium">{data.category}</span>
          </div>
          <a href={data.href} target="_blank" className="p-2" aria-label="Link">
            <FaLink className="hover:text-blue-400 text-white" />
          </a>
        </div>
      </div>
    </div>
    </Tilt>
    </>
  );
}