// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const connectDB = require('./config/db');


// const authRoutes = require('./routes/auth');
// const tripRoutes = require('./routes/trips');
// console.log("🚀 Server starting...");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/trips', tripRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');

console.log("🚀 Server starting...");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const MODEL = "gemini-2.0-flash"; 

const SYSTEM_PROMPT = `
You are SmoothVoyage Assistant, a friendly, helpful AI travel companion for the Smooth Voyage website.
Features: Google login, create trips (title, destination with map, dates, notes), view trips on dashboard, open trip to see details. 
Collaborators: in progress, visible only inside a trip view.
Help users navigate these features, answer questions, and give travel tips. Keep answers short and helpful.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [] } = req.body;

   
    const contents = messages.map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents
        })
      }
    );

    const data = await resp.json();

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn’t process that.";

    res.json({ reply: botReply });
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    res.status(500).json({ error: "Error communicating with Gemini API" });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
