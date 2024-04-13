const express = require("express");
const { Translate } = require("@google-cloud/translate").v2;
const { client_email, private_key } = require("./credentials.json");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const translate = new Translate({
  credentials: {
    client_email,
    private_key,
  },
});

app.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    // Translate text
    const [translation] = await translate.translate(text, targetLanguage);
    res.json({ translation });
  } catch (error) {
    console.error("Error translating text:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
