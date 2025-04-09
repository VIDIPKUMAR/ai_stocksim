"use client";
import { app } from "../../../firebase";
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();
const database = getDatabase(app);

export default function Closed() {
    const [userid, setUserid] = useState(null);
    const [closedStocks, setClosedStocks] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUserid(user.uid);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!userid) return;

        const reference = ref(database, `trades/${userid}/closed`);
        const unsubscribe = onValue(reference, (snapshot) => {
            const stocks = snapshot.exists() ? Object.entries(snapshot.val()).map(([symbol, data]) => ({
                symbol,
                ...data,
                profit: (data.sellPrice - data.buyPrice) * (data.quantity || 1),
                profitPercentage: ((data.sellPrice - data.buyPrice) / data.buyPrice * 100),
                daysHeld: Math.round((new Date(data.sellDate) - new Date(data.buyDate)) / (1000 * 60 * 60 * 24))
            })) : [];
            setClosedStocks(stocks);
        });
        return () => unsubscribe();
    }, [userid]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Closed Positions</h2>
            
            {closedStocks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Held (Days)</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {closedStocks.map((stock, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {stock.symbol}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${stock.buyPrice?.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${stock.sellPrice?.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {stock.quantity || 1}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {stock.daysHeld}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`${stock.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ${stock.profit.toFixed(2)} ({stock.profitPercentage.toFixed(2)}%)
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No closed positions found</p>
                    <p className="text-sm text-gray-400 mt-2">Your completed trades will appear here</p>
                </div>
            )}
        </div>
    );
}