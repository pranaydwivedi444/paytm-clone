import express from "express";
import cors from "cors";
import db from "@repo/db/client";
const app = express();

app.use(express.json());
app.use(cors());
app.post("/hdfcWebhook", async (req, res) => {
  //zod validation
  //hdfc sends a secret code
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    //implementing a transcation here
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "captured",
    });
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.post("/hdfcWithdrawlWebhook", async (req, res) => {
  //zod validation
  //hdfc sends a secret code
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    //implementing a transcation here
    await db.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(paymentInformation.userId)} FOR UPDATE`;
      const Balance = await tx.balance.findUnique({
        where: { userId: Number(paymentInformation.userId) },
      });
      if (!Balance || Balance.amount < Number(paymentInformation.amount)) {
        throw new Error("Insufficient funds");
      }
      await tx.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            decrement: Number(paymentInformation.amount),
          },
        },
      });
      await tx.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });

    res.json({
      message: "captured",
    });
  } catch (error) {
    console.error(error);
    await db.onRampTransaction.update({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Failure",
      },
    });

    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () => {
  console.log("webhook server working");
});
