import dotenv from "dotenv";
dotenv.config();
import express from "express";
import apiKeyRoutes from "./routes/apiKey.js";
import healthzRoute from "./routes/healthz.js";
import uploadRoutes from "./routes/uploads.js";
import connectDb from "./db/config.js";
import { setupSwagger } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
setupSwagger(app);
app.use("/", healthzRoute);
app.use("/apiKey", apiKeyRoutes);
app.use("/upload", uploadRoutes);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
