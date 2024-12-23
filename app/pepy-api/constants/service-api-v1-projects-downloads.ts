export const GETV1ProProjectDownloadsResponseExample = {
  "downloads": {
    "2023-08-29": {
      "1.0": 10
    }
  }
};

export const GETV1ProProjectDownloadsResponseSchema = `{
  "type": "object",
  "properties": {
    "downloads": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "1.0": {
            "type": "integer"
          }
        }
      }
    }
  },
  "required": ["downloads"]
}`;

export const GETV1ProProjectDownloadsQueryParams = [
  { name: "includeCIDownloads", type: "boolean", description: "Include CI downloads" },
  { name: "timeRange", type: "string", description: "Time range for the downloads (FOUR_MONTHS/ONE_YEAR)" }
];

export const GETV1ProProjectDownloadsPathParams = [
  { name: "project", type: "string", description: "Name of the Python package" }
];