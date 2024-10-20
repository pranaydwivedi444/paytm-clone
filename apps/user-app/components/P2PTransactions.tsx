import { Card } from "@repo/ui/card";

export const P2PTranscations = ({
  transactions

}: {
  transactions: {
    time: Date;
    amount: number;
    type: "Debit" |  "Credit";
    phoneNumber: string;
    name : string;
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
              <div className="text-sm"> {t.type =="Debit" ? 'Paid To ' : 'Recieved from  '} : {"XXXX"+t.phoneNumber.slice(-4) + `(${t.name})`}</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
               ₹ {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
