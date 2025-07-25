import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Upload Microservice API",
      version: "1.0.0",
      description: "API documentation for the file upload microservice",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true, // Enables the "Authorize" and "Try it out" buttons
      swaggerOptions: {
        persistAuthorization: true, // Keeps API key after page reload
        supportedSubmitMethods: ["get", "post", "put", "delete", "patch", "head", "options", "trace"],
      },
    })
  );
}
