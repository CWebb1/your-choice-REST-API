import express from "express";
import indexRoutes from "./routes/index.js";
import raceRoutes from "./routes/race.js";
import weaponRoutes from "./routes/weapon.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';

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
  apis: ["./src/routes/*.js", "./routes/*.js"], // Add both potential paths
};

// Create Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec, { explorer: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use("/", indexRoutes);
app.use("/api/races", raceRoutes);
app.use("/api/weapons", weaponRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}/api-docs for documentation`
  );
});

export default app;