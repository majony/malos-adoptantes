const router = require("express").Router();
const usuarioController = require("../controllers/usuario.controller");

router.get("/todos", usuarioController.listar);

router.get("/uno/:rut", usuarioController.uno);

router.post("/crear", usuarioController.crear);

router.post("/modificar", usuarioController.modificar);

module.exports = router;
