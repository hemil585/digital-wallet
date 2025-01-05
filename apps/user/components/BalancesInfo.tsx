"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";

type BalancesInfo = {
  bg: string;
  icon: ReactNode;
  title: string;
  amount: number;
  to: string;
};

export default function BalancesInfo({
  bg,
  icon,
  title,
  amount,
  to,
}: BalancesInfo) {
  return (
    <div
      className={`h-[10rem] p-4 rounded-lg shadow-md ${bg} text-white flex items-center gap-4`}
    >
      <div>{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">₹ {amount}</p>
        <Link
          href={to}
          className="flex text-sm text-blue-300 hover:text-blue-500 mt-2 my-5 items-center gap-2"
        >
          <p>More Info</p> <FiChevronRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
