import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
    type: "Deposit" | "Withdrawal";
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm"> {t.type} ({t.provider}) </div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={
                  t.type == "Deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {" "}
                ₹ {t.amount / 100}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
