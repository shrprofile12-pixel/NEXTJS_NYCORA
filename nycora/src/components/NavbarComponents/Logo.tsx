import React from "react";
import localFont from "next/font/local";
import bag from "../../../public/Bag.png";
import Image from "next/image";

const Logos = localFont({
  src: "../../../Fonts/Talina.otf",
  weight: "400",
});

const Logo = () => {
  return (
    <div className={`${Logos.className} px-8 flex items-center gap-0 text-white`}>
      <Image
        src={bag}
        alt="Logo"
        width={45}
        height={45}
        className="object-center"
      />
      <span className="text-4xl tracking-wider uppercase">NYCORA</span>
    </div>
  );
};

export default Logo;