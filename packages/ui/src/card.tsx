import React from "react";

export const Card = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="border p-4">
      <h1 className="text-xl border-b pb-4">{title}</h1>
      <div className="p-5">{children}</div>
    </div>
  );
};
