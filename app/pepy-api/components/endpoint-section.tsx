import { Card } from "@/components/ui/card";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

interface EndpointSectionProps {
  title: string;
  description: string;
  method: string;
  endpoint: string;
  pathParameters?: Parameter[];
  queryParameters?: Parameter[];
  responseExample: object;
  responseSchema: string;
  isPro: boolean; // New Pro flag
}

interface Parameter {
  name: string;
  type: string;
  description: string;
}

export const EndpointSection = ({
                                  title,
                                  description,
                                  method,
                                  endpoint,
                                  pathParameters,
                                  queryParameters,
                                  responseExample,
                                  responseSchema,
                                  isPro
                                }: EndpointSectionProps) => (
  <Card className="p-6 mb-8">
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        {isPro && (
          <div
            className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium">
            Pro
          </div>
        )}
        <div
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          {method}
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Endpoint</h3>
      <div className="bg-muted p-4 rounded-md font-mono">{endpoint}</div>
    </div>

    {pathParameters && (
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
          {pathParameters.map(param => (
            <tr key={param.name}>
              <td className="py-2 font-mono">{param.name}</td>
              <td className="py-2">{param.type}</td>
              <td className="py-2 text-muted-foreground">{param.description}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )}

    {queryParameters && (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Query Parameters</h3>
        <table className="w-full">
          <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">Parameter</th>
            <th className="text-left py-2 font-medium">Type</th>
            <th className="text-left py-2 font-medium">Description</th>
          </tr>
          </thead>
          <tbody>
          {queryParameters.map(param => (
            <tr key={param.name}>
              <td className="py-2 font-mono">{param.name}</td>
              <td className="py-2">{param.type}</td>
              <td className="py-2 text-muted-foreground">{param.description}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Response</h3>
      <Tabs defaultValue="example" className="w-full">
        <TabsList>
          <TabsTrigger value="example">Example</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
        </TabsList>
        <TabsContent value="example">
          <pre className="bg-muted p-4 rounded-md overflow-auto">
            <code>{JSON.stringify(responseExample, null, 2)}</code>
          </pre>
        </TabsContent>
        <TabsContent value="schema">
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre><code>{responseSchema}</code></pre>
          </div>
        </TabsContent>
      </Tabs>
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
        {isPro && (
          <tr className="border-b">
            <td className="py-2">403</td>
            <td className="py-2 text-muted-foreground">Unauthorized because you are not PRO</td>
          </tr>
        )}
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
);