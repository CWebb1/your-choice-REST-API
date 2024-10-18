import express from "express"; //Imports the express module
import indexRoutes from "./routes/index.js"; //Imports the index module
import raceRoutes from "./routes/race.js"; //imports races module
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Use the PORT environment variable or 3000

// Use the routes module
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Baldurs Gate 3 API",
      version: "1.0.0",
      description: "API",
      contact: {
        name: "Connell Webb",
      },
    },
    servers: [
      {
        url: "https://your-choice-rest-api.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/", indexRoutes);
app.use("/api/races", raceRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;
