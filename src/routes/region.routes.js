const router = require("express").Router();
const express = require("express");
const regionController = require("../controllers/region.controller");

router.get("/todas", regionController.listarRegiones);
router.get("/ciudades/:regionId", regionController.listarCiudades);
router.get("/comunas/:ciudadId", regionController.listarComunas);

module.exports = router;
