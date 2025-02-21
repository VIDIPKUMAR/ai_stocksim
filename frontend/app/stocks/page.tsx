"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, TrendingUp, ShoppingCart, Archive, Award, Brain } from "lucide-react"

const stockOptions = ["Trends", "Open Trades", "Closed Trades", "LeaderBoard", "AI Insights"]

export default function Stocks() {
  const [selectedOption, setSelectedOption] = useState("Trends")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-royal-red">Simulated Stocks</h1>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search stocks..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white text-navy-blue border border-navy-blue focus:outline-none focus:ring-2 focus:ring-royal-red"
          />
          <Search className="absolute left-3 top-2.5 text-navy-blue" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {stockOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`px-4 py-2 rounded-full flex items-center ${
              selectedOption === option
                ? "bg-royal-red text-white"
                : "bg-white text-navy-blue border border-navy-blue hover:bg-navy-blue hover:text-white"
            }`}
          >
            {option === "Trends" && <TrendingUp className="mr-2" size={18} />}
            {option === "Open Trades" && <ShoppingCart className="mr-2" size={18} />}
            {option === "Closed Trades" && <Archive className="mr-2" size={18} />}
            {option === "LeaderBoard" && <Award className="mr-2" size={18} />}
            {option === "AI Insights" && <Brain className="mr-2" size={18} />}
            {option}
          </button>
        ))}
      </div>

      {selectedOption === "Trends" && <TrendsSection />}
      {selectedOption === "Open Trades" && <OpenTradesSection />}
      {selectedOption === "Closed Trades" && <ClosedTradesSection />}
      {selectedOption === "LeaderBoard" && <LeaderBoardSection />}
      {selectedOption === "AI Insights" && <AIInsightsSection />}
    </div>
  )
}

function TrendsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-royal-red">Stocks in Profit</h2>
        <StockList
          stocks={[
            { name: "AAPL", price: 150.25, change: 2.5 },
            { name: "GOOGL", price: 2750.1, change: 1.8 },
            { name: "MSFT", price: 305.75, change: 3.2 },
          ]}
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-royal-red">Stocks in Loss</h2>
        <StockList
          stocks={[
            { name: "TSLA", price: 680.5, change: -1.5 },
            { name: "FB", price: 330.2, change: -0.8 },
            { name: "NFLX", price: 510.75, change: -2.2 },
          ]}
        />
      </div>
    </div>
  )
}

function StockList({ stocks }) {
  return (
    <div className="space-y-2">
      {stocks.map((stock) => (
        <Link key={stock.name} href={`/stocks/${stock.name}`} className="block">
          <div className="bg-white p-4 rounded-lg hover:bg-gray-100 border border-navy-blue">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-navy-blue">{stock.name}</span>
              <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                ${stock.price.toFixed(2)} ({stock.change > 0 ? "+" : ""}
                {stock.change.toFixed(2)}%)
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function OpenTradesSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
        <ShoppingCart className="mr-2" />
        Open Trades
      </h2>
      <p className="text-navy-blue">Your simulated open trades will be displayed here.</p>
    </div>
  )
}

function ClosedTradesSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
        <Archive className="mr-2" />
        Closed Trades
      </h2>
      <p className="text-navy-blue">Your past simulated trades will be displayed here.</p>
    </div>
  )
}

function LeaderBoardSection() {
  // This data would normally come from an API
  const topStocks = [
    { rank: 1, name: "AAPL", price: 150.25, change: 2.5 },
    { rank: 2, name: "GOOGL", price: 2750.1, change: 1.8 },
    { rank: 3, name: "MSFT", price: 305.75, change: 3.2 },
    { rank: 4, name: "AMZN", price: 3380.5, change: 1.2 },
    { rank: 5, name: "TSLA", price: 680.5, change: -1.5 },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
        <Award className="mr-2" />
        Global Stock LeaderBoard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-navy-blue text-white">
              <th className="p-2">Rank</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Price</th>
              <th className="p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {topStocks.map((stock) => (
              <tr key={stock.name} className="border-b border-navy-blue">
                <td className="p-2 text-navy-blue">{stock.rank}</td>
                <td className="p-2 text-navy-blue">{stock.name}</td>
                <td className="p-2 text-navy-blue">${stock.price.toFixed(2)}</td>
                <td className={`p-2 ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AIInsightsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
        <Brain className="mr-2" />
        AI Insights
      </h2>
      <p className="text-navy-blue">AI-powered stock advice for your simulated trading will be displayed here.</p>
    </div>
  )
}

