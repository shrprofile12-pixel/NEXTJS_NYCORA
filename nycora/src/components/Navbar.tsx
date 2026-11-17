import React from "react";
import Link from "next/link";
import ULIST from "./NavbarComponents/ULIST";
import Logo from "./NavbarComponents/Logo";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    // 💡 'relative' ki jagah 'absolute top-0 left-0 w-full z-50' kar diya hai
    // Isse navbar transparently carousel ke upar float karega
    <header className="absolute top-8 left-0 w-full h-28 z-50 overflow-hidden bg-transparent">
      
      {/* ==============================
          BACKGROUND — 50% / 50%
      ============================== */}
      <div className="absolute inset-0 flex">
        {/* LEFT 50% */}
        <div className="h-full w-1/2 " />

        {/* RIGHT 50% */}
        <div className="h-full w-1/2 " />
      </div>

      {/* ==============================
          NAVBAR CONTENT
      ============================== */}
      <div className="relative z-10 flex h-full items-center px-12">

        {/* Logo */}
        <div className="shrink-0 text-black">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="ml-24 text-black">
          <ULIST />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-5">
          
          {/* Search */}
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-2 border-[#07150d] bg-transparent hover:bg-[#07150d]/10"
          >
            <FaSearch className="text-[#07150d]" />
          </Button>

          {/* Sign In */}
          <Link href="/signin">
            <Button className="rounded-lg bg-[#07150d] px-7 py-4 text-white hover:bg-[#14291a]">
              Sign In
            </Button>
          </Link>

        </div>
      </div>

      {/* Bottom line like your reference */}
      <div className="absolute bottom-0 left-12 right-12 z-10 h-px bg-white/30" />
    </header>
  );
};

export default Navbar;