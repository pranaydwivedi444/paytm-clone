"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransactions } from "../app/lib/actions/createOnRampTxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function () {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  async function handleTransaction() {
    try {
      const result = await createOnRampTransactions(amount * 100, provider , 'Withdrawal');
      console.log(result);

      //post webhook
      const response = await fetch(
        "http://localhost:3003/hdfcWithdrawlWebhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: result.token,
            userId: result.userId,
            amount: amount * 100,
          }),
        }
      );
      const data = await response.json();
      console.log("Webhook response:", data);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card title="Withdraw Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              handleTransaction();
              // await createOnRampTransactions(amount * 100,provider);
              // window.location.href = redirectUrl || "";
            }}
          >
            Withdraw Money
          </Button>
        </div>
      </div>
    </Card>
  );
};