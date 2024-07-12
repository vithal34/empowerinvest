import yahooFinance from "yahoo-finance2";
import Cache from "node-cache";
import axios from "axios";
const stockCache = new Cache({ stdTTL: 60 }); // 1 minute

import dotenv from "dotenv";
dotenv.config();

const sampleStockData = {
	AAPL: {
	  longName: "Apple Inc.",
	  regularMarketPrice: 200,
	  regularMarketChangePercent: 1.25,
	  regularMarketPreviousClose: 145.11,
	},
	MSFT: {
	  longName: "Microsoft Corporation",
	  regularMarketPrice: 1078.81,
	  regularMarketChangePercent: -0.5,
	  regularMarketPreviousClose: 370,
	},
	GOOG: {
	  longName: "Alphabet Inc. (Google)",
	  regularMarketPrice: 2570.37,
	  regularMarketChangePercent: 0.75,
	  regularMarketPreviousClose: 2570.37,
	},
	INFY: {
	  longName: "Infosys Limited",
	  regularMarketPrice: 25.45,
	  regularMarketChangePercent: 0.35,
	  regularMarketPreviousClose: 25.45,

	},
	TSLA: {
	  longName: "Tesla, Inc.",
	  regularMarketPrice: 700.25,
	  regularMarketChangePercent: 2.15,
	  regularMarketPreviousClose: 700.25,
	},
	SAMSUNG: {
	  longName: "Samsung Electronics Co., Ltd.",
	  regularMarketPrice: 75.60,
	  regularMarketChangePercent: -1.1,
	  regularMarketPreviousClose: 75.60,
	},
	COCACOLA: {
	  longName: "The Coca-Cola Company",
	  regularMarketPrice: 56.78,
	  regularMarketChangePercent: 0.9,
	  regularMarketPreviousClose: 56.78,
	},
	ADBE: {
	  longName: "Adobe Inc.",
	  regularMarketPrice: 600.15,
	  regularMarketChangePercent: -0.25,
	  regularMarketPreviousClose: 600.15,
	},
	PEPSICO: {
	  longName: "PepsiCo, Inc.",
	  regularMarketPrice: 145.00,
	  regularMarketChangePercent: 0.45,
	  regularMarketPreviousClose: 145.00,
	},
	MCD: {
	  longName: "McDonald's Corporation",
	  regularMarketPrice: 240.50,
	  regularMarketChangePercent: 0.65,
	  regularMarketPreviousClose: 240.50,
	},
	ALIBABA: {
	  longName: "Alibaba Group Holding Limited",
	  regularMarketPrice: 215.30,
	  regularMarketChangePercent: 1.10,
	  regularMarketPreviousClose: 215.30,
	},
	TCS: {
	  longName: "Tata Consultancy Services Limited",
	  regularMarketPrice: 30.25,
	  regularMarketChangePercent: 0.20,
	  regularMarketPreviousClose: 30.25,
	},
	HDFC: {
	  longName: "HDFC Bank Limited",
	  regularMarketPrice: 65.80,
	  regularMarketChangePercent: 0.55,
	  regularMarketPreviousClose: 65.80,
	},
	UBER: {
	  longName: "Uber Technologies, Inc.",
	  regularMarketPrice: 50.45,
	  regularMarketChangePercent: 1.35,
	  regularMarketPreviousClose: 50.45,
	},
	OLA: {
	  longName: "Ola Cabs",
	  regularMarketPrice: 25.15,
	  regularMarketChangePercent: -0.05,
	  regularMarketPreviousClose: 25.15,
	},
	DIOR: {
	  longName: "Christian Dior SE",
	  regularMarketPrice: 150.20,
	  regularMarketChangePercent: 0.30,
	  regularMarketPreviousClose: 150.20,
	},
	GUCCI: {
	  longName: "Gucci (Kering SA)",
	  regularMarketPrice: 705.50,
	  regularMarketChangePercent: 0.75,
	  regularMarketPreviousClose: 705.50,
	},
	INTC: {
	  longName: "Intel Corporation",
	  regularMarketPrice: 54.80,
	  regularMarketChangePercent: 0.40,
	  regularMarketPreviousClose: 54.80,
	},
	NIKE: {
	  longName: "Nike, Inc.",
	  regularMarketPrice: 130.70,
	  regularMarketChangePercent: 0.85,
	  regularMarketPreviousClose: 130.70,
	},
	BOEING: {
	  longName: "The Boeing Company",
	  regularMarketPrice: 210.40,
	  regularMarketChangePercent: 0.60,
	  regularMarketPreviousClose: 210.40,
	},
	ICICI: {
	  longName: "ICICI Bank Limited",
	  regularMarketPrice: 20.75,
	  regularMarketChangePercent: 0.25,
	  regularMarketPreviousClose: 20.75,
	},
	HP: {
	  longName: "HP Inc.",
	  regularMarketPrice: 35.60,
	  regularMarketChangePercent: -0.10,
	  regularMarketPreviousClose: 145.11,
	},
	DELL: {
	  longName: "Dell Technologies Inc.",
	  regularMarketPrice: 45.20,
	  regularMarketChangePercent: 0.50,
	  regularMarketPreviousClose: 145.11,
	},
	STARBUCKS: {
	  longName: "Starbucks Corporation",
	  regularMarketPrice: 110.50,
	  regularMarketChangePercent: 0.70,
	  regularMarketPreviousClose: 145.11,
	},
	MITSUBISHI: {
	  longName: "Mitsubishi Corporation",
	  regularMarketPrice: 90.80,
	  regularMarketChangePercent: 0.40,
	  regularMarketPreviousClose: 145.11,
	},
	ADIDAS: {
	  longName: "Adidas AG",
	  regularMarketPrice: 85.30,
	  regularMarketChangePercent: 0.55,
	  regularMarketPreviousClose: 145.11,
	},
	MERCEDES: {
	  longName: "Mercedes-Benz Group AG",
	  regularMarketPrice: 145.75,
	  regularMarketChangePercent: 0.50,
	  regularMarketPreviousClose: 145.11,
	},
	VOLKSWAGEN: {
		longName: "Volkswagen AG",
		regularMarketPrice: 250,
		regularMarketChangePercent: 0.75,
		regularMarketPreviousClose: 240.5,
	  },
	  BOSE: {
		longName: "Bose Corporation",
		regularMarketPrice: 150,
		regularMarketChangePercent: -0.25,
		regularMarketPreviousClose: 152,
	  },
	  DOMINOS: {
		longName: "Domino's Pizza Inc.",
		regularMarketPrice: 380,
		regularMarketChangePercent: 2.15,
		regularMarketPreviousClose: 372.5,
	  },
	  TACOBELL: {
		longName: "Taco Bell Corporation",
		regularMarketPrice: 120,
		regularMarketChangePercent: 1.5,
		regularMarketPreviousClose: 118.5,
	  },
	  KFC: {
		longName: "KFC Corporation",
		regularMarketPrice: 180,
		regularMarketChangePercent: -0.5,
		regularMarketPreviousClose: 181,
	  },
	  AMAZON: {
		longName: "Amazon.com, Inc.",
		regularMarketPrice: 3300,
		regularMarketChangePercent: 0.9,
		regularMarketPreviousClose: 3270,
	  },
	  EBAY: {
		longName: "eBay Inc.",
		regularMarketPrice: 75,
		regularMarketChangePercent: 0.25,
		regularMarketPreviousClose: 74.8,
	  },
	  ETSY: {
		longName: "Etsy, Inc.",
		regularMarketPrice: 150,
		regularMarketChangePercent: 1.75,
		regularMarketPreviousClose: 147.5,
	  },
	  SBI: {
		longName: "State Bank of India",
		regularMarketPrice: 250,
		regularMarketChangePercent: -0.1,
		regularMarketPreviousClose: 250.25,
	  },
	  FEDEX: {
		longName: "FedEx Corporation",
		regularMarketPrice: 300,
		regularMarketChangePercent: 1.1,
		regularMarketPreviousClose: 297,
	  },
	  BLUEDART: {
		longName: "Blue Dart Express Limited",
		regularMarketPrice: 4000,
		regularMarketChangePercent: -0.5,
		regularMarketPreviousClose: 4020,
	  },
	  HUGOBOSS: {
		longName: "Hugo Boss AG",
		regularMarketPrice: 120,
		regularMarketChangePercent: 0.75,
		regularMarketPreviousClose: 119,
	  },
	  LOUISVUITTON: {
		longName: "Louis Vuitton SE",
		regularMarketPrice: 500,
		regularMarketChangePercent: 1.25,
		regularMarketPreviousClose: 494,
	  },
	  AIRBUS: {
		longName: "Airbus SE",
		regularMarketPrice: 110,
		regularMarketChangePercent: -0.3,
		regularMarketPreviousClose: 110.5,
	  },
	  LOCKHEEDMARTIN: {
		longName: "Lockheed Martin Corporation",
		regularMarketPrice: 350,
		regularMarketChangePercent: 0.5,
		regularMarketPreviousClose: 348,
	  },
	  SPICEJET: {
		longName: "SpiceJet Limited",
		regularMarketPrice: 80,
		regularMarketChangePercent: 0.2,
		regularMarketPreviousClose: 79.8,
	  },
	  UNDERARMOUR: {
		longName: "Under Armour, Inc.",
		regularMarketPrice: 60,
		regularMarketChangePercent: 1.0,
		regularMarketPreviousClose: 59.4,
	  },
	  LULULEMON: {
		longName: "Lululemon Athletica Inc.",
		regularMarketPrice: 300,
		regularMarketChangePercent: 0.8,
		regularMarketPreviousClose: 297.5,
	  },	
};




export const fetchStockData = async (symbol: string): Promise<any> => {
	const cacheKey = symbol + "-quote";
  
	try {
	  if (stockCache.has(cacheKey)) {
		return stockCache.get(cacheKey);
	  } else {
		if (sampleStockData[symbol]) {
		  const {
			longName,
			regularMarketPrice,
			regularMarketChangePercent,
			regularMarketPreviousClose
		  } = sampleStockData[symbol];
  
		  const stockData = {
			symbol,
			longName,
			regularMarketPrice,
			regularMarketChangePercent,
			regularMarketPreviousClose
		  };
  
		  stockCache.set(cacheKey, stockData);
		  return stockData;
		} else {
		  throw new Error("Stock symbol not found in sample data");
		}
	  }
	} catch (err) {
	  console.error("Error fetching " + symbol + " stock data:", err);
	  throw err;
	}
};
  

export const fetchHistoricalStockData = async (
	symbol: string,
	period: "1d" | "5d" | "1m" | "6m" | "YTD" | "1y" | "all" = "1d",
): Promise<any> => {
	const periodTerm =
		period === "1d" || period === "5d" || period === "1m" ? "short" : "long";
	const cacheKey = symbol + "-historical-" + periodTerm;

	try {
		if (stockCache.has(cacheKey)) {
			return stockCache.get(cacheKey);
		} else {
			let formattedData: number[][] = [];

			if (periodTerm == "short") {
				// If the period is less than 1 month, use intraday data from Alpha Vantage
				let res = await axios.get(
					"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
						symbol +
						"&interval=15min&extended_hours=true&outputsize=full&apikey=" +
						process.env.STOTRA_ALPHAVANTAGE_API,
				);
				const alphaData = res.data["Time Series (15min)"];

				if (!alphaData) {
					return fetchHistoricalStockData(symbol, "6m");
				}

				formattedData = Object.keys(alphaData)
					.map((key) => {
						return [
							new Date(key).getTime(),
							parseFloat(alphaData[key]["4. close"]),
						];
					})
					.sort((a, b) => a[0] - b[0]);
			} else {
				const yahooData = await yahooFinance.historical(symbol, {
					period1: "2000-01-01",
					interval: "1d",
				});

				formattedData = yahooData.map(
					(data: { date: { getTime: () => any }; close: any }) => {
						return [data.date.getTime(), data.close];
					},
				);
			}
			stockCache.set(cacheKey, formattedData);
			return formattedData;
		}
	} catch (error) {
		console.error("Error fetching " + symbol + " historical data:", error);
		return null;
	}
};

export const searchStocks = async (query: string): Promise<any> => {
	const queryOptions = {
		newsCount: 0,
		enableFuzzyQuery: true,
		enableNavLinks: false,
		enableCb: false,
		enableEnhancedTrivialQuery: false,
	};

	return yahooFinance
		.search(query, queryOptions)
		.then((results) => {
			return results.quotes;
		})
		.catch((err) => {
			if (err.result && Array.isArray(err.result.quotes)) {
				return err.result.quotes;
			} else {
				console.error(err);
				throw new Error(err);
			}
		});
};