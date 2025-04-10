const express = require("express");
const { getRepository } = require("typeorm");
const { Producto } = require("../entity/Productos");
const { obtenerProductos, crearProductos, editarProductos, eliminarProductos } = require("../controller/productosController");

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de productos en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 */
router.get("/", obtenerProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a buscar.
 *     responses:
 *       200:
 *         description: Producto encontrado.
 *       404:
 *         description: Producto no encontrado.
 */
router.get("/:id", async (req, res) => {
  const producto = await getRepository(Producto).findOneBy({ id: req.params.id });
  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }
  res.json(producto);
});

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un producto
 *     description: Crea un nuevo producto en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               descripcion:
 *                 type: string
 *                 example: "modelo capacidad"
 *               marca:
 *                 type: string
 *                 example: "Juan perez"
 *               stock:
 *                 type: int
 *                 example: "123"
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 */
router.post("/", crearProductos);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Editar un producto
 *     description: Actualiza los datos de un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a editar.
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
router.put("/:id", editarProductos);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar.
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
router.delete("/:id", eliminarProductos);

module.exports = router;
