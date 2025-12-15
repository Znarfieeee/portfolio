// src/services/api.js

// Flowise configuration
export const FLOWISE_CONFIG = {
  apiUrl: import.meta.env.VITE_FLOWISE_API_URL || "https://cloud.flowiseai.com",
  chatflowId: import.meta.env.VITE_FLOWISE_CHATFLOW_ID,
  apiKey: import.meta.env.VITE_FLOWISE_API_KEY,
}

export const FLOWISE_PREDICTION_ENDPOINT = `${FLOWISE_CONFIG.apiUrl}/api/v1/prediction/${FLOWISE_CONFIG.chatflowId}`
