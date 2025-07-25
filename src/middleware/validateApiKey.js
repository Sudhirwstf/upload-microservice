import ApiKey from "../models/apiKey.js";
import { hashApiKey } from "../utils/index.js";

const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API key missing" });
  const hashed = hashApiKey(apiKey);

  try {
    const keyDoc = await ApiKey.findOne({ keyHash: hashed, status: "active" });

    if (!keyDoc) return res.status(403).json({ error: "Invalid or revoked API key" });

    keyDoc.lastUsedAt = new Date();
    await keyDoc.save();

    req.apiKeyOwner = keyDoc.owner;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default validateApiKey;
