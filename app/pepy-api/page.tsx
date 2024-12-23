import { Code } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { EndpointSection } from "@/app/pepy-api/components/endpoint-section";
import { GETV2ProjectsResponseSchema } from "@/app/pepy-api/constants/get-v2-projects";
import { parametersGETV2Projects } from "@/app/pepy-api/constants/get-v2-projects";
import { GETV2ProjectsSampleResponse } from "@/app/pepy-api/constants/get-v2-projects";
import {
  GETV1ProProjectDownloadsResponseExample,
  GETV1ProProjectDownloadsResponseSchema
} from "@/app/pepy-api/constants/service-api-v1-projects-downloads";
import { GETV1ProProjectDownloadsQueryParams } from "@/app/pepy-api/constants/service-api-v1-projects-downloads";
import { GETV1ProProjectDownloadsPathParams } from "@/app/pepy-api/constants/service-api-v1-projects-downloads";


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

          <EndpointSection
            title="Get Project Statistics"
            description="Retrieve download statistics for a specific Python package."
            method="GET"
            endpoint="GET /api/v2/projects/{project}"
            isPro={false}
            pathParameters={parametersGETV2Projects}
            responseExample={GETV2ProjectsSampleResponse}
            responseSchema={GETV2ProjectsResponseSchema}
          />

          <EndpointSection
            title="PRO: Get Project Downloads"
            description="Retrieve download statistics for a specific project."
            method="GET"
            endpoint="GET /service-api/v1/pro/projects/{project}/downloads"
            isPro={true}
            pathParameters={GETV1ProProjectDownloadsPathParams}
            queryParameters={GETV1ProProjectDownloadsQueryParams}
            responseExample={GETV1ProProjectDownloadsResponseExample}
            responseSchema={GETV1ProProjectDownloadsResponseSchema}
          />

        </div>
      </div>
    </div>
  );
}