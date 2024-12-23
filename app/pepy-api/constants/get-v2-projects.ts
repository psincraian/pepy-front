export const GETV2ProjectsSampleResponse = {
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

export const parametersGETV2Projects = [
  { name: "project", type: "string", description: "Name of the Python package" }
];

export const GETV2ProjectsResponseSchema = `{
   "type":"object",
   "properties":{
      "total_downloads":{
         "type":"integer",
         "description":"Total number of downloads across all versions"
      },
      "id":{
         "type":"string",
         "description":"Package name"
      },
      "versions":{
         "type":"array",
         "items":{
            "type":"string"
         },
         "description":"List of available versions"
      },
      "downloads":{
         "type":"object",
         "additionalProperties":{
            "type":"object",
            "additionalProperties":{
               "type":"integer"
            }
         },
         "description":"Daily download counts per version"
      }
   },
   "required":[
      "total_downloads",
      "id",
      "versions",
      "downloads"
   ]
}`;