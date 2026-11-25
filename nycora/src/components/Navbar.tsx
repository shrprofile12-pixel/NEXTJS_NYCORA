"use client";

import React from "react";
import ULIST from "./NavbarComponents/ULIST";
import Logo from "./NavbarComponents/Logo";
import UserAvatar from "./UserAvatar"; // path apne folder ke mutabiq adjust karein
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="absolute top-8 left-0 z-50 h-28 w-full bg-transparent">
      {/* ==============================
          BACKGROUND — 50% / 50%
      ============================== */}
      <div className="pointer-events-none absolute inset-0 flex">
        <div className="h-full w-1/2" />
        <div className="h-full w-1/2" />
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

          {/* User Avatar / Sign In */}
          <UserAvatar />
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute right-12 bottom-0 left-12 z-10 h-px bg-white/30" />
    </header>
  );
};

export default Navbar;