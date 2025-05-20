const { Router } = require("express");
const express = require("express");
const usuarioRoutes = require("./usuarios.routes");
const regionRoutes = require("./region.routes");
const historialRoutes = require("./historial.routes");
const authMiddleware = require("../util/auth");

const rutas_init = () => {
  const router = Router();

  //aca activamos que todas las rutas que esten aca dentro necesitarán token
  router.use(authMiddleware);

  router.use("/usuarios", usuarioRoutes);

  router.use("/regiones", regionRoutes);

  router.use("/historial", historialRoutes);

  return router;
};

module.exports = { rutas_init };
