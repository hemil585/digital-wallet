import { authOptions } from "@/app/lib/auth";
import P2PTransfers from "@/components/P2PTransfers";
import { SendCard } from "@/components/SendMoney";
import prisma from "@repo/orm/client";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const senderTxns = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    orderBy: {
      timestamp: 'desc'
    },
    take: 3
  });

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SendCard />
      <div className="hidden md:flex">
        <P2PTransfers txns={senderTxns} />
      </div>
    </div>
  );
}
