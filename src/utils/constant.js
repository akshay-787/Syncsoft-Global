// src/utils/config.js

const ENV = process.env.NODE_ENV; // "development" or "production"

const CONFIG = {
  development: {
    API_URL: 'http://localhost:3000',
  },
  production: {
    API_URL: 'https://syncsoft-global.vercel.app',
  },
};

export const API_URL = CONFIG[ENV].API_URL;
