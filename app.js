import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';

//importing Routes
import characterRoute from "./routes/v1/characterRoute.js";
import inventoryRoute from "./routes/v1/inventoryRoute.js";
import equipmentRoute from "./routes/v1/equipmentRoute.js";
import raceRoute from "./routes/v1/raceRoute.js";
import classRoute from "./routes/v1/classRoute.js";
import spellRoute from "./routes/v1/spellRoute.js";
import learnedspellRoute from "./routes/v1/learnedspellRoute.js";
import weaponRoute from "./routes/v1/weaponRoute.js";
import itemRoute from "./routes/v1/itemRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Order is important!
app.use(cors()); // Enable CORS for all routes
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
        url: `http://localhost:${PORT}`,  // Add local development server
        description: "Development Server"
      },
      {
        url: "https://your-choice-rest-api.onrender.com",
        description: "Production Server"
      }
    ],
  },
  apis: ["./src/routes/v1/*.js", "./routes/v1/*.js"], // Add both potential paths
};

// Create Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use("/api/v1/characters", characterRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/equipment", equipmentRoute);
app.use("/api/v1/races", raceRoute);
app.use("/api/v1/classes", classRoute);
app.use("/api/v1/spells", spellRoute);
app.use("/api/v1/learnedspells", learnedspellRoute);
app.use("/api/v1/weapons", weaponRoute);
app.use("/api/v1/items", itemRoute);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'The requested resource was not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}/api-docs for documentation`
  );
});

export default app;