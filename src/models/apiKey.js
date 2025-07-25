import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  keyHash: {
    type: String,
    required: true,
    unique: true,
  },
  owner: String,
  status: {
    type: String,
    enum: ["active", "revoked"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUsedAt: {
    type: Date,
  },
  activations: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("ApiKey", apiKeySchema);
