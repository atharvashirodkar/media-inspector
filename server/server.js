import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper Function
// Converts relative URLs into absolute URLs

function toAbsoluteUrl(baseUrl, src) {
    try {
        return new URL(src, baseUrl).href;
    } catch {
        return null;
    }
}

app.post("/inspect", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            success: false,
            error: "URL is required"
        });
    }

    try {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (MediaInspectorBot/1.0;)"
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const videos = [];

        // For <video src="">

        $("video[src]").each((_, el) => {
            const src = $(el).attr("src");
            const absoluteUrl = toAbsoluteUrl(url, src);

            if (absoluteUrl) {
                videos.push({
                    url: absoluteUrl,
                    source: "video-tag"
                });
            }
        });

        // For <video><source></video>

        $("video source[src]").each((_, el) => {
            const src = $(el).attr("src");
            const type = $(el).attr("type") || null;
            const absoluteUrl = toAbsoluteUrl(url, src);

            if (absoluteUrl) {
                videos.push({
                    url: absoluteUrl,
                    type,
                    source: "video-source"
                });
            }
        });

        // For Standalone <source>
        $("source[src]").each((_, el) => {
            const src = $(el).attr("src");
            const absoluteUrl = toAbsoluteUrl(url, src);

            if (absoluteUrl) {
                videos.push({
                    url: absoluteUrl,
                    source: "standalone-source"
                });
            }
        });

        return res.json({
            success: true,
            page: url,
            found: videos.length,
            videos
        });
        
    } catch (error) {
        const status = error.response?.status || 500;

        return res.status(status).json({
            success: false,
            message: "The website blocked the request or could not be accessed",
            statusCode: status,
            hint:
                status === 403
                    ? "This site blocks automated inspection tools"
                    : "Network or URL error",
        });
    }

});

app.listen(PORT, () => {
    console.log(`Media Inspector server running on port ${PORT}`);
});
