const express = require("express");
const { storeInDb, getLongUrl } = require("./database/pg");
const { convertToShortUrl } = require("./utils");
const app = express();
const port = 5555;
const os = require("os"); 


app.use(express.json());

app.post("/", async (req, res) => {
  const { longUrl } = req.body;
  try {
    const containerId = os.hostname();
    const instanceDetails = {
      instance: os.hostname(),
    };
    const shortUrl = convertToShortUrl(longUrl);
    await storeInDb({ shortUrl, longUrl });
    return res.json({ shortUrl,instanceDetails });
  } catch (err) {
    console.log(err);
    return res
      .status(501)
      .json({ error: "Failed to create short url", message: err.message });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const { longurl: longUrl } = await getLongUrl({ shortUrl });
    return res.redirect(302,longUrl);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Failed to redirect to url", message: err.message });
  }
});
app.listen(port, () => console.log(`Running on port ${port}`));
