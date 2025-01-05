import { authOptions } from "@/app/lib/auth";
import BalancesInfo from "@/components/BalancesInfo";
import { getServerSession } from "next-auth";
import { GiLifeInTheBalance, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import React from "react";
import { WelcomeMessage } from "@repo/ui/welcomemsg";
import prisma from "@repo/orm/client";

type TxProp = {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  let username;
  let currentBalance = 0;
  let moneyReceived = 0;
  let moneySent = 0;

  if (session?.user?.name) username = session.user.name;

  const user = await prisma.balance.findFirst({
    where: {
      userId,
    },
  });

  const moneySentTxns = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: userId,
    },
  });

  const moneyReceivedTxns = await prisma.p2PTransfer.findMany({
    where: {
      toUserId: userId,
    },
  });

  if (user && moneyReceivedTxns && moneySentTxns) {
    currentBalance = user.amount;
    moneySentTxns.map((tx: TxProp) => {
      moneySent = tx.amount + moneySent;
    });
    moneyReceivedTxns.map((tx: TxProp) => {
      moneyReceived = tx.amount + moneyReceived;
    });
  }

  return (
    <div className="w-full p-2">
      <div className="flex justify-center items-center">
        <WelcomeMessage username={username} />
      </div>
      <div className="h-[8rem] m-5 grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
        <BalancesInfo
          title="Current Balance"
          bg="bg-purple-500"
          icon={<GiLifeInTheBalance size={50} />}
          amount={currentBalance / 100}
          to="/p2p"
        />
        <BalancesInfo
          title="Money Sent"
          bg="bg-red-500"
          icon={<GiPayMoney size={50} />}
          amount={moneySent}
          to="/transaction"
        />
        <BalancesInfo
          title="Money Received"
          bg="bg-green-500"
          icon={<GiReceiveMoney size={50} />}
          amount={moneyReceived}
          to="/transaction"
        />
      </div>
    </div>
  );
}
