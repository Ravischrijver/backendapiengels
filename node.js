import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BING_KEY = "YOUR_BING_API_KEY";

app.post("/api/render", async (req, res) => {
    const text = req.body.text;

    // Zoek een afbeelding
    const img = await fetch(
        `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(text)}`,
        { headers: { "Ocp-Apim-Subscription-Key": BING_KEY } }
    )
    .then(r => r.json())
    .then(d => d.value?.[0]?.contentUrl || null);

    if (!img) {
        return res.json({ image: null });
    }

    res.json({ image: img });
});

app.listen(3000, () => console.log("API running on port 3000"));
