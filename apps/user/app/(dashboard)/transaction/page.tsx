import { authOptions } from "@/app/lib/auth";
import { RecentTransactions } from "@/components/RecentTransactions";
import prisma from "@repo/orm/client";
import { getServerSession } from "next-auth";

export default async function Transaction() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const p2pTxns = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: userId,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 10,
  });

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-700 sm:text-3xl text-left mt-6 mb-1">
        Recent Transactions
      </h1>
      <RecentTransactions txns={p2pTxns} />
    </div>
  );
}
