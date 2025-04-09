"use client";
import { app } from "../../../firebase";
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();
const database = getDatabase(app);

export default function Open() {
    const [userid, setUserid] = useState(null);
    const [openStocks, setOpenStocks] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserid(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userid) return;

        const reference = ref(database, `trades/${userid}/open`);
        
        const unsubscribe = onValue(reference, (snapshot) => {
            if (snapshot.exists()) {
                const stocksData = snapshot.val();
                const stocksList = Object.entries(stocksData).map(([symbol, data]) => ({
                    symbol,
                    ...data,
                    currentPrice: 0 // We'll add this later when fetching real-time prices
                }));
                setOpenStocks(stocksList);
            } else {
                setOpenStocks([]);
            }
        });

        return () => unsubscribe();
    }, [userid]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Your Open Positions</h1>
            
            {openStocks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {openStocks.map((stock, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.buyPrice?.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.currentPrice?.toFixed(2) || 'Loading...'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(stock.buyDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {stock.currentPrice ? (
                                            <span className={`${stock.currentPrice > stock.buyPrice ? 'text-green-600' : 'text-red-600'}`}>
                                                {((stock.currentPrice - stock.buyPrice) * stock.quantity).toFixed(2)} (
                                                {(((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100).toFixed(2)}%)
                                            </span>
                                        ) : '--'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No open positions found</p>
                    <p className="text-sm text-gray-400 mt-2">Start trading to see your positions here</p>
                </div>
            )}
        </div>
    );
}