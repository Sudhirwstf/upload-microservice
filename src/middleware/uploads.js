import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

// Standardized error response helper
function errorResponse(res, status, message, details = null) {
  const error = { error: message };
  if (details) error.details = details;
  return res.status(status).json(error);
}

// Retry helper for async functions
async function retryAsync(fn, retries = 3, delay = 500) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries - 1) await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastErr;
}

const uploadToAzure = async (req, res) => {
  // Azure Blob Storage setup
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || "uploads";

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    return errorResponse(res, 500, "AZURE_STORAGE_CONNECTION_STRING is not set in environment variables");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

  const filename = req.headers["x-filename"] + Date.now().toString();
  // const webhookUrl = req.headers["x-webhook-url"];

  if (!filename) {
    return errorResponse(res, 400, "x-filename header is required");
  }

  try {
    // Ensure container exists
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    // Stream upload
    const bufferSize = 4 * 1024 * 1024; // 4MB , default is 8MB
    const maxConcurrency = 20;
    let uploadResponse;
    try {
      uploadResponse = await blockBlobClient.uploadStream(req, bufferSize, maxConcurrency, {
        blobHTTPHeaders: { blobContentType: req.headers["content-type"] || "application/octet-stream" },
      });
    } catch (azureErr) {
      console.error("Azure upload error:", azureErr);
      return errorResponse(res, 500, "Upload to Azure failed", azureErr.message);
    }

    // Prepare webhook payload
    const payload = {
      filename,
      url: blockBlobClient.url,
      etag: uploadResponse.etag,
      lastModified: uploadResponse.lastModified,
      requestId: uploadResponse.requestId,
    };

    res.status(201).json(payload);
  } catch (err) {
    console.error("General upload error:", err);
    return errorResponse(res, 500, "Upload failed", err.message);
  }
};

export default uploadToAzure;
