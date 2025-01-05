"use client";

type TxnProps = {
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  amount: number;
};

type P2PTransfersProps = {
  txns: TxnProps[];
};

export default function P2PTransfers({ txns }: P2PTransfersProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Recent P2P Transfers
      </h1>
      {txns.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {txns.map((txn, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Timestamp:</span>{" "}
                {new Date(txn.timestamp).toLocaleString()}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">From User ID:</span>{" "}
                {txn.fromUserId}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">To User ID:</span>{" "}
                {txn.toUserId}
              </div>
              <div className="text-gray-700 font-bold">
                <span className="font-semibold">Amount:</span> ₹{txn.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
