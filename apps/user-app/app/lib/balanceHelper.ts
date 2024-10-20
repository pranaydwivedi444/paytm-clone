import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function getBalance() {
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

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
    type: t.type,
  }));
}

export async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const transactions = await prisma.p2PTransfer.findMany({
    where: {
      OR: [{ fromUserId: Number(userId) }, { toUserId: Number(userId) }],
    },
    include: {
      fromUser: true,
      toUser: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  const recentTransactions = transactions.map((transaction) => {
    let type: "Debit" | "Credit" =
      userId == transaction.fromUserId ? "Debit" : "Credit";
    return {
      amount: transaction.amount,
      time: transaction.timestamp,
      phoneNumber: transaction.toUser.number,
      name: transaction.toUser.name || "",
      type,
    };
  });
  return recentTransactions;
}


export async function getStatement(){
    const ramp = await getOnRampTransactions();
    const p2p = await getP2PTransactions();
    
    const statment = [...ramp, ...p2p]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .map((t) => ({
        ...t,
        time: new Date(t.time).toDateString(), 
      }));
    return statment;
    
}