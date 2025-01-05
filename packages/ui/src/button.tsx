"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  screen: "sm" | "md" | "lg";
}

export const Button = ({ children, onClick, screen }: ButtonProps) => {
  return (
    <div>
      {screen === "sm" ? (
        <button
          onClick={onClick}
          type="button"
          className="bg-zinc-200 flex justify-center items-center w-16 p-2 rounded-md md:hidden"
        >
          {children}
        </button>
      ) : (
        <button
          onClick={onClick}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {children}
        </button>
      )}
    </div>
  );
};
