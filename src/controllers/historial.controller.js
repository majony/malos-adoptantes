const db = require("../database/mysql");
const respuesta = require("../util/respuestasApi");

const listarPaginado = async (req, res) => {
  try {
    const { cantReg, page } = req.params;
    console.log(cantReg + " " + page);
    const resultado = await db.todosPaginado("historial", cantReg, page);
    respuesta.success(req, res, resultado, 200);
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const filterHistorial = async (req, res) => {
  try {
    //const resultado = await db.uno("usuario", req.params.rut);
    const { fechahora, modulo } = req.params;
    const resultado = await db.filterHistorial(fechahora, modulo);

    if (resultado.length) {
      respuesta.success(req, res, resultado, 200);
    } else {
      respuesta.error(req, res, "Historial no encontrado", 400);
    }
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const crear = async (req, res) => {
  try {
    const resultado = await db.crear("historial", req.body);
    if (resultado) {
      respuesta.success(req, res, resultado, 200);
    } else {
      respuesta.error(req, res, "Error al crear el historial", 400);
    }
  } catch (err) {
    console.error(err);
    respuesta.error(req, res, err, 400);
  }
};

const eliminar = async () => {};

module.exports = { crear, eliminar, filterHistorial, listarPaginado };
