"use client";
import Sidebar from "../../../packages/ui/src/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarClient = () => {
  return (
    <>
      <Sidebar usePathname={usePathname} Link={Link} />
    </>
  );
};
