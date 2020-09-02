const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()

let host = ''

try {
  host = process.env.REACT_APP_SERVER_URL.split('//')[1]
} catch {
  hist = 'localhost:4000'
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    "swagger" : "2.0",
    "info" : {
      "description" : "This is CRMS API Documentation.",
      "version" : "1.0.0",
      "title" : "CRMS API",
      "contact" : {
        "name" : "Project Manager",
        "email" : "ljs02459@gmail.com"
      },
      "license" : {
        "name" : "MIT License",
        "url" : "https://github.com/crms-team/crms/blob/develop/LICENSE"
      }
    },
    "host" : host,
    "basePath" : "/",
    "tags" : [ {
      "name" : "Passwd",
      "description" : "System CRMS passwd API Session"
    }, {
      "name" : "Dashboard",
      "description" : "CRMS Dashboard API Session"
    }, {
      "name" : "Cloud Key",
      "description" : "CRMS Cloud Key API Session"
    }, {
      "name" : "Cloud History",
      "description" : "CRMS Cloud History API Session"
    }, {
      "name" : "Cloud Resource",
      "description" : "CRMS Cloud Resource API Session"
    } ],
    "schemes" : [ "http"],
    "paths" : {
      "/api/passwd" : {
        "get" : {
          "tags" : [ "Passwd" ],
          "summary" : "Check Correct Password",
          "description" : "Check CRMS System Password\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "passwd",
            "in" : "query",
            "description" : "string of base64 encoded password value",
            "required" : true,
            "type" : "string",
            "format" : "base64"
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            }
          }
        },
        "put" : {
          "tags" : [ "Passwd" ],
          "summary" : "Update Password",
          "description" : "Change CRMS System Password\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "in" : "body",
            "name" : "passwords",
            "description" : "string of base64 encoded now password value and now password",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/passwords"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            }
          }
        }
      },
      "/api/dashboard" : {
        "get" : {
          "tags" : [ "Dashboard" ],
          "summary" : "Get dashboard data",
          "description" : "Get dashboard resource status summary\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "key_id",
            "in" : "query",
            "description" : "if none this value get all key id data else get only this key id data",
            "required" : false,
            "type" : "string"
          } ],
          "responses" : {
            "200" : {
              "description" : "Return resource status. \nindex 0 = Enable or Running Resource Count. \nindex 1 = All Resource Count.\n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      },
      "/api/cloud/key" : {
        "get" : {
          "tags" : [ "Cloud Key" ],
          "summary" : "Get Key Data",
          "description" : "Get vendor, key data\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "key_id",
            "in" : "query",
            "description" : "key",
            "required" : true,
            "type" : "string"
          } ],
          "responses" : {
            "200" : {
              "description" : "Return key data. \n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200_1"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "post" : {
          "tags" : [ "Cloud Key" ],
          "summary" : "Register Key",
          "description" : "Register Key Data in CRMS System\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body_1"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "put" : {
          "tags" : [ "Cloud Key" ],
          "summary" : "Update Key Data",
          "description" : "Change Key Data in CRMS System\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "delete" : {
          "tags" : [ "Cloud Key" ],
          "summary" : "Delete Key",
          "description" : "Delete Key Data in CRMS System\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "key_id",
            "in" : "query",
            "description" : "string of delete key id",
            "required" : true,
            "type" : "string"
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      },
      "/api/cloud/key/list" : {
        "get" : {
          "tags" : [ "Cloud Key" ],
          "summary" : "Get register key list",
          "description" : "Get register key list\n",
          "produces" : [ "application/json" ],
          "parameters" : [ ],
          "responses" : {
            "200" : {
              "description" : "Return key list. \n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200_2"
              }
            }
          }
        }
      },
      "/api/cloud/history" : {
        "get" : {
          "tags" : [ "Cloud History", "Dashboard" ],
          "summary" : "Get cloud history",
          "description" : "Get cloud resource history from register keys \n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "key_id",
            "in" : "query",
            "description" : "if exists get only this key id history else get all historys",
            "required" : false,
            "type" : "string"
          } ],
          "responses" : {
            "200" : {
              "description" : "Return key list. \n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200_3"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      },
      "/api/cloud/data" : {
        "get" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Get cloud all resource data",
          "description" : "Get cloud all resource data from register key\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "key_id",
            "in" : "query",
            "description" : "get only this key id data",
            "required" : true,
            "type" : "string"
          }, {
            "name" : "type",
            "in" : "query",
            "description" : "get realtime data and make log",
            "required" : false,
            "type" : "boolean"
          } ],
          "responses" : {
            "200" : {
              "description" : "Return cloud all resource data. \n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200_4"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      },
      "/api/cloud/data/{resource}" : {
        "get" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Get cloud resource data",
          "description" : "Get cloud resource data from register key\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "resource",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "cloud vendor service"
          }, {
            "name" : "key_id",
            "in" : "query",
            "description" : "get only this key id data",
            "required" : true,
            "type" : "string"
          }, {
            "name" : "type",
            "in" : "query",
            "description" : "get realtime data and make log",
            "required" : false,
            "type" : "boolean"
          } ],
          "responses" : {
            "200" : {
              "description" : "Return cloud resource data. \n",
              "schema" : {
                "$ref" : "#/definitions/inline_response_200_4"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "post" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Create cloud resource",
          "description" : "Create cloud resource from register key\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "resource",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "cloud vendor service"
          }, {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body_3"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "put" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Update cloud resource",
          "description" : "Update cloud resource from register key\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "resource",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "cloud vendor service"
          }, {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body_2"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        },
        "delete" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Delete cloud resource",
          "description" : "Delete cloud resource from register key\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "resource",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "cloud vendor service"
          }, {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body_4"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      },
      "/api/cloud/data/{resource}/etc/{func}" : {
        "post" : {
          "tags" : [ "Cloud Resource" ],
          "summary" : "Excute etc func cloud resource",
          "description" : "Excute cloud resource etc fucntions from register key\nexample) Start Compute or Stop Compute\n",
          "produces" : [ "application/json" ],
          "parameters" : [ {
            "name" : "resource",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "cloud vendor service"
          }, {
            "name" : "func",
            "in" : "path",
            "required" : true,
            "type" : "string",
            "format" : "etc functions"
          }, {
            "in" : "body",
            "name" : "body",
            "description" : "data",
            "required" : true,
            "schema" : {
              "$ref" : "#/definitions/body_5"
            }
          } ],
          "responses" : {
            "200" : {
              "description" : "checking result",
              "schema" : {
                "$ref" : "#/definitions/ResultTrueOnly"
              }
            },
            "201" : {
              "description" : "occur erros",
              "schema" : {
                "$ref" : "#/definitions/ResultFalse"
              }
            }
          }
        }
      }
    },
    "definitions" : {
      "StatusArray" : {
        "type" : "object",
        "properties" : {
          "server" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "volume" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "ip" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "keypair" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "database" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "vpc" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "subnet" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "securitygroup" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          },
          "bucket" : {
            "type" : "array",
            "example" : [ 0, 0 ],
            "items" : {
              "type" : "integer"
            }
          }
        }
      },
      "ResultTrueOnly" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          }
        }
      },
      "ResultFalse" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : false
          },
          "msg" : {
            "type" : "string",
            "example" : "Error Message"
          }
        }
      },
      "passwords" : {
        "type" : "object",
        "required" : [ "new_passwd", "passwd" ],
        "properties" : {
          "passwd" : {
            "type" : "string",
            "format" : "base64",
            "example" : "MTIzNA==",
            "description" : "string of base64 encoded now password value"
          },
          "new_passwd" : {
            "type" : "string",
            "format" : "base64",
            "example" : "Y3Jtcw==",
            "description" : "string of base64 encoded new password value"
          }
        }
      },
      "inline_response_200" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          },
          "data" : {
            "$ref" : "#/definitions/StatusArray"
          }
        }
      },
      "inline_response_200_1" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          },
          "data" : {
            "type" : "object",
            "example" : {
              "vendor" : "aws",
              "keys" : {
                "accessKeyId" : "AWS ACCESS KEY",
                "secretAccessKey" : "AWS SECRET KEY",
                "region" : "AWS REGION"
              }
            },
            "properties" : { }
          }
        }
      },
      "body" : {
        "type" : "object",
        "required" : [ "key_id", "keys", "vendor" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "vendor" : {
            "type" : "string",
            "format" : "cloud vendor",
            "example" : "aws",
            "description" : "cloud vendor lowwer case"
          },
          "keys" : {
            "type" : "object",
            "example" : {
              "accessKeyId" : "AWS ACCESS KEY",
              "secretAccessKey" : "AWS SECRET KEY",
              "region" : "AWS REGION"
            },
            "description" : "key data",
            "properties" : { }
          }
        }
      },
      "body_1" : {
        "type" : "object",
        "required" : [ "key_id", "keys", "vendor" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "vendor" : {
            "type" : "string",
            "format" : "cloud vendor",
            "example" : "aws",
            "description" : "cloud vendor lowwer case"
          },
          "keys" : {
            "type" : "object",
            "example" : {
              "accessKeyId" : "AWS ACCESS KEY",
              "secretAccessKey" : "AWS SECRET KEY",
              "region" : "AWS REGION"
            },
            "description" : "key data",
            "properties" : { }
          }
        }
      },
      "inline_response_200_2" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          },
          "keys" : {
            "type" : "object",
            "example" : {
              "key1" : {
                "vendor" : "aws",
                "keys" : {
                  "accessKeyId" : "AWS ACCESS KEY",
                  "secretAccessKey" : "AWS SECRET KEY",
                  "region" : "AWS REGION"
                }
              },
              "key2" : {
                "vendor" : "aws",
                "keys" : {
                  "accessKeyId" : "AWS ACCESS KEY",
                  "secretAccessKey" : "AWS SECRET KEY",
                  "region" : "AWS REGION"
                }
              }
            },
            "properties" : { }
          }
        }
      },
      "inline_response_200_3" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          },
          "history" : {
            "type" : "object",
            "properties" : { }
          }
        }
      },
      "inline_response_200_4" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "boolean",
            "example" : true
          },
          "data" : {
            "type" : "object",
            "properties" : { }
          }
        }
      },
      "body_2" : {
        "type" : "object",
        "required" : [ "key_id" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "args" : {
            "type" : "object",
            "description" : "cloud update",
            "properties" : { }
          }
        }
      },
      "body_3" : {
        "type" : "object",
        "required" : [ "key_id" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "args" : {
            "type" : "object",
            "description" : "cloud create",
            "properties" : { }
          }
        }
      },
      "body_4" : {
        "type" : "object",
        "required" : [ "key_id" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "args" : {
            "type" : "object",
            "description" : "cloud create",
            "properties" : { }
          }
        }
      },
      "body_5" : {
        "type" : "object",
        "required" : [ "key_id" ],
        "properties" : {
          "key_id" : {
            "type" : "string",
            "example" : "key1",
            "description" : "key_id"
          },
          "args" : {
            "type" : "object",
            "description" : "cloud args",
            "properties" : { }
          }
        }
      }
    }
  },
  apis: []
});

module.exports = server => {
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}