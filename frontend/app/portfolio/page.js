"use client";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GoogleSignInButton from "./googlesigninbutton";
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from "../firebase";

const auth = getAuth();
const database = getDatabase(app);

export default function Portfolio() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(0);
    const [closed, setClosed] = useState(0);
    const [profitable, setProfitable] = useState(0);
    const [loss, setLoss] = useState(0);
    const [totalProfit, setTotalProfit] = useState('0.00');
    const [totalLoss, setTotalLoss] = useState('0.00');
    const [totalSpent, setTotalSpent] = useState('0.00');
    const [overallOutcome, setOverallOutcome] = useState('0.00');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userId = currentUser.uid;
                const tradesRef = ref(database, `trades/${userId}`);

                onValue(tradesRef, (snapshot) => {
                    const tradesData = snapshot.val();
                    if (tradesData) {
                        // Calculate open and closed trades
                        const openTrades = tradesData.open ? Object.keys(tradesData.open).length : 0;
                        const closedTrades = tradesData.closed ? Object.keys(tradesData.closed).length : 0;
                        
                        // Calculate profit/loss stats
                        let profitableCount = 0;
                        let lossCount = 0;
                        let profitTotal = 0;
                        let lossTotal = 0;
                        let spentTotal = 0;

                        if (tradesData.closed) {
                            Object.values(tradesData.closed).forEach(trade => {
                                const profit = (trade.sellPrice - trade.buyPrice) * (trade.quantity || 1);
                                if (profit > 0) {
                                    profitableCount++;
                                    profitTotal += profit;
                                } else {
                                    lossCount++;
                                    lossTotal += Math.abs(profit);
                                }
                                spentTotal += trade.buyPrice * (trade.quantity || 1);
                            });
                        }

                        if (tradesData.open) {
                            Object.values(tradesData.open).forEach(trade => {
                                spentTotal += trade.buyPrice * (trade.quantity || 1);
                            });
                        }

                        setOpen(openTrades);
                        setClosed(closedTrades);
                        setProfitable(profitableCount);
                        setLoss(lossCount);
                        setTotalProfit(profitTotal.toFixed(2));
                        setTotalLoss(lossTotal.toFixed(2));
                        setTotalSpent(spentTotal.toFixed(2));
                        setOverallOutcome((profitTotal - lossTotal).toFixed(2));
                    }
                });
            }
        });
        return () => unsubscribe();
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Portfolio</h1>
                        <GoogleSignInButton />
                        <p className="mt-4 text-gray-600">Please sign in to view your portfolio</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>
                        <GoogleSignInButton />
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                            />
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-semibold text-gray-800">{user.displayName}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">UID: {user.uid}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Trade Statistics */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Trade Statistics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard label="Open Trades" value={open} />
                                <StatCard label="Closed Trades" value={closed} />
                                <StatCard label="Profitable" value={profitable} variant="success" />
                                <StatCard label="Loss" value={loss} variant="danger" />
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Financial Summary</h2>
                            <div className="space-y-3">
                                <FinancialRow label="Total Profit" value={totalProfit} positive />
                                <FinancialRow label="Total Loss" value={totalLoss} negative />
                                <FinancialRow label="Total Spent" value={totalSpent} />
                                <FinancialRow 
                                    label="Overall Outcome" 
                                    value={overallOutcome} 
                                    highlight 
                                    positive={parseFloat(overallOutcome) >= 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// Reusable Stat Card Component
function StatCard({ label, value, variant = 'default' }) {
    const variantClasses = {
        default: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800'
    };

    return (
        <div className={`p-3 rounded-lg ${variantClasses[variant]}`}>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-lg font-bold">{value}</p>
        </div>
    );
}

// Reusable Financial Row Component
function FinancialRow({ label, value, positive = false, negative = false, highlight = false }) {
    const textColor = positive ? 'text-green-600' : negative ? 'text-red-600' : 'text-gray-800';
    const bgColor = highlight ? (positive ? 'bg-green-50' : negative ? 'bg-red-50' : 'bg-gray-50') : 'bg-white';
    
    return (
        <div className={`flex justify-between items-center p-3 rounded-lg ${bgColor}`}>
            <span className="font-medium text-gray-700">{label}</span>
            <span className={`font-bold ${textColor}`}>${value}</span>
        </div>
    );
}