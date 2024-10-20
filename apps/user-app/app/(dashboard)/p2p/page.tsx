import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2PTranscations } from "../../../components/P2PTransactions";
import { getBalance, getP2PTransactions } from "../../lib/balanceHelper";




export default async function () {
   const transactions =  await getP2PTransactions();
   const balance = await getBalance();
  return (
    <div className="w-full ">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="w-full flex flex-col grow  md:flex-row justify-center gap-10">
        <div className="flex-grow">
          <div>
            <SendCard />
          </div>
        </div>
        <div className="flex-grow">
          <div className="p-4 ">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
          <div className="p-4 ">
            <P2PTranscations transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );

}


