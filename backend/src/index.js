const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/generate", async (req, res) => {
  try {
    let url = req.query.url;
    if (!url) {
      return res.status(400).send("URL query parameter is required");
    }
    // Decode the URL
    url = decodeURIComponent(url);
    // Ensure the URL is properly formatted
    if (!/^https?:\/\//i.test(url)) {
      return res
        .status(400)
        .send("Invalid URL format. URL should start with http:// or https://");
    }
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
