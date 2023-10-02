/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import Tilt from "react-vanilla-tilt";

const EventsCard = ({ data }) => {
  const fun = () =>{
    let timeouts = [], intervals = [];

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const animate = star => {
      star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
      star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

      star.style.animation = "none";
      star.offsetHeight;
      star.style.animation = "";
    }
  
    const magic = document.querySelector(".magic");
    if(!magic) return;
    magic.onmouseenter = () => {
      let index = 1;
      for(const star of document.getElementsByClassName("magic-star")) {
        timeouts.push(setTimeout(() => {  
          animate(star);
          
          intervals.push(setInterval(() => animate(star), 1000));
        }, index++ * 300));
      };
    }
    magic.onmouseleave = () => {
      for(const t of timeouts) clearTimeout(t);  
      for(const i of intervals) clearInterval(i);
      
      timeouts = []; intervals = [];
    }
  }
  
  React.useEffect(() => fun(), []);
  const handleRegisterClick = () => window.open(data.regLink, "_blank");

  return (
    <>
    <Tilt options={{ scale: 0.5, max: 35, "max-glare":0 }} style={{
      backgroundColor: "transparent",
    }}>
    <div className="w-[370px] md:w-[340px] border border-white/20 rounded-2xl p-5 backdrop-blur text-center">
      <div className="p-2 relative w-full overflow-hidden h-[200px] rounded-lg">
        <Image placeholder="blur" blurDataURL="/images/spinner.svg" height={data.image.height} width={data.image.width}
          src={data.image.url}
          alt={data.name}
          className="object-fit h-full mx-auto w-auto absolute inset-0 rounded-lg"
          />
      </div>
      <span className="inline-block pt-4 pb-2 text-lg text-white">{data.name}</span>
      <p className="text-white/40 text-xs leading-7 mt-1">
        {data.description.substring(0, 200) + "..."}
      </p>
      <div className="flex items-center justify-between mt-3">
        {data.state == "register" && (
          <button
          className="px-6 py-2 rounded-full bg-transparent hover:bg-gray-700/60"
          onClick={handleRegisterClick}
          >
            <span className="magic">
              {[...Array(3)].map((_, i) => (
                <span className="magic-star" key={i}>
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
              ))}
              <p className="magic-text font-bold"
                onClick={handleRegisterClick}>Register</p>
            </span>
          </button>
        )}
        <span className="text-white">{data.date}</span>
      </div>
    </div>
    </Tilt>
    </>
  );
}

export default EventsCard;