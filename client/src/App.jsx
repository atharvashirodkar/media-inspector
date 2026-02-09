import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function inspectUrl() {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/inspect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Inspection failed");
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

      <button onClick={inspectUrl} disabled={loading}>
        {loading ? "Inspecting..." : "Inspect"}
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          {/* <h1>{result}</h1> */}
          <h3>Found {result.found} video(s)</h3>
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
        </div>
      )}
    </div>
  );
}

export default App;