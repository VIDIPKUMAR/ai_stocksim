"use client";
import { app } from "../../../firebase";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';

const auth = getAuth();
const database = getDatabase(app);
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cvlvrapr01qnndmb73v0cvlvrapr01qnndmb73vg";
const finnhubClient = new finnhub.DefaultApi();

export default function Gainers() {
    const router = useRouter();
    const [userid, setUserid] = useState(null);
    const [stockname, setStockname] = useState([]);
    const [gainers, setGainers] = useState({ names: [], prices: [] });
    const stocknameRef = useRef(stockname);

    useEffect(() => {
        stocknameRef.current = stockname;
    }, [stockname]);

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
      
        const reference = ref(database, 'stocks/' + userid);
        
        const unsubscribe = onValue(reference, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setStockname(Object.keys(data));
          } else {
            setStockname([]);
          }
        }, (error) => {
          console.error("Database error:", error);
        });
      
        return () => unsubscribe();
    }, [userid]);

    useEffect(() => {
        if (stockname.length === 0) return;

        const tempGainers = { names: [], prices: [] };
        let processedCount = 0;

        stockname.forEach((symbol) => {
            finnhubClient.quote(symbol, (error, data) => {
                const reference = ref(database, 'stocks/' + userid + "/" + symbol);
                set(reference, {
                    data: data,
                });
                if (data?.c >= data?.pc) {
                    tempGainers.names.push(symbol);
                    tempGainers.prices.push(data.c);
                }

                processedCount++;
                if (processedCount === stockname.length) {
                    setGainers(tempGainers);
                }
            });
        });
    }, [stockname]);

    const handleclick = (name) => {
        router.push('/stock'+`/${name}`);
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Top Gainers</h1>
            {gainers.names.length > 0 ? (
                <ul className="space-y-3">
                    {gainers.names.map((name, index) => {
                        const priceChange = ((gainers.prices[index] - gainers.prices[index]) / gainers.prices[index] * 100).toFixed(2);
                        return (
                            <li 
                                key={name}
                                onClick={() => handleclick(name)}
                                className="flex justify-between items-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                            >
                                <span className="font-medium text-gray-800">{name}</span>
                                <span className="font-bold text-green-600">
                                    +{priceChange}% (${gainers.prices[index].toFixed(2)})
                                </span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-4">No gainers found in your portfolio</p>
            )}
        </div>
    );
}