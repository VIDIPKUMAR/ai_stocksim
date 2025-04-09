'use client';
import { useParams } from 'next/navigation';
import TradingViewChart from '../stockgraph';
import {app} from "../../firebase";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from '@/app/components/navbar';

const auth = getAuth();
const database = getDatabase(app);
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cvlvrapr01qnndmb73v0cvlvrapr01qnndmb73vg";
const finnhubClient = new finnhub.DefaultApi();

export default function StockDetails() {
    const [userid, setUserid] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [news, setNews] = useState([]);
    const [ownedStock, setOwnedStock] = useState(false);
    const [soldStock, setSoldStock] = useState(false);
    const params = useParams();
    const stocky = params.stockname;

    const checkStockStatus = () => {
        if (!userid) return;
        
        const openRef = ref(database, `trades/${userid}/open/${stocky}`);
        const closedRef = ref(database, `trades/${userid}/closed/${stocky}`);
        
        onValue(openRef, (snapshot) => {
            setOwnedStock(snapshot.exists());
        });
        
        onValue(closedRef, (snapshot) => {
            setSoldStock(snapshot.exists());
        });
    };

    const getStockPrice = () => {
        finnhubClient.quote(stocky, (error, data) => {
            if (!error && data) {
                setCurrentPrice(data.c);
            }
        });
    };

    const getCompanyNews = () => {
        const today = new Date();
        const fromDate = new Date();
        fromDate.setMonth(today.getMonth() - 1);
        
        finnhubClient.companyNews(
            stocky, 
            fromDate.toISOString().split('T')[0], 
            today.toISOString().split('T')[0], 
            (error, data) => {
                if (!error && data) {
                    setNews(data.slice(0, 5));
                }
            }
        );
    };

    const handleBuy = () => {
        if (ownedStock || soldStock) {
            alert("You already own or have sold this stock!");
            return;
        }
        
        if (!currentPrice) {
            alert("Unable to get current price. Try again.");
            return;
        }

        const reference = ref(database, `trades/${userid}/open/${stocky}`);
        set(reference, {
            buyPrice: currentPrice,
            buyDate: new Date().toISOString(),
            quantity: 1
        }).then(() => {
            alert("Stock purchased successfully!");
            checkStockStatus();
        }).catch(error => {
            console.error("Buy failed:", error);
        });
    };

    const handleSell = () => {
        if (!ownedStock) {
            alert("You don't own this stock to sell!");
            return;
        }
        
        if (soldStock) {
            alert("You already sold this stock!");
            return;
        }

        const openRef = ref(database, `trades/${userid}/open/${stocky}`);
        const closedRef = ref(database, `trades/${userid}/closed/${stocky}`);
        
        onValue(openRef, (snapshot) => {
            if (snapshot.exists()) {
                const stockData = snapshot.val();
                set(closedRef, {
                    ...stockData,
                    sellPrice: currentPrice,
                    sellDate: new Date().toISOString()
                }).then(() => {
                    set(openRef, null).then(() => {
                        alert("Stock sold successfully!");
                        checkStockStatus();
                    });
                });
            }
        });
    };

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
        checkStockStatus();
        getStockPrice();
        getCompanyNews();
    }, [userid, stocky]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Chart Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <TradingViewChart symbol={stocky} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Price and Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{stocky}</h2>
                                    {currentPrice && (
                                        <p className="text-2xl font-semibold mt-2">
                                            ${currentPrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                <button 
                                    onClick={handleBuy}
                                    disabled={ownedStock}  // Only check if currently owned
                                    className={`px-4 py-2 rounded-md font-medium w-full sm:w-auto ${
                                    ownedStock
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                     }`}
                                >   
                                    Buy
                                </button>
                                    <button 
                                        onClick={handleSell}
                                        disabled={!ownedStock || soldStock}
                                        className={`px-4 py-2 rounded-md font-medium w-full sm:w-auto ${
                                            !ownedStock || soldStock 
                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                    >
                                        Sell
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* News Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest News</h3>
                            <div className="space-y-4">
                                {news.length > 0 ? (
                                    news.map((item, index) => (
                                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                            <a 
                                                href={item.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                <h4 className="font-medium">{item.headline}</h4>
                                            </a>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(item.datetime * 1000).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })} • {item.source}
                                            </p>
                                            {item.summary && (
                                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                                    {item.summary}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No recent news found</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Status */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Position</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Owned:</span>
                                <span className={ownedStock ? "text-green-600 font-medium" : "text-gray-500"}>
                                    {ownedStock ? "Yes" : "No"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Previously Sold:</span>
                                <span className={soldStock ? "text-yellow-600 font-medium" : "text-gray-500"}>
                                    {soldStock ? "Yes" : "No"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}