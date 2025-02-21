"use client"

import { useParams } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { BarChart2, DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

export default function StockDetail() {
  const params = useParams()
  const symbol = params.symbol

  // This data would normally come from an API
  const stockData = [
    { date: "2023-01-01", price: 100 },
    { date: "2023-02-01", price: 120 },
    { date: "2023-03-01", price: 110 },
    { date: "2023-04-01", price: 130 },
    { date: "2023-05-01", price: 140 },
    { date: "2023-06-01", price: 135 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center text-royal-red">
        <BarChart2 className="mr-2" />
        {symbol} Simulated Stock Details
      </h1>

      <div className="bg-white p-6 rounded-lg border border-navy-blue">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
          <TrendingUp className="mr-2" />
          Price Chart
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#B22234" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg border border-navy-blue">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
          <DollarSign className="mr-2" />
          Simulated Trading
        </h2>
        <p className="mb-4 text-navy-blue">
          Use this simulated environment to practice your trading strategies without risking real money.
        </p>
        <div className="flex space-x-4">
          <button className="bg-royal-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <TrendingUp className="mr-2" />
            Buy (Simulated)
          </button>
          <button className="bg-navy-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded flex items-center">
            <TrendingDown className="mr-2" />
            Sell (Simulated)
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-navy-blue">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-royal-red">
          <AlertCircle className="mr-2" />
          Disclaimer
        </h2>
        <p className="text-navy-blue">
          This is a simulated trading platform. No real money is involved. Use this tool to learn and practice trading
          strategies in a risk-free environment.
        </p>
      </div>
    </div>
  )
}

