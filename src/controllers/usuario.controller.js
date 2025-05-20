const db = require("../database/mysql");
const respuesta = require("../util/respuestasApi");

const listar = async (req, res) => {
  try {
    const resultado = await db.todos("usuario");
    res.json(resultado);
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const uno = async (req, res) => {
  try {
    const resultado = await db.uno("usuario", req.params.rut);
    if (resultado.length) {
      respuesta.success(req, res, resultado, 200);
    } else {
      respuesta.error(req, res, "Usuario no encontrado", 400);
    }
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const crear = async (req, res) => {
  try {
    //console.log("req: " + JSON.stringify(req.body));
    const resultado = await db.crear("usuario", req.body);
    if (resultado) {
      respuesta.success(req, res, resultado, 200);
    } else {
      respuesta.error(req, res, "Error al crear el registro", 400);
    }
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const modificar = async (req, res) => {
  try {
    //console.log("req: " + JSON.stringify(req.body));

    const resultado = await db.modificar("usuario", req.body);

    console.log("resultado: " + resultado);

    if (resultado) {
      respuesta.success(req, res, resultado, 200);
    } else {
      respuesta.error(req, res, "Error al modificar el registro", 400);
    }
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const eliminar = async () => {};

module.exports = { listar, crear, eliminar, uno, modificar };
