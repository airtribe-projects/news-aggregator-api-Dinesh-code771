const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const NewsController = require("../controlers/news.controller.js");
router.get("/", authMiddleware, NewsController.getNews);
router.get("/search/:keyword", authMiddleware, NewsController.searchNews);
module.exports = router;
