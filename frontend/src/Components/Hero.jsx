import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row ">
      {/* Hero left-side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-slate-800">
        <div className="flex items-center gap-2">
          <p className="w-8 md:w-11 h-[2px] bg-black"></p>
          <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
        </div>
        <h1 className="leading-relaxed text-3xl sm:py-3 lg:text-5xl prata-regular">
          Latest Arrivals
        </h1>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
          <p className="w-8 md:w-11 h-[2px] bg-black"></p>
        </div>
        </div>
      </div>
      {/* Hero right-side */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
};

export default Hero;
