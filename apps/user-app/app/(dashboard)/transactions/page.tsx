import { BalanceCard } from "../../../components/BalanceCard";
import CardStatement from "../../../components/CardStatement";
import { getBalance, getStatement } from "../../lib/balanceHelper";

export default async  function () {
   const statement = await getStatement();
   const balance = await getBalance();

  return (
    <div className="flex flex-col wd-full w-3/4">
      <div><BalanceCard amount={balance.amount} locked={balance.locked}/></div>
      <div>
        <CardStatement statement={statement} />
      </div>
    </div>
  );
}
