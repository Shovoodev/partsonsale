"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { Search, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="bg-gray-500 text-primary-foreground hover:rounded-lg w-full p-2 flex justify-between px-1 ">
        <SidebarTrigger />
        <div>{children}</div>
        <div className=" flex justify-center items-center">
          <div className=" flex items-center justify-center gap-2">
            <Search />
            <Input className=" w-[80%] text-black font-bold" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <User2 size="30px" className=" gap-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" text-white text-sm z-10 bg-gray-800 p-3 gap-3 rounded-md ">
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
