const NewsService = require("../services/news.service.js");
const PreferencesService = require("../services/preferences.service.js");
class NewsController {
  static async getNews(req, res) {
    const userId = req.user.userId;
    try {
      const preferences = await PreferencesService.getPreferencesByUserId(
        userId
      );
      const news = await NewsService.getNews(preferences);
      const newsData = news.map((news) => news);
      return res.status(200).json({ news: newsData.flat() });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async searchNews(req, res) {
    const { keyword } = req.params;
    try {
      const news = await NewsService.searchNews(keyword);
      return res.status(200).json({ news: news.data.articles });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = NewsController;
