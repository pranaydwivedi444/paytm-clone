import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2PTranscations } from "../../../components/P2PTransactions";

async function getBalance() {
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
}

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const transactions = await prisma.p2PTransfer.findMany({
    where: {
      OR: [{ fromUserId: Number(userId) } ,
        {toUserId : Number(userId)}
      ],
    },include :{
        fromUser :true,
        toUser :true,
    },
    orderBy :{
        timestamp:"desc",
    },
  });
    

  const recentTransactions =  transactions.map((transaction)=>{
        let type: "Debit" | "Credit" =
          userId == transaction.fromUserId ? "Debit" : "Credit";
        return {
          amount: transaction.amount,
          time: transaction.timestamp,
          phoneNumber : transaction.toUser.number,
          name : transaction.toUser.name || "",
          type
        };
    })
    console.log(recentTransactions)
   return (recentTransactions)

}

export default async function () {
   const transactions =  await getP2PTransactions();
   const balance = await getBalance();
  return (
    <div className="w-screen ">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
        <div>
          <SendCard/>
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <P2PTranscations transactions={transactions} />

          </div>
        </div>
      </div>
    </div>
  );
}


