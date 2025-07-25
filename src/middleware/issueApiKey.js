import { generateApiKey, hashApiKey } from "../utils/index.js";
import { saveApiKeyByEmail } from "../services/apiKey.js";

const issueApiKey = async (req, res, next) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const apiKey = generateApiKey();
    const hashedKey = hashApiKey(apiKey);

    await saveApiKeyByEmail(email, hashedKey);

    res.status(201).json({ apiKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default issueApiKey;
