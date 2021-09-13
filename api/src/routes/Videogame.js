const { Router } = require("express");

// const { noExtendLeft } = require("sequelize/types/lib/operators");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogameControllers = require("../controllers/Videogame");
const router = Router();

// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);
router.get("/", videogameControllers.getAll);

router.get("/:id", videogameControllers.getByID);

router.post("/", videogameControllers.create);

router.put("/:id", videogameControllers.update);

router.delete("/:id", videogameControllers.delete);

module.exports = router;
