# Media Inspector Server

A lightweight, web-based backend service that analyzes HTML pages to discover and extract video media sources. Perfect for developers, content auditors, and researchers who need programmatic access to video metadata embedded in webpages.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Why It Matters](#-why-it-matters)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Examples](#-examples)
- [Support & Contribution](#-support--contribution)

---

## 📘 Project Overview

**Media Inspector Server** is a Node.js-based REST API that extracts video sources from any publicly accessible webpage. It uses intelligent HTML parsing to identify video content regardless of how it's embedded—whether in standard `<video>` tags, `<source>` elements, or as direct media attributes.

The server serves as the backend for the **Media Inspector** project, providing a clean, JSON-based interface for discovering media resources embedded in web content.

---

## 💡 Why It Matters

### Key Benefits

- **Automated Media Discovery** – Quickly identify all video sources on a page without manual inspection
- **Content Management** – Audit webpages for media resources and validate video hosting
- **Research & Analysis** – Gather data on video distribution and hosting patterns across websites
- **Developer-Friendly API** – Simple REST endpoint with predictable JSON responses
- **Robust Error Handling** – Gracefully handles blocked websites, invalid URLs, and network issues
- **Deduplication** – Automatically removes duplicate video URLs for cleaner results

### Use Cases

- Content validation and compliance checking
- Media inventory audits
- Video source discovery for accessibility features
- Web scraping and data collection pipelines
- Educational tools for HTML/web analysis

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** (included with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atharvashirodkar/media-inspector.git
   cd media-inspector/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

   The server will start on `http://localhost:5000` with CORS enabled for cross-origin requests.

### Configuration

The server runs on port `5000` by default. To use a different port, you can modify the `PORT` variable in `server.js`:

```javascript
const PORT = 5000; // Change this to your desired port
```

---

## 🧩 API Documentation

### Endpoint: `POST /inspect`

Analyzes a webpage and extracts all embedded video sources.

**Request:**
```json
{
  "url": "https://example.com/page-with-video"
}
```

**Response (Success):**
```json
{
  "success": true,
  "page": "https://example.com/page-with-video",
  "found": 2,
  "videos": [
    {
      "url": "https://example.com/videos/video1.mp4",
      "source": "video-tag"
    },
    {
      "url": "https://example.com/videos/video2.webm",
      "type": "video/webm",
      "source": "video-source"
    }
  ]
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "hint": "Additional context"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `page` | string | The URL that was analyzed |
| `found` | number | Count of unique video sources found |
| `videos` | array | List of extracted video objects |
| `videos[].url` | string | Absolute URL of the video source |
| `videos[].type` | string | Video MIME type (e.g., `video/mp4`) |
| `videos[].source` | string | Source type: `video-tag`, `video-source`, or `standalone-source` |

### Error Handling

| Status Code | Scenario |
|-------------|----------|
| `400` | Missing or invalid URL in request body |
| `403` | Website blocks automated requests |
| `500` | Server error or network issue |

---

## 📝 Examples

### Example 1: Extract Videos from W3Schools

**Request:**
```bash
curl -X POST http://localhost:5000/inspect \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.w3schools.com/html/html5_video.asp"}'
```

**Response:**
```json
{
  "success": true,
  "page": "https://www.w3schools.com/html/html5_video.asp",
  "found": 2,
  "videos": [
    {
      "url": "https://www.w3schools.com/html/mov_bbb.mp4",
      "type": "video/mp4",
      "source": "video-source"
    },
    {
      "url": "https://www.w3schools.com/html/mov_bbb.ogg",
      "type": "video/ogg",
      "source": "video-source"
    }
  ]
}
```

### Example 2: Page Without Video

**Request:**
```bash
curl -X POST http://localhost:5000/inspect \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

**Response:**
```json
{
  "success": true,
  "page": "https://example.com",
  "found": 0,
  "videos": []
}
```

### Example 3: Blocked Website

**Request:**
```bash
curl -X POST http://localhost:5000/inspect \
  -H "Content-Type: application/json" \
  -d '{"url": "https://pixabay.com/videos/"}'
```

**Response:**
```json
{
  "success": false,
  "message": "The website blocked the request or could not be accessed",
  "statusCode": 403,
  "hint": "This site blocks automated inspection tools"
}
```

---

## 🛠️ Technical Stack

- **Express.js** – Lightweight web framework for Node.js
- **Cheerio** – Fast jQuery-like HTML parsing library
- **Axios** – Promise-based HTTP client
- **CORS** – Cross-Origin Resource Sharing middleware

---

## 📚 Documentation & Support

- **Manual Test Cases** – See [tests/inspect.manual.test.md](tests/inspect.manual.test.md) for validation scenarios
- **Client Application** – Check the [client](../client) directory for the frontend implementation
- **Issue Tracker** – Report bugs or feature requests on GitHub Issues
- **Code Comments** – Review inline documentation in [server.js](server.js) for implementation details

---

## 👥 Maintainers & Contributors

**Current Maintainer:** [atharvashirodkar](https://github.com/atharvashirodkar)

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add feature description'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your contributions include appropriate tests and documentation updates.

---

## 📜 License

This project is licensed under the ISC License – see the [LICENSE](../LICENSE) file for details.

---

## 🚀 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port already in use** | Change `PORT` in `server.js` to an available port |
| **CORS errors** | CORS is enabled by default; verify the client is making requests to `http://localhost:5000` |
| **403 Forbidden responses** | Some websites block automated tools; this is expected behavior |
| **Empty video list** | The page may not contain embedded video sources, or they may be loaded dynamically via JavaScript |

---

*Media Inspector Server – Simplifying video source discovery, one page at a time.*
