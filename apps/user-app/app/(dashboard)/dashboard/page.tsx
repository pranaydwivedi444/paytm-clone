import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getBalance, getStatement } from "../../lib/balanceHelper";
import { BalanceCard } from "../../../components/BalanceCard";
import { Statement } from "../../../components/Statement";

async function getUserDetails() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export default async function HomePage() {
  const user = await getUserDetails();
  const balance = await getBalance();
  const statement = await getStatement();

  const randomCardNumber = `**** **** **** ${Math.floor(
    1000 + Math.random() * 9000
  )}`;
  const fakeCVV = Math.floor(100 + Math.random() * 900);
  const expiryDate = "12/28";

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            DASHBOARD | NAMASTE {user.name.toUpperCase()}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* User Card */}
        <div className="w-full bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, {user.name.toUpperCase()}
          </h2>
          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              Card Number:{" "}
              <span className="font-semibold">{randomCardNumber}</span>
            </p>
            <p className="text-gray-700 text-sm">
              CVV: <span className="font-semibold">{fakeCVV}</span>
            </p>
            <p className="text-gray-700 text-sm">
              Expiry Date: <span className="font-semibold">{expiryDate}</span>
            </p>
          </div>
        </div>

        {/* Balance and Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>

          {/* Statement Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <Statement
              transactions={
               statement.slice(0, 5)
              }
            />
            <div className="mt-4">
              <button
               
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                { "Show All Transactions"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
