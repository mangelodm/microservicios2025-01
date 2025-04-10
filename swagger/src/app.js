require("dotenv").config();
const express = require("express");

const connectDB = require("./database");
const productosRoutes = require("./routes/productosRoutes");
const clientesRoutes = require("./routes/clientesRoutes");
const facturasRoutes = require("./routes/facturasRoutes");
const gesfacturasRoutes = require("./routes/gesfacturasRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const path = require("path")

// Configuración de middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir rutas
app.use("/productos", productosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/facturas", facturasRoutes);
app.use("/gesfacturas", gesfacturasRoutes);

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios",
      version: "1.0.0",
      description: "Documentación de la API de Usuarios con Node.js y TypeORM",
    },
    servers: [{ url: "http://localhost:3000", description: "Servidor Local" }],
  },
  apis: [path.join(__dirname, "routes/*.js")]
  //apis: ["./routes/*.js"], // Cargar todas las rutas
};
console.log(swaggerOptions);
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", (req, res) => {
  res.send("Bienvenido a la página principal!!");
});
// Iniciar servidor
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📄 Swagger en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
