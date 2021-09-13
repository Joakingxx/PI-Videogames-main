const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreControllers = require("../controllers/Genre");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", genreControllers.getAll);
router.get("/:id", genreControllers.getByID);
router.post("/", genreControllers.create);
router.put("/:id", genreControllers.update);
router.delete("/:id", genreControllers.delete);

module.exports = router;
