const axios = require("axios");
const { redis } = require("../config/redis");

class NewsService {
  static async getNews(preferences) {
    try {
      //promise.all settled
      const results = await Promise.allSettled(
        //map over preferences and fetch news from api and cache it
        preferences.map(async (preference) => {
          try {
            const cachedNews = await redis.get(`news:${preference}`);
            if (cachedNews) {
              console.log("Serving cached news for:", preference);
              return JSON.parse(cachedNews);
            }

            const response = await axios.get(
              `https://newsapi.org/v2/top-headlines?country=us&category=${preference}&apiKey=${process.env.NEWS_API_KEY}`
            );

            if (!response.data || !response.data.articles) {
              throw new Error(`Invalid response format for ${preference}`);
            }

            // Store only the articles data
            const newsData = response.data.articles;
            await redis.set(`news:${preference}`, JSON.stringify(newsData));

            return newsData;
          } catch (error) {
            console.error(
              `Error fetching news for ${preference}:`,
              error.message
            );
            return null;
          }
        })
      );

      // Filter out failed promises and null results
      return results
        .filter(
          (result) => result.status === "fulfilled" && result.value !== null
        )
        .map((result) => result.value);
    } catch (error) {
      console.error("Error in getNews:", error);
      throw error;
    }
  }

  static async searchNews(query) {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (!response.data || !response.data.articles) {
        throw new Error("Invalid response format from search API");
      }

      return response.data.articles;
    } catch (error) {
      console.error("Error in searchNews:", error);
      throw error;
    }
  }
}

module.exports = NewsService;
