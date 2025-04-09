import Open from "./subcomp/open";
import Close from "./subcomp/close";
import { useState } from "react";

export default function Trades() {
    const [option, setoption] = useState(0);
    const handleoption = (number) => {
        setoption(number);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Trades</h1>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                <button 
                    onClick={() => handleoption(0)}
                    className={`px-4 py-2 font-medium text-sm ${option === 0 
                        ? 'text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Open Positions
                </button>
                <button 
                    onClick={() => handleoption(1)}
                    className={`px-4 py-2 font-medium text-sm ${option === 1 
                        ? 'text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Closed Positions
                </button>
            </div>
            
            {/* Content Area */}
            <div className="mt-4">
                {option === 0 && <Open />}  
                {option === 1 && <Close />}
            </div>
        </div>
    );
}