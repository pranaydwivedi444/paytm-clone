"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="flex space-x-4">
      <Button onClick={() => router.push("/p2p")}>Go to P2P Transfer</Button>
      <Button onClick={() => router.push("/transfer")}>
        Go to Add Funds
      </Button>
    </div>
  );
}
