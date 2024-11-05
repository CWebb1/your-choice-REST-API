import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';

//importing Routes
import characterRoute from "./routes/v1/characterRoute.js";
import inventoryRoute from "./routes/v1/inventoryRoute.js";
import equipmentRoute from "./routes/v1/equipmentRoute.js"

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