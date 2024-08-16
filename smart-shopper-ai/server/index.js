const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Ensure you have this line

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const genai = new GoogleGenerativeAI(process.env.API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  top_k: 64,
  max_output_tokens: 8192,
};

app.post("/categorize", async (req, res) => {
  const list = req.body.list;
  try {
    const chat_session = await genai.chat.create({
      model: "models/chat-bison-001",
      messages: [
        {
          author: "user",
          content: `This is my grocery list. Please categorize it with headings and aisle numbers:\n${list.join(
            "\n"
          )}`,
        },
      ],
      temperature: generationConfig.temperature,
      topP: generationConfig.top_p,
      topK: generationConfig.top_k,
      maxOutputTokens: generationConfig.max_output_tokens,
    });

    const response = chat_session.messages.pop();
    res.json({ categorizedList: response.content });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
