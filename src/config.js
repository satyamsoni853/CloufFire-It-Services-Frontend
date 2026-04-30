// The API URL is injected at build time from environment variables.
// In development, it defaults to localhost. In production, it uses the VITE_API_URL set in Vercel or .env.production.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
