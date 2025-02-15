import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors"; // Import the CORS middleware from Hono
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = new Hono();
let generatedData: string | null = null;

// Use the CORS middleware
app.use(cors({ origin: "*" }));

app.post("/", async (c) => {
    const genAI = new GoogleGenerativeAI(""); // Replace with your API key

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = await c.req.json();

    const result = await model.generateContent(prompt.text);
    const response = await result.response;
    generatedData = response.text();
    generatedData = response.text();
    return c.text(generatedData);
});

app.get("/", async (c) => {
    if (generatedData) {
        return c.json({ generatedData });
    } else {
        return c.json({ message: "No data available. Please send a POST request." });
    }
});

serve({
  fetch: app.fetch,
  port: 5000,
});

console.log("Server running on http://localhost:5000");
