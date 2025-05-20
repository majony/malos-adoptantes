const router = require("express").Router();
const express = require("express");
const historialController = require("../controllers/historial.controller");

router.get(
  "/listar-paginado/:cantReg/:page",
  historialController.listarPaginado
);
//router.get("/filter/:fechahora?/:modulo?", historialController.filterHistorial);
router.get("/filter", historialController.filterHistorial);
router.post("/crear", historialController.crear);

module.exports = router;
