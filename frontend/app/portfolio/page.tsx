import {
  User,
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ShoppingCart,
  Archive,
  LogIn,
} from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  // This data would normally come from the backend
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    openTradeCount: 5,
    closedTradeCount: 10,
    profitableTradeCount: 8,
    lossTradeCount: 7,
    totalProfit: 1500,
    totalSpent: 10000,
    overallOutcome: 11500,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-royal-red">Simulated Portfolio</h1>
        <Link
          href="/login"
          className="bg-royal-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <LogIn className="mr-2" size={18} />
          Login
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg border border-navy-blue">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
          <User className="mr-2" />
          User Information
        </h2>
        <p className="text-navy-blue">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="text-navy-blue">
          <strong>Email:</strong> {userData.email}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-navy-blue">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
            <Briefcase className="mr-2" />
            Simulated Trade Statistics
          </h2>
          <p className="flex items-center text-navy-blue">
            <ShoppingCart className="mr-2 text-royal-red" /> <strong>Open Trades:</strong> {userData.openTradeCount}
          </p>
          <p className="flex items-center text-navy-blue">
            <Archive className="mr-2 text-royal-red" /> <strong>Closed Trades:</strong> {userData.closedTradeCount}
          </p>
          <p className="flex items-center text-navy-blue">
            <TrendingUp className="mr-2 text-royal-red" /> <strong>Profitable Trades:</strong>{" "}
            {userData.profitableTradeCount}
          </p>
          <p className="flex items-center text-navy-blue">
            <TrendingDown className="mr-2 text-royal-red" /> <strong>Loss Trades:</strong> {userData.lossTradeCount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-navy-blue">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
            <PieChart className="mr-2" />
            Simulated Financial Summary
          </h2>
          <p className="flex items-center text-navy-blue">
            <DollarSign className="mr-2 text-royal-red" /> <strong>Total Profit/Loss:</strong> ${userData.totalProfit}
          </p>
          <p className="flex items-center text-navy-blue">
            <DollarSign className="mr-2 text-royal-red" /> <strong>Total Spent:</strong> ${userData.totalSpent}
          </p>
          <p className="flex items-center text-navy-blue">
            <DollarSign className="mr-2 text-royal-red" /> <strong>Overall Outcome:</strong> ${userData.overallOutcome}
          </p>
        </div>
      </div>
    </div>
  )
}

