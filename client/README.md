# Media Inspector — Frontend Client

A modern React + Vite frontend for inspecting and analyzing media from URLs. **Media Inspector** allows developers to quickly preview and extract metadata from web resources with a simple, intuitive interface.

## 📘 Project Overview

**Media Inspector** is a web-based tool designed to help developers inspect media files and webpage content from URLs. The frontend client provides a user-friendly interface for:

- Entering URLs for inspection
- Submitting media analysis requests to the backend API
- Viewing detailed metadata and inspection results
- Handling errors gracefully for blocked or invalid resources

This is the **client-side application** built with React 19 and Vite, communicating with a backend API service for the actual media inspection logic.

## 💡 Why It Matters

### Key Features

- **Fast Development Experience** — Powered by Vite for instant hot-module reloading
- **Modern React Stack** — Built with React 19 for responsive, maintainable UI
- **Simple & Intuitive** — Clean interface for quick media inspections
- **Error Handling** — User-friendly messages for blocked sites, invalid URLs, and API errors
- **Environment Configuration** — Easy backend API endpoint configuration
- **Linting & Code Quality** — ESLint setup for consistent code standards

### Use Cases

- **Development Workflows** — Quickly inspect media during development without external tools
- **Content Verification** — Validate media availability and accessibility from different sources
- **Educational Tool** — Learn about web APIs, HTTP requests, and client-server communication

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or compatible package manager: yarn, pnpm)

### Installation

1. **Clone the repository** (or navigate to the client directory):

   ```bash
   cd Project_Based_Learning/media-inspector/client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the client root directory with the backend API URL:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Replace `http://localhost:3000` with your actual backend API endpoint.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`. Vite provides fast refresh for any file changes.

### Usage Example

1. Open the application in your browser
2. Enter a media URL (e.g., `https://example.com/image.jpg`)
3. The app automatically adds the protocol if missing
4. Click the inspect button to send the URL to the backend API
5. View the inspection results or error messages

### Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite development server with hot-reload |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Project Structure

```
client/
├── src/
│   ├── App.jsx          # Main app component (URL inspection logic)
│   └── main.jsx         # React app entry point
├── public/              # Static assets (images, fonts, etc.)
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint rules
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (not in version control)
```

## 🧩 Documentation & Support

### Calling the Backend API

The application connects to a backend API via `VITE_API_URL`. The expected endpoint is:

**Endpoint**: `POST /inspect`

**Request Body**:

```json
{
  "url": "https://example.com/media.jpg"
}
```

**Response (Success)**:

```json
{
  "success": true,
  "data": {
    "type": "image",
    "size": 2048576,
    "mimeType": "image/jpeg"
  }
}
```

**Response (Error)**:

```json
{
  "success": false,
  "statusCode": 403,
  "message": "This website blocks automated inspection"
}
```

### Troubleshooting

**Issue**: Cannot connect to backend API
- **Solution**: Verify the `VITE_API_URL` in `.env` matches your backend's address and port

**Issue**: CORS (Cross-Origin) errors
- **Solution**: Ensure your backend has proper CORS headers configured to allow requests from the frontend URL

**Issue**: Environment variable not loading
- **Solution**: Restart the development server after modifying `.env` files

### Additional Resources

- [Vite Documentation](https://vite.dev/) — Learn about build optimization and configuration
- [React Documentation](https://react.dev/) — Reference for React hooks and components
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) — Details on HTTP requests in JavaScript

## 👥 Maintainers & Contributors

This project welcomes contributions from the developer community.

### How to Contribute

1. **Report Issues** — Found a bug? Open an issue with steps to reproduce
2. **Suggest Features** — Have an idea? Create a discussion or feature request
3. **Submit Pull Requests** — Improvements are welcome:
   - Fork the repository
   - Create a feature branch: `git checkout -b feature/your-feature`
   - Commit changes: `git commit -am 'Add your feature'`
   - Push to the branch: `git push origin feature/your-feature`
   - Open a pull request with a clear description

### Code Standards

- Follow the existing code style (enforced by ESLint)
- Run `npm run lint` before submitting PRs
- Keep commits focused and well-documented

For detailed contribution guidelines, see `CONTRIBUTING.md` (if available).

## License

This project currently has no specified license. If you plan to publish this project or accept external contributions, please add a `LICENSE` file to make the terms explicit (e.g., MIT, Apache 2.0, GPL).
