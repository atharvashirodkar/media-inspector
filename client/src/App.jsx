import { useState } from "react";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function inspectUrl() {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    let normalizedUrl = url.trim();

    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/inspect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: normalizedUrl })
      });

      const data = await response.json();

      if (!data.success) {
        let message = "Inspection failed";

        if (data.statusCode === 403) {
          message = "This website blocks automated inspection";
        } else if (data.statusCode === 400) {
          message = "Invalid URL";
        } else if (data.message) {
          message = data.message;
        }

        throw new Error(message);
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Media Inspector</h1>

      <input
        type="text"
        placeholder="Enter webpage URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", padding: "8px" }}
      />

      <br /><br />

      <button onClick={inspectUrl} disabled={loading || !url.trim()}>
        {loading ? "Inspecting..." : "Inspect"}
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>

          <h3>Found {result.found} video(s)</h3>

          {result.found === 0 ? (
            <p>No video content found on this page.</p>
          ) : (
            <ul>
              {result.videos.map((video, index) => (
                <li key={index}>
                  <a href={video.url} target="_blank" rel="noreferrer">
                    {video.url}
                  </a>
                  {video.type && ` (${video.type})`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;