import { Code } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const sampleResponse = {
  "total_downloads": 1395207458,
  "id": "requests",
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
};

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Code className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">API Documentation</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Access Python package download statistics programmatically through our REST API.
          </p>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Base URL</h2>
            <div className="bg-muted p-4 rounded-md font-mono mb-2">
              https://api.pepy.tech
            </div>
            <p className="text-sm text-muted-foreground">
              All API endpoints are relative to this base URL.
            </p>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <p className="text-muted-foreground mb-4">
              All API requests require an API key to be included in the request headers.
            </p>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-mono mb-2">X-API-Key: your_api_key</p>
                <p className="text-sm text-muted-foreground">
                  Get your API key from your <Link href="/user" className="text-blue-600 hover:underline">user
                  profile</Link>.
                </p>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Never share your API key or commit it to public repositories.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Rate Limits</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Free users: 10 requests per minute</li>
                  <li>Pro users: 100 requests per minute</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Get Project Statistics</h2>
                <p className="text-muted-foreground">
                  Retrieve download statistics for a specific Python package.
                </p>
              </div>
              <div
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                GET
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Endpoint</h3>
              <div className="bg-muted p-4 rounded-md font-mono">
                GET /api/v2/projects/{"{project}"}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Path Parameters</h3>
              <table className="w-full">
                <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Parameter</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="py-2 font-mono">project</td>
                  <td className="py-2">string</td>
                  <td className="py-2 text-muted-foreground">Name of the Python package</td>
                </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Response</h3>
              <Tabs defaultValue="example" className="w-full">
                <TabsList>
                  <TabsTrigger value="example">Example</TabsTrigger>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                </TabsList>
                <TabsContent value="example">
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{JSON.stringify(sampleResponse, null, 2)}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="schema">
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <pre><code>{`{
  "type": "object",
  "properties": {
    "total_downloads": {
      "type": "integer",
      "description": "Total number of downloads across all versions"
    },
    "id": {
      "type": "string",
      "description": "Package name"
    },
    "versions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of available versions"
    },
    "downloads": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "type": "integer"
        }
      },
      "description": "Daily download counts per version"
    }
  },
  "required": ["total_downloads", "id", "versions", "downloads"]
}`}</code></pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Example Usage</h3>
              <div className="bg-muted p-4 rounded-md overflow-auto">
                <pre><code>{`# Using curl
curl -H "X-API-Key: your_api_key" https://api.pepy.tech/api/v2/projects/requests

# Python with requests library
import requests

headers = {
    'X-API-Key': 'your_api_key'
}

response = requests.get(
    'https://api.pepy.tech/api/v2/projects/requests',
    headers=headers
)
data = response.json()`}</code></pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Response Status Codes</h3>
              <table className="w-full">
                <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Code</th>
                  <th className="text-left py-2 font-medium">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b">
                  <td className="py-2">200</td>
                  <td className="py-2 text-muted-foreground">Successful response</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">401</td>
                  <td className="py-2 text-muted-foreground">Missing or invalid API key</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">404</td>
                  <td className="py-2 text-muted-foreground">Project not found</td>
                </tr>
                <tr>
                  <td className="py-2">429</td>
                  <td className="py-2 text-muted-foreground">Rate limit exceeded</td>
                </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}