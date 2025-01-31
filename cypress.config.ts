import { defineConfig } from "cypress";
import { dotenv } from "cypress-plugin-dotenv";
import fs from "fs";

export default defineConfig({
  projectId: "siuwhy",
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      const envFile = ".env.cypress.local";
      if (fs.existsSync(envFile)) {
        return dotenv(config, { path: envFile });
      }
    }
  }
});
