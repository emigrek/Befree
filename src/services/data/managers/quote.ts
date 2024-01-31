import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSameDay } from 'date-fns';

export interface Quote {
  quote: string;
  author: string;
  date: Date;
}

class QuoteManger {
  private apiKey: string;
  private cacheKey: string;

  constructor() {
    this.apiKey = 'https://zenquotes.io/api/today';
    this.cacheKey = 'quoteFetchDate';
  }

  async getDailyQuote() {
    const cachedQuote = await this.getCachedQuote();

    if (cachedQuote && isSameDay(new Date(cachedQuote.date), new Date())) {
      return cachedQuote;
    } else {
      const quote = await this.fetchAndCacheQuote();
      return quote;
    }
  }

  async fetchAndCacheQuote() {
    try {
      const response = await fetch(this.apiKey);
      if (!response.ok) {
        throw new Error(
          'There was an error fetching the quote, response was not ok.',
        );
      }

      const quotes = await response.json();
      if (!quotes || !quotes.length) {
        return null;
      }

      const quote = quotes[0].q;
      const author = quotes[0].a;
      await this.cacheQuote(quote, author);
      return quote;
    } catch (e) {
      console.error(`There was an error fetching the quote: ${e}`);
    }
  }

  async cacheQuote(quote: string, author: string) {
    try {
      const data = { quote, author, date: new Date() };
      await AsyncStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch (e) {
      console.error(`There was an error caching the quote: ${e}`);
    }
  }

  async getCachedQuote() {
    try {
      const dataString = await AsyncStorage.getItem(this.cacheKey);
      return dataString ? JSON.parse(dataString) : null;
    } catch (e) {
      console.error(`There was an error getting the cached quote: ${e}`);
    }
  }
}

export default QuoteManger;
