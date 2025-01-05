import prisma from "@repo/orm/client";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/Balance";
import { OnRampTransactions } from "../../../components/OnRampTxn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

type TxnsProp = {
  id?: number;
  token?: string;
  userId?: number;
  amount: number;
  status?: string;
  provider: string;
  startTime: Date;
};

async function getBalance() {
  try {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "no user logged in.",
    };
  }
}

async function getOnRampTransactions() {
  try {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTxn.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
      take: 4,
    });
    return txns.map((t: TxnsProp) => ({
      time: t.startTime,
      amount: t.amount / 100,
      status: t.status,
      provider: t.provider,
    }));
  } catch (error) {
    console.error(error);
    return {
      msg: "no user logged in.",
    };
  }
}

export default async function Transfer() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl md:text-5xl mt-8">
        Transfer Funds to Your Wallet
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          {balance && (
            <BalanceCard
              amount={balance.amount || 0}
              locked={balance.locked || 0}
            />
          )}

          {transactions && (
            <div className="pt-4">
              {/* @ts-ignore */}
              <OnRampTransactions transactions={transactions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
