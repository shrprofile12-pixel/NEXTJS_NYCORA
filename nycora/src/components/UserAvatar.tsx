"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SIGN_IN_HREF = "/signin";
const SIGN_OUT_CALLBACK_URL = "/signin";

function getUserInitials(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim();
  if (!source) return "U";

  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

interface AvatarBadgeProps {
  src?: string | null;
  name?: string | null;
  email?: string | null;
}

function AvatarBadge({ src, name, email }: AvatarBadgeProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const initials = getUserInitials(name, email);
  const showImage = Boolean(src) && !imgError;

  if (showImage) {
    return (
      <img
        src={src!}
        alt={name || email || "User avatar"}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="h-9 w-9 rounded-full border-2 border-[#07150d] object-cover transition-transform duration-150 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#07150d] bg-amber-300 text-xs font-bold tracking-wide text-[#07150d] transition-transform duration-150 group-hover:scale-[1.03]"
    >
      {initials}
    </span>
  );
}

export function UserAvatar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-9 animate-pulse rounded-full border-2 border-[#07150d]/30 bg-amber-200/70"
      />
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <Link
        href={SIGN_IN_HREF}
        className="inline-flex h-10 items-center justify-center rounded-lg border-2 border-[#07150d] bg-[#07150d] px-5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#14291a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07150d]"
      >
        Sign In
      </Link>
    );
  }

  const handleSignOut = () => {
    void signOut({ callbackUrl: SIGN_OUT_CALLBACK_URL });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open account menu"
            className="group inline-flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07150d] cursor-pointer"
          />
        }
      >
        <AvatarBadge src={user.image} name={user.name} email={user.email} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 py-1.5">
            {user.name && (
              <span className="truncate text-sm font-semibold text-[#07150d]">
                {user.name}
              </span>
            )}
            {user.email && (
              <span className="truncate text-xs font-normal text-neutral-500">
                {user.email}
              </span>
            )}
            {!user.name && !user.email && (
              <span className="text-sm font-semibold text-[#07150d]">
                My Account
              </span>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer font-medium text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;