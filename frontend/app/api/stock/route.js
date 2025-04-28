// app/api/stock/route.js
import { NextResponse } from "next/server";
import { SMA, EMA, RSI } from "technicalindicators";

const config = {
  SYMBOLS: ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA"],
  RETRY_DELAY: 2000,
  MAX_RETRIES: 3,
  MIN_DATA_POINTS: 30,
};

class YahooFinanceService {
  constructor() {
    this.baseUrl = "https://query1.finance.yahoo.com/v8/finance/chart/";
  }

  async getDailyData(symbol, retryCount = 0) {
    try {
      const url = `${this.baseUrl}${symbol}?interval=1d&range=3mo`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (!data?.chart?.result?.[0]?.indicators?.quote?.[0]) {
        throw new Error("Invalid API response structure");
      }

      const result = data.chart.result[0];
      const timestamps = result.timestamp;
      const quotes = result.indicators.quote[0];
      const adjClose = result.indicators.adjclose?.[0]?.adjclose;

      if (
        !timestamps ||
        !quotes ||
        !quotes.open ||
        !quotes.high ||
        !quotes.low ||
        !quotes.close ||
        !quotes.volume
      ) {
        throw new Error("Missing required data fields");
      }

      const stockData = timestamps
        .map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toISOString().split("T")[0],
          open: quotes.open[index],
          high: quotes.high[index],
          low: quotes.low[index],
          close: adjClose?.[index] ?? quotes.close[index],
          volume: quotes.volume[index],
        }))
        .filter(
          (item) =>
            item.open != null &&
            item.high != null &&
            item.low != null &&
            item.close != null &&
            item.volume != null
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      return stockData;
    } catch (error) {
      if (retryCount < config.MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, config.RETRY_DELAY));
        return this.getDailyData(symbol, retryCount + 1);
      }
      throw error;
    }
  }
}

class StockPredictor {
  constructor() {
    this.service = new YahooFinanceService();
  }

  calculateIndicators(prices) {
    const closes = prices.map((p) => p.close).reverse();

    if (closes.length < config.MIN_DATA_POINTS) {
      return null;
    }

    return {
      sma10: SMA.calculate({ period: 10, values: closes }).pop(),
      ema20: EMA.calculate({ period: 20, values: closes }).pop(),
      rsi14: RSI.calculate({ period: 14, values: closes }).pop(),
      trend: closes[0] > closes[14] ? 1 : -1,
    };
  }

  getNextTradingDay(fromDate = new Date()) {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + 1);

    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) date.setDate(date.getDate() + 1);
    else if (dayOfWeek === 6) date.setDate(date.getDate() + 2);

    return date.toISOString().split("T")[0];
  }

  async predict(symbol) {
    try {
      const dailyData = await this.service.getDailyData(symbol);

      if (!dailyData || dailyData.length === 0) {
        throw new Error("No data received");
      }

      const latest = dailyData[0];
      const indicators = this.calculateIndicators(dailyData);
      if (!indicators) {
        throw new Error(
          `Insufficient data (need ${config.MIN_DATA_POINTS} points)`
        );
      }

      const rsiFactor = (indicators.rsi14 - 50) / 50;
      const maRatio = (indicators.ema20 - indicators.sma10) / indicators.sma10;

      let prediction =
        latest.close *
        (1 + rsiFactor * 0.05 + maRatio * 0.1 + indicators.trend * 0.02);
      prediction = Math.max(
        latest.close * 0.95,
        Math.min(latest.close * 1.05, prediction)
      );

      let confidence =
        50 +
        Math.abs(rsiFactor) * 15 +
        Math.abs(maRatio) * 10 +
        indicators.trend * 5;
      confidence = Math.min(80, Math.max(50, Math.round(confidence)));

      return {
        symbol,
        currentDate: latest.date,
        currentPrice: latest.close,
        predictedDate: this.getNextTradingDay(),
        predictedPrice: prediction,
        confidence,
        indicators,
      };
    } catch (error) {
      return {
        symbol,
        error: error.message,
        currentPrice: null,
      };
    }
  }
}

export async function GET() {
  try {
    const predictor = new StockPredictor();
    const results = [];

    for (const symbol of config.SYMBOLS) {
      const prediction = await predictor.predict(symbol);
      results.push(prediction);
      if (symbol !== config.SYMBOLS[config.SYMBOLS.length - 1]) {
        await new Promise((resolve) => setTimeout(resolve, config.RETRY_DELAY));
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        retryAfter: config.RETRY_DELAY / 1000,
      },
      { status: 500 }
    );
  }
}
