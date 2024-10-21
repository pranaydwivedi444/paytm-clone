"use client";
import { Button } from "@repo/ui/button";
import { Statement } from "./Statement";
import { useRouter } from "next/navigation";
import { getStatement } from "../app/lib/balanceHelper";

export default  function CardStatement({statement, showButton = false}) {
  const router = useRouter();
  return (
    <div className="bg-white shadow rounded-lg p-6 ">
      <Statement transactions={statement} />
      {showButton && (
        <div className="mt-4">
          
          <Button
            onClick={() => {
              router.push("/transactions");
            }}
          >
            Show All Transactions
          </Button>
          
        </div>
      )}
    </div>
  );
}
