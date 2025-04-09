

export default function Footer(){

    return(
        <footer className="sticky top-full bg-gray-900 text-gray-300 py-4 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 StockSim - Practice trading with virtual currency
            <span className="block mt-1 text-xs text-gray-500">
              Market data provided by Finnhub | Not real money | Educational purposes only
            </span>
          </p>
        </div>
      </footer>);
}