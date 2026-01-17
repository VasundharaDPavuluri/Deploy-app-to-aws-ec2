import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve paths (because we are running from server/ folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load .env from project root
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(express.json());


// Environment variables
const PORT = process.env.PORT || 3000;
const PUBLIC_KEY = process.env.PUBLIC_API_KEY;
const SECRET_KEY = process.env.SECRET_API_KEY;

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// Public endpoint - Frontend is allowed to access this
app.get("/config", (req, res) => {
  res.json({
    publicKey: PUBLIC_KEY
  });
});

/**
 * Secure endpoint
 * Frontend does NOT send any secret
 * Backend uses SECRET_KEY internally
 */
app.post("/secure-action", (req, res) => {
  if (!SECRET_KEY) {
    return res.status(500).json({
      error: "Server misconfigured: secret key missing"
    });
  }

  // Simulate a secure operation (like Stripe charge)
  res.json({
    message: "Secure backend action successful 🚀"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});