"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Trends from "../components/trends/trends";
import Trades from "../components/trades/trades";
import Leaders from "../components/leaders";
import AI from "../components/ai";
import {useState, useEffect} from "react";
import {app} from "../firebase";
import {getDatabase, set, ref} from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const database = getDatabase(app);
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cvlvrapr01qnndmb73v0cvlvrapr01qnndmb73vg" // Replace this
const finnhubClient = new finnhub.DefaultApi() 

export default function Stock(){
    const [stockname, setstockname] = useState("");
    const [input, setinput] = useState("");
    const [option, setoption] = useState(0);
    const [userid, setUserid] = useState(null);
    


    const handleoption = (number) => {
        setoption(number);
    }

    const handleinput = (e) => {
        setinput(e.target.value);
    }

    const handleclick = () => {
        setstockname(input.toUpperCase());
        setinput("");
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUserid(user.uid);
            } else {
              console.log("User is signed out");
            }
        });
        finnhubClient.quote(`${stockname}` , (error, data, response) => {
            if (data !== null) {
                const reference = ref(database, 'stocks/' + userid+"/"+ stockname+"/");
                if(stockname === ""){
                    return;
                }
                set(reference, {
                    data,
                });
            }
        });
    }, [stockname]);

    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            <main className="flex-grow p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Stock Dashboard</h1>
                    
                    {/* Stock Input Section */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <input 
                            type="text" 
                            placeholder="Enter stock name or symbol (e.g. AAPL)" 
                            value={input} 
                            onChange={handleinput}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                            onClick={handleclick}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Stock
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
                        <button 
                            onClick={() => handleoption(0)}
                            className={`px-4 py-2 rounded-t-lg font-medium ${option === 0 ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Trends
                        </button>
                        <button 
                            onClick={() => handleoption(1)}
                            className={`px-4 py-2 rounded-t-lg font-medium ${option === 1 ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Trades
                        </button>
                        <button 
                            onClick={() => handleoption(2)}
                            className={`px-4 py-2 rounded-t-lg font-medium ${option === 2 ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Leaders
                        </button>
                        <button 
                            onClick={() => handleoption(3)}
                            className={`px-4 py-2 rounded-t-lg font-medium ${option === 3 ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            AI Analysis
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                        {option === 0 && <Trends/>}
                        {option === 1 && <Trades/>}
                        {option === 2 && <Leaders/>}
                        {option === 3 && <AI/>}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}