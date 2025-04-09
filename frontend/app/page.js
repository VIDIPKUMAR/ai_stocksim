import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StockSim</h1>
            <h2 className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Your risk-free platform for simulating stock trading and honing your investment skills
            </h2>
            <a 
              href="/stock" 
              className="mt-8 inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Simulating Now
            </a>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Our Purpose */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Purpose</h2>
              <p className="text-gray-600">
                StockSim provides a realistic stock trading simulation environment where users can practice investing 
                strategies without risking real money. Perfect for beginners learning the markets and experienced traders 
                testing new approaches.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">Real-time stock data simulation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">Risk-free trading environment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">AI-powered insights for learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">Portfolio management tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">Global leaderboard for competitive learning</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How StockSim Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign Up & Explore</h3>
                <p className="text-gray-600">
                  Create your free account and explore our simulated market with $100,000 in virtual funds.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Research & Trade</h3>
                <p className="text-gray-600">
                  Use our tools to research stocks and execute trades just like the real market.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Improve</h3>
                <p className="text-gray-600">
                  Analyze your performance and learn from our AI-powered insights.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Learning Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://www.investopedia.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Investopedia</h3>
                <p className="text-gray-600">
                  Comprehensive investing education with tutorials, articles, and a stock simulator.
                </p>
              </a>
              <a href="https://www.khanacademy.org/college-careers-more/personal-finance" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Khan Academy</h3>
                <p className="text-gray-600">
                  Free personal finance and investing courses from beginner to advanced.
                </p>
              </a>
              <a href="https://www.sec.gov/reportspubs/investor-publications/investor-publications.html" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">SEC Investor Education</h3>
                <p className="text-gray-600">
                  Official investor education materials from the U.S. Securities and Exchange Commission.
                </p>
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact the Developers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
                <a href="mailto:francisamal030@gmail.com" className="text-blue-600 hover:underline">
                  francisamal030@gmail.com
                </a>
                <br></br>
                <a href="mailto:ssvidip@gmail.com " className="text-blue-600 hover:underline">
                  ssvidip@gmail.com                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
                <a href="tel:+919363032004" className="text-blue-600 hover:underline">
                  (91) 9363032004
                </a>
                <br></br>
                <a href="tel:+919384844941" className="text-blue-600 hover:underline">
                  (91) 9384844941
                </a>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}