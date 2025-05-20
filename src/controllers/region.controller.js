const db = require("../database/mysql");
const respuesta = require("../util/respuestasApi");

const listarRegiones = async (req, res) => {
  try {
    const resultado = await db.todos("region");
    respuesta.success(req, res, resultado, 200);
    //res.json(resultado);
  } catch (err) {
    console.error(err);
  }
};

const listarCiudades = async (req, res) => {
  try {
    const resultado = await db.filter(
      "ciudad",
      "id_region",
      req.params.regionId
    );
    respuesta.success(req, res, resultado, 200);
  } catch (err) {
    console.error(err);
  }
};

const listarComunas = async (req, res) => {
  try {
    const resultado = await db.filter(
      "comuna",
      "id_ciudad",
      req.params.ciudadId
    );
    respuesta.success(req, res, resultado, 200);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { listarRegiones, listarCiudades, listarComunas };
