"use client";
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const database = getDatabase(app);
const auth = getAuth();

export default function Leaders() {
    const [leaders, setLeaders] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        const leadersRef = ref(database, 'trades');
        
        const unsubscribeLeaders = onValue(leadersRef, (snapshot) => {
            const usersData = snapshot.val();
            if (!usersData) {
                setLoading(false);
                return;
            }

            // Calculate performance for each user
            const leaderboard = Object.entries(usersData).map(([userId, userTrades]) => {
                let profit = 0;
                let totalInvested = 0;
                let closedTrades = 0;
                let openTrades = 0;

                if (userTrades.closed) {
                    closedTrades = Object.keys(userTrades.closed).length;
                    Object.values(userTrades.closed).forEach(trade => {
                        const tradeProfit = (trade.sellPrice - trade.buyPrice) * (trade.quantity || 1);
                        profit += tradeProfit;
                        totalInvested += trade.buyPrice * (trade.quantity || 1);
                    });
                }

                if (userTrades.open) {
                    openTrades = Object.keys(userTrades.open).length;
                    Object.values(userTrades.open).forEach(trade => {
                        totalInvested += trade.buyPrice * (trade.quantity || 1);
                    });
                }

                const userInfoRef = ref(database, `users/${userId}`);
                return new Promise((resolve) => {
                    onValue(userInfoRef, (userSnapshot) => {
                        const userData = userSnapshot.val();
                        resolve({
                            userId,
                            name: userData?.name || 'Anonymous',
                            email: userData?.email || '',
                            profit: parseFloat(profit.toFixed(2)),
                            totalInvested: parseFloat(totalInvested.toFixed(2)),
                            returnPercentage: totalInvested > 0 ? 
                                parseFloat(((profit / totalInvested) * 100).toFixed(2)) : 0,
                            closedTrades,
                            openTrades
                        });
                    }, { onlyOnce: true });
                });
            });

            Promise.all(leaderboard).then(completedLeaderboard => {
                completedLeaderboard.sort((a, b) => b.profit - a.profit);
                setLeaders(completedLeaderboard);
                setLoading(false);
            });
        });

        return () => {
            unsubscribeAuth();
            unsubscribeLeaders();
        };
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h1>
                <div className="animate-pulse flex flex-col items-center py-8">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trader</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Profit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return %</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaders.map((user, index) => (
                            <tr 
                                key={user.userId} 
                                className={`${currentUser?.uid === user.userId ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.name}
                                    {currentUser?.uid === user.userId && (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            You
                                        </span>
                                    )}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                    user.profit >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    ${user.profit.toLocaleString()}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                    user.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {user.returnPercentage}%
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.closedTrades}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.openTrades}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {leaders.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No trading data available yet</p>
                    <p className="text-sm text-gray-400 mt-2">Start trading to appear on the leaderboard</p>
                </div>
            )}
        </div>
    );
}