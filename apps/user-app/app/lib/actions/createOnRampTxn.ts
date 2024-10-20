"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions(
  amount: number,
  provider: string,
  type: "Deposit" | "Withdrawal"
) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("You are not logged in");
  }

  try {
    const transaction = await prisma.onRampTransaction.create({
      data: {
        userId: Number(userId),
        amount,
        provider,
        status: "Processing",
        token: Math.random().toString(36).substr(2),
        startTime: new Date(),
        type: type,
      },
    });

    return transaction;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create onramp transaction");
  }
}
