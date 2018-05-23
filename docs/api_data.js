define({ "api": [
  {
    "type": "delete",
    "url": "/jurisdictions/:id",
    "title": "Delete Existing Jurisdiction",
    "version": "1.0.0",
    "name": "DeleteJurisdiction",
    "group": "Jurisdiction",
    "description": "<p>Delete existing jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aef42d59748e41e02e2a562\",\n   \"jurisdiction\": {\n      \"_id\": \"5af2aad4408ccb594b173f96\",\n      \"code\": \"84105193\",\n      \"name\": \"Faroe Islands\"\n   },\n   \"code\": \"66230485\",\n   \"name\": \"Kunze and Sons\",\n   \"phone\": \"1-964-200-3838 x5726\",\n   \"email\": \"mazie_bayer@hotmail.com\",\n   \"website\": \"vilma.net\",\n   \"about\": \"Molestias culpa porro pariatur.\",\n   \"address\": \"6552 Haven Prairie\",\n   \"color\": \"#b32acc\",\n   \"location\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n   },\n   \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    },\n   \"createdAt\": \"2018-05-06T18:00:53.282Z\",\n   \"updatedAt\": \"2018-05-06T18:00:53.282Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions/:id",
    "title": "Get Existing Jurisdiction",
    "version": "1.0.0",
    "name": "GetJurisdiction",
    "group": "Jurisdiction",
    "description": "<p>Get existing jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aef42d59748e41e02e2a562\",\n   \"jurisdiction\": {\n      \"_id\": \"5af2aad4408ccb594b173f96\",\n      \"code\": \"84105193\",\n      \"name\": \"Faroe Islands\"\n   },\n   \"code\": \"66230485\",\n   \"name\": \"Kunze and Sons\",\n   \"phone\": \"1-964-200-3838 x5726\",\n   \"email\": \"mazie_bayer@hotmail.com\",\n   \"website\": \"vilma.net\",\n   \"about\": \"Molestias culpa porro pariatur.\",\n   \"address\": \"6552 Haven Prairie\",\n   \"color\": \"#b32acc\",\n   \"location\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n   },\n   \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    },\n   \"createdAt\": \"2018-05-06T18:00:53.282Z\",\n   \"updatedAt\": \"2018-05-06T18:00:53.282Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions",
    "title": "List Jurisdictions",
    "version": "1.0.0",
    "name": "GetJurisdictions",
    "group": "Jurisdiction",
    "description": "<p>Returns a list of jurisdictions</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of jurisdictions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "data.location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "data.boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of jurisdiction returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest jurisdiction was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n  {\n    \"_id\": \"5aef42d59748e41e02e2a562\",\n    \"jurisdiction\": {\n       \"_id\": \"5af2aad4408ccb594b173f96\",\n       \"code\": \"84105193\",\n       \"name\": \"Faroe Islands\"\n    },\n    \"code\": \"66230485\",\n    \"name\": \"Kunze and Sons\",\n    \"phone\": \"1-964-200-3838 x5726\",\n    \"email\": \"mazie_bayer@hotmail.com\",\n    \"website\": \"vilma.net\",\n    \"about\": \"Molestias culpa porro pariatur.\",\n    \"address\": \"6552 Haven Prairie\",\n    \"color\": \"#b32acc\",\n    \"location\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n    },\n    \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    }\n  ],\n  \"total\": 5,\n  \"size\": 1,\n  \"limit\": 1,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 5,\n  \"lastModified\": \"2018-05-06T18:00:53.283Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/jurisdictions/:jurisdiction/jurisdictions",
    "title": "List Sub-Jurisdictions",
    "version": "1.0.0",
    "name": "GetSubJurisdictions",
    "group": "Jurisdiction",
    "description": "<p>Returns a list of sub-jurisdictions</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions/:jurisdiction/jurisdictions"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of jurisdictions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "data.location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "data.boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of jurisdiction returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest jurisdiction was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n  {\n    \"_id\": \"5aef42d59748e41e02e2a562\",\n    \"jurisdiction\": {\n       \"_id\": \"5af2aad4408ccb594b173f96\",\n       \"code\": \"84105193\",\n       \"name\": \"Faroe Islands\"\n    },\n    \"code\": \"66230485\",\n    \"name\": \"Kunze and Sons\",\n    \"phone\": \"1-964-200-3838 x5726\",\n    \"email\": \"mazie_bayer@hotmail.com\",\n    \"website\": \"vilma.net\",\n    \"about\": \"Molestias culpa porro pariatur.\",\n    \"address\": \"6552 Haven Prairie\",\n    \"color\": \"#b32acc\",\n    \"location\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n    },\n    \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    }\n  ],\n  \"total\": 5,\n  \"size\": 1,\n  \"limit\": 1,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 5,\n  \"lastModified\": \"2018-05-06T18:00:53.283Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/jurisdictions/:id",
    "title": "Patch Existing Jurisdiction",
    "version": "1.0.0",
    "name": "PatchJurisdiction",
    "group": "Jurisdiction",
    "description": "<p>Patch existing jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aef42d59748e41e02e2a562\",\n   \"jurisdiction\": {\n      \"_id\": \"5af2aad4408ccb594b173f96\",\n      \"code\": \"84105193\",\n      \"name\": \"Faroe Islands\"\n   },\n   \"code\": \"66230485\",\n   \"name\": \"Kunze and Sons\",\n   \"phone\": \"1-964-200-3838 x5726\",\n   \"email\": \"mazie_bayer@hotmail.com\",\n   \"website\": \"vilma.net\",\n   \"about\": \"Molestias culpa porro pariatur.\",\n   \"address\": \"6552 Haven Prairie\",\n   \"color\": \"#b32acc\",\n   \"location\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n   },\n   \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    },\n   \"createdAt\": \"2018-05-06T18:00:53.282Z\",\n   \"updatedAt\": \"2018-05-06T18:00:53.282Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/jurisdictions",
    "title": "Create New Jurisdiction",
    "version": "1.0.0",
    "name": "PostJurisdiction",
    "group": "Jurisdiction",
    "description": "<p>Create new jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aef42d59748e41e02e2a562\",\n   \"jurisdiction\": {\n      \"_id\": \"5af2aad4408ccb594b173f96\",\n      \"code\": \"84105193\",\n      \"name\": \"Faroe Islands\"\n   },\n   \"code\": \"66230485\",\n   \"name\": \"Kunze and Sons\",\n   \"phone\": \"1-964-200-3838 x5726\",\n   \"email\": \"mazie_bayer@hotmail.com\",\n   \"website\": \"vilma.net\",\n   \"about\": \"Molestias culpa porro pariatur.\",\n   \"address\": \"6552 Haven Prairie\",\n   \"color\": \"#b32acc\",\n   \"location\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n   },\n   \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    },\n   \"createdAt\": \"2018-05-06T18:00:53.282Z\",\n   \"updatedAt\": \"2018-05-06T18:00:53.282Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/jurisdictions/:id",
    "title": "Put Existing Jurisdiction",
    "version": "1.0.0",
    "name": "PutJurisdiction",
    "group": "Jurisdiction",
    "description": "<p>Put existing jurisdiction</p>",
    "filename": "lib/http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://majifix-jurisdiction.herokuapp.com/v1/jurisdictions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique jurisdiction identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "jurisdiction",
            "defaultValue": "undefined",
            "description": "<p>jurisdiction under which this jurisdiction belongs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Unique human readable coded name of the jurisdiction. Used in deriving service request code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique human readable name of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Primary mobile phone number used to contact jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Primary email address used to contact jurisdiction direct</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "website",
            "description": "<p>Primary website url of the jurisdiction</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>A brief summary about jurisdiction if available i.e additional details that clarify what a jurisdiction do</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Human readable physical address of jurisdiction office</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "color",
            "description": "<p>A color code(in hexadecimal format) eg. #363636 used to differentiate jurisdictions visually</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "location",
            "description": "<p>A center of jurisdiction. Its an office reachable by citizen(or customer)</p>"
          },
          {
            "group": "Success 200",
            "type": "MultiPolygon",
            "optional": true,
            "field": "boundaries",
            "description": "<p>Jurisdiction boundaries. Its mainly used for geo lookup of service request jurisdiction based on its geo coordinates.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when jurisdiction was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when jurisdiction was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"_id\": \"5aef42d59748e41e02e2a562\",\n   \"jurisdiction\": {\n      \"_id\": \"5af2aad4408ccb594b173f96\",\n      \"code\": \"84105193\",\n      \"name\": \"Faroe Islands\"\n   },\n   \"code\": \"66230485\",\n   \"name\": \"Kunze and Sons\",\n   \"phone\": \"1-964-200-3838 x5726\",\n   \"email\": \"mazie_bayer@hotmail.com\",\n   \"website\": \"vilma.net\",\n   \"about\": \"Molestias culpa porro pariatur.\",\n   \"address\": \"6552 Haven Prairie\",\n   \"color\": \"#b32acc\",\n   \"location\": {\n      \"type\": \"Point\",\n      \"coordinates\": [\n         -77.5707764925392,\n         39.880937519031235\n       ]\n   },\n   \"boundaries\": {\n       \"type\": \"MultiPolygon\",\n       \"coordinates\": [\n       [\n          [\n            [\n              -76.80207859497996,\n               55.69469494228919\n            ],\n            [\n              -75.71404588095427,\n              53.59198291229545\n            ],\n            [\n              -73.49941546156064,\n              47.7536674960849\n            ],\n            [\n              -78.24692848453104,\n              51.75424604090497\n            ],\n            [\n              -77.96718998971203,\n              43.532912808667284\n            ],\n            [\n              -80.05583147381611,\n              51.2655718114278\n            ],\n            [\n              -87.10717890417094,\n              49.55715210838287\n            ],\n            [\n              -86.82247323878836,\n              57.53161913076085\n            ],\n            [\n              -81.00322721012589,\n              56.68343367062641\n            ],\n            [\n              -81.15080039041881,\n              57.91444311426214\n            ],\n            [\n              -76.80207859497996,\n              55.69469494228919\n            ]\n           ]\n        ],\n      ]\n    },\n   \"createdAt\": \"2018-05-06T18:00:53.282Z\",\n   \"updatedAt\": \"2018-05-06T18:00:53.282Z\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
