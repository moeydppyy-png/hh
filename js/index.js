require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// غيره بالرابط الحقيقي للويب هوك (خليه سري ولا تعطيه أحد)
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

// راوت يستقبل الطلب من Roblox
app.post("/api/send", async (req, res) => {
  try {
    const { username, message } = req.body;

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**${username}**: ${message}`
      }),
    });

    res.send({ status: "Message sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// تشغيل السيرفر
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
