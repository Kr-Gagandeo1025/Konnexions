/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Tilt from "react-vanilla-tilt";

function ServicesCard({ data }) {
  return (
    <>
    <Tilt options={{ scale: 0.5, max: 35,}} style={{
      backgroundColor: "transparent",
    }}>
    <div className="relative backdrop-blur lg:w-[250px] lg:h-[315px] w-[150px] h-[150px]">
      <img src="/images/servicesRectangle.png" alt="servicesRectangle"
        className="absolute inset-0 h-full w-full" />
      <div className="absolute text-white inset-0 h-full w-full z-10 flex flex-col items-center justify-center">
        <Image placeholder="blur" blurDataURL="/images/spinner.svg"
          height={data.icon.height} width={data.icon.width}
          src={data.icon.url} alt={data.name}
          className="h-16 w-16 object-contain" 
          />
        <span className="mt-7 font-semibold text-sm lg:text-lg">{data.name}</span>
        <p className="text-xs lg:text-sm font-light opacity-70 mt-3 px-3 hidden lg:block text-center">
          {data.description}
        </p>
      </div>
    </div>
    </Tilt>
    </>
  );
}

export default ServicesCard;