"use client";
import { useEffect } from 'react';

export default function TradingViewChart({ symbol = "AAPL" }) {
  useEffect(() => {
    // Clear previous widget if it exists
    const container = document.getElementById('tradingview-widget-container');
    if (container) container.innerHTML = '';

    // Create new widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": `NASDAQ:${symbol}`,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "container_id": "tradingview-widget-container"
    });

    container.appendChild(script);
  }, [symbol]);

  return (
    <div 
      id="tradingview-widget-container" 
      style={{ height: '500px', width: '100%' }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}