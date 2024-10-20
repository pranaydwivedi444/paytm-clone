import { Card } from "@repo/ui/card";

export const Statement = ({
  transactions,
}: {
  transactions: {
    time: String;
    amount: number;
    type: "Debit" | "Credit" | "Deposit" | "Withdrawal";
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Card Statement">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Card Statement">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">{t.type}</div>
              <div className="text-slate-600 text-xs">{t.time}</div>
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={
                  t.type === "Credit" ||  t.type === "Deposit"
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
