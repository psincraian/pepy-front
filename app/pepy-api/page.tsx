import React from "react";
import AppBar from "@/components/app_bar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <AppBar withSearch={true} />
      <main className={styles.main}>
        <h1 className={styles.heading}>API Documentation</h1>

        <p>Welcome to the documentation for the API of our service. This document provides details on the available API endpoints, how to authenticate, and examples of requests and responses.</p>

        <h2 className={styles.heading}>Base URL</h2>
        <p>The base URL for our API is: <code className={styles.code}>https://api.pepy.tech</code>.</p>

        <div className={styles.authSection}>
          <h2>Authentication</h2>
          <p>All endpoints are protected by an API Key, which should be specified in the <code className={styles.code}>X-Api-Key</code> header. API Keys can be created for free with an account.</p>
        </div>

        <h2 className={styles.heading}>API Endpoints</h2>

        <h3>GET /api/v2/projects/[project]</h3>

        <div className={styles.example}>
          <h4 className={styles.subheading}>Example Request:</h4>
          <code className={styles.code}>
            <pre>
              {`
curl -H "X-Api-Key: your-api-key" https://api.pepy.tech/api/v2/projects/{project}
            `}
            </pre>
          </code>
        </div>

        <div className={styles.example}>
          <h4 className={styles.subheading}>Example Response:</h4>
          <code className={styles.code}>
            <pre>
              {`
{
  "total_downloads": 1395207458,
  "id": "{project}",
  "versions": [
    "1.0",
    "1.1"
  ],
  "downloads": {
    "2023-08-29": {
      "1.0": 1142321,
      "1.1": 1231
    },
    "2023-08-28": {
      "1.0": 1241242,
      "1.1": 3234
    }
  }
}
            `}
            </pre>
          </code>
        </div>

        <p>Feel free to explore other endpoints and reach out if you have any questions or need further assistance!</p>
      </main>
    </>
  );
}
