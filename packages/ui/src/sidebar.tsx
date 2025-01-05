"use client";

import { BiTransfer } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "@repo/ui/button";
import { signIn, useSession } from "next-auth/react";
import { CiLogin } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";

export default function Navbar({ Link, usePathname }: any) {
  const pathname = usePathname();
  const session = useSession();

  const linkClassSm =
    "bg-zinc-200 flex justify-center items-center w-14 p-2 rounded-md md:hidden";
  const linkClassMd =
    "hidden md:flex md:justify-center md:items-center md:gap-2";

  const onSignout = () => {
    console.log("insideee");
    window.location.href = "/api/auth/signout?callbackUrl=/api/auth/signin";
  };

  return (
    <div className="md:w-1/5 bg-blue-50 md:h-screen md:justify-between">
      <div className="flex p-3 gap-3 justify-center items-center md:flex-col md:justify-center md:items-start md:rounded-md md:gap-5">
        <Link
          href={"/dashboard"}
          className={`${pathname == "/dashboard" ? "text-blue-500" : ""}`}
        >
          <span className={linkClassMd}>
            <IoHomeOutline size={30} />
            <p>Home</p>
          </span>
          <p className={linkClassSm}>
            <IoHomeOutline size={30} />
          </p>
        </Link>

        <Link
          href={"/transfer"}
          className={`${pathname == "/transfer" ? "text-blue-500" : ""}`}
        >
          <span className={linkClassMd}>
            <BiTransfer size={30} />
            <p>Transfer</p>
          </span>
          <p className={linkClassSm}>
            <BiTransfer size={30} />
          </p>
        </Link>

        <Link
          href={"/transaction"}
          className={`${pathname == "/transaction" ? "text-blue-500" : ""}`}
        >
          <span className={linkClassMd}>
            <FaClockRotateLeft size={30} />
            <p>Transactions</p>
          </span>
          <p className={linkClassSm}>
            <FaClockRotateLeft size={30} />
          </p>
        </Link>

        <Link
          href={"/p2p"}
          className={`${pathname == "/p2p" ? "text-blue-500" : ""}`}
        >
          <span className={linkClassMd}>
            <FiSend size={30} />
            <p>P2P Transfer</p>
          </span>
          <p className={linkClassSm}>
            <FiSend size={30} />
          </p>
        </Link>

        <Button onClick={session ? onSignout : signIn} screen="sm">
          {session ? <CiLogin size={30} /> : <IoMdLogOut size={30} />}
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center pt-2">
        <div className={`${linkClassMd} mt-[20rem]`}>
          <Button screen="md" onClick={session ? onSignout : signIn}>
            {session ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
