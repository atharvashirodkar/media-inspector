import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/inspect", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
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

        return res.json({
            success: true,
            status: response.status,
            contentType: response.headers["content-type"],
            htmlLength: response.data.length
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
