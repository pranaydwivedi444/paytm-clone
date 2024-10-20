
export default  function() {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Balance Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Current Balance
              </h3>
              <p className="mt-1 max-w-2xl text-xl text-gray-500">
                {/* ${balance.toFixed(2)} */}
                 Balance
              </p>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                Add Money
              </button>
              <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Withdraw
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Transactions
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                A list of your recent transactions.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {/* {transactions.length === 0 ? (
                  <div className="p-4 text-gray-500">
                    No transactions found.
                  </div>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt className="text-sm font-medium text-gray-500">
                        {transaction.type}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="font-bold">${transaction.amount}</span>{" "}
                        - {transaction.status} on {transaction.date}
                      </dd>
                    </div>
                  ))
                )} */}
                transactions
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

