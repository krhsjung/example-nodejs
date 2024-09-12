import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import json from "../package.json" assert { type: "json" };
import { AuthSchema, UserSchema, SwaggerResponseExample } from "lib";

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js example server',
    version: json.version,
  },
  servers: [{
    url: 'https://hsjung.asuscomm.com/nodejs',
  }],
  components: {
    schemas: {
      ...AuthSchema.schemas,
      ...UserSchema.schemas,
    },
    parameters: {
      ...UserSchema.parameters
    },
    examples: {
      ...SwaggerResponseExample
    }  
  }
  // Sample to select variable in url
  // servers: [{
  //   url: '{protocol}://hsjung.asuscomm.com/nodejs',
  //   variables: {
  //     protocol: {
  //       enum: ['http', 'https'],
  //       default: 'https'
  //     }
  //   }
  // }],
};

const apis = ['./src/routes/**/*.js'];

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition,
  apis, // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

export { swaggerUi, openapiSpecification }