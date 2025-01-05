type RecentTransaction = {
  id: number;
  fromUserId: number;
  timestamp: Date;
  toUserId: number;
  amount: number;
};

type RecentTransactions = {
  txns: RecentTransaction[];
};

export const RecentTransactions = ({ txns }: RecentTransactions) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-gray-600 font-medium">Date</th>
              <th className="p-3 text-gray-600 font-medium">Time</th>
              <th className="p-3 text-gray-600 font-medium">Amount</th>
              <th className="p-3 text-gray-600 font-medium">To</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {txns.map((txn, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="p-4 text-sm text-gray-700">
                  {new Date(txn.timestamp).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {new Date(txn.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="p-4 text-sm font-semibold text-gray-800">
                  ₹{txn.amount}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  <span className="text-blue-600 hover:underline">
                    {txn.toUserId}
                  </span>
                </td>
              </tr>
            ))}
            {txns.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
