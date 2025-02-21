import Link from "next/link"
import { BarChart2, TrendingUp, Users, DollarSign } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-royal-red">Welcome to StockSim</h1>
        <p className="text-xl text-navy-blue">
          Your risk-free platform for simulating stock trading and honing your investment skills
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-navy-blue p-6 rounded-lg text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2" />
            Our Purpose
          </h2>
          <p>
            StockSim aims to provide a realistic stock trading simulation environment where users can practice investing
            strategies without risking real money. Perfect for beginners and experienced traders alike.
          </p>
        </div>
        <div className="bg-navy-blue p-6 rounded-lg text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" />
            Key Features
          </h2>
          <ul className="list-disc list-inside">
            <li>Real-time stock data simulation</li>
            <li>Risk-free trading environment</li>
            <li>AI-powered insights for learning</li>
            <li>Portfolio management tools</li>
            <li>Global leaderboard for competitive learning</li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center text-royal-red">
          <Users className="mr-2" />
          Contact the Developers
        </h2>
        <p className="text-navy-blue">Email: developers@stocksim.com</p>
        <p className="text-navy-blue">Phone: (123) 456-7890</p>
      </section>

      <div className="text-center">
        <Link
          href="/stocks"
          className="inline-block bg-royal-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <DollarSign className="mr-2" />
          Start Simulating Now
        </Link>
      </div>
    </div>
  )
}

