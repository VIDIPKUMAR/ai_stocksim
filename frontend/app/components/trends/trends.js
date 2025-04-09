"use client";
import { useState } from "react";
import Gainers from "./subcomp/gainers";
import Losers from "./subcomp/losers";

export default function Trends() {
   const [option, setoption] = useState(0);
   
   const handleoption = (number) => {
       setoption(number);
   };

   return (
       <div className="p-4">
           {/* Header */}
           <h1 className="text-2xl font-bold text-gray-800 mb-6">Market Trends</h1>
           
           {/* Tab Navigation */}
           <div className="flex border-b border-gray-200 mb-6">
               <button 
                   onClick={() => handleoption(0)}
                   className={`px-4 py-2 font-medium text-sm ${option === 0 
                       ? 'text-blue-600 border-b-2 border-blue-500' 
                       : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
               >
                   Gainers
               </button>
               <button 
                   onClick={() => handleoption(1)}
                   className={`px-4 py-2 font-medium text-sm ${option === 1 
                       ? 'text-blue-600 border-b-2 border-blue-500' 
                       : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
               >
                   Losers
               </button>
           </div>
           
           {/* Content Area */}
           <div className="bg-white rounded-lg shadow-sm p-4">
               {option === 0 && <Gainers />}  
               {option === 1 && <Losers />}
           </div>
       </div>
   );
}