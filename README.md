# News Aggregator API

## Overview

The **News Aggregator API** is a backend service that integrates with an external news API (e.g., NewsAPI) to fetch and serve news articles based on user preferences. It includes features such as user authentication, caching, search functionality, and robust error handling.

## Features

- User authentication with Sign Up and Login.
- Fetch news articles based on user preferences.
- Get and update user preferences for news categories.
- Implemented caching to optimize API calls and reduce external requests.
- Search functionality to find news articles by keywords.
- Async/Await handling for smooth API requests.
- Proper error handling for API failures, authentication errors, and invalid requests.
- Tested with Postman.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** or **yarn**

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/news-aggregator.git
   cd news-aggregator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure API keys:
   ```env
   NEWS_API_KEY=your_news_api_key
   CACHE_EXPIRY=3600 # Cache expiry in seconds
   JWT_SECRET=your_jwt_secret
   ```

---

## API Endpoints

### **1. User Authentication**

#### **Sign Up (POST /auth/signup)**

Registers a new user.

**Request:**

```http
POST /auth/signup
Content-Type: application/json
```

```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepassword",
  "preferences": ["movies"]
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User registered successfully"
}
```

#### **Login (POST /auth/login)**

Authenticates a user and returns a token.

**Request:**

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "your_jwt_token"
}
```

### **2. User Preferences**

#### **Get Preferences (GET /preferences)**

Retrieves the news category preferences of the logged-in user.

**Request:**

```http
GET /preferences
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
  "preferences": ["Technology", "Science", "Health"]
}
```

#### **Update Preferences (PUT /preferences)**

Updates the news category preferences for the logged-in user.

**Request:**

```http
PUT /preferences
Authorization: Bearer your_jwt_token
Content-Type: application/json
```

```json
{
  "preferences": ["Technology", "Business"]
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Preferences updated successfully"
}
```

### **3. Fetch News (GET /news)**

Fetches news articles based on user preferences.

**Request:**

```http
GET /news
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
  "status": "success",
  "articles": [
    {
      "title": "Sample News",
      "description": "News description...",
      "url": "https://news.example.com",
      "source": "NewsAPI"
    }
  ]
}
```

### **4. Search News (GET /news/search/:keyword)**

Fetches news articles based on a keyword search.

**Request:**

```http
GET /news/search/technology
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
  "status": "success",
  "articles": [
    {
      "title": "Latest in Tech",
      "description": "Tech news...",
      "url": "https://news.example.com/tech",
      "source": "NewsAPI"
    }
  ]
}
```

## Caching Mechanism

- Uses **Redis** to cache fetched news articles for a specified time (`CACHE_EXPIRY`).
- When a user requests news, the API first checks the cache. If data is available, it returns the cached response. Otherwise, it fetches fresh data from NewsAPI, stores it in the cache, and returns the response.

---

## Error Handling

- **Invalid API Key** → Returns `401 Unauthorized`
- **NewsAPI Failure** → Returns `500 Internal Server Error`
- **Invalid Requests** → Returns `400 Bad Request`
- **Unauthorized Access** → Returns `403 Forbidden`

---

## Testing with Postman

1. Import the API collection into Postman.
2. Set environment variables for `NEWS_API_KEY` and `JWT_SECRET`.
3. Test authentication endpoints before accessing protected routes.
4. Test endpoints using GET requests with Authorization headers.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

For any issues or contributions, reach out at [your-email@example.com].
