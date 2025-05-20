const mysql = require("promise-mysql");
const globalConstant = require("../const/globalConstant");

let conexion;

conMysql = async () => {
  try {
    conexion = await mysql.createConnection({
      host: globalConstant.HOST,
      database: globalConstant.DATABASE,
      user: globalConstant.USER,
      password: globalConstant.PASSWORD,
    });

    console.log("Conectado a la base de datos correctamente.");
  } catch (err) {
    console.error("Error al conectarse a la base de datos: " + err);
  }
};

conMysql();

const todos = async (tabla) => {
  try {
    if (!conexion) {
      await conMysql();
    }
    const result = await conexion.query(`SELECT * FROM ${tabla}`);
    console.log("r:" + result);
    return result;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const todosPaginado = async (tabla, registrosPorPagina, pagina) => {
  try {
    if (!conexion) {
      await conMysql();
    }
    const offset = pagina == 1 ? 0 : (pagina - 1) * registrosPorPagina;
    const limit = registrosPorPagina;

    console.log("offset: " + offset + "  limit: " + limit);

    const cantidad = await conexion.query(
      `SELECT COUNT(*) as total FROM ${tabla} `
    );

    let result = await conexion.query(
      `SELECT * FROM ${tabla} LIMIT ${limit} OFFSET ${offset}`
    );

    let objResult = {
      cantidadTotalRegistros: cantidad[0].total,
      pagina: pagina,
      cantidadPorPagina: limit,
      resultado: result,
    };

    console.log("r:" + objResult);
    return objResult;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const uno = async (tabla, id) => {
  try {
    if (!conexion) {
      await conMysql();
    }

    let result;
    if (tabla === "usuario") {
      result = await conexion.query(
        `SELECT * FROM ${tabla} WHERE rut = '${id}'`
      );
    } else {
      result = await conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`);
    }
    return result;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const filter = async (tabla, field, filter) => {
  try {
    if (!conexion) {
      await conMysql();
    }
    const result = await conexion.query(
      `SELECT * FROM ${tabla} WHERE ${field} = ${filter}`
    );
    return result;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const filterHistorial = async (fechaHora, modulo) => {
  try {
    if (!conexion) {
      await conMysql();
    }

    let query = "`SELECT * FROM historial WHERE 1 = 1";

    if (fechaHora) {
      query += `AND fecha_hora = ${fechaHora}`;
    }

    if (modulo) {
      query += `AND modulo = ${modulo}`;
    }

    const result = await conexion.query(query);
    return result;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const crear = async (tabla, data) => {
  try {
    if (!conexion) {
      await conMysql();
    }
    return await conexion.query(`INSERT INTO ${tabla} SET ?`, data);
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

const modificar = async (tabla, data) => {
  try {
    if (!conexion) {
      await conMysql();
    }
    let result;
    if (tabla === "usuario") {
      result = await conexion.query(`UPDATE ${tabla} SET ? WHERE rut = ?`, [
        data,
        data.rut,
      ]);
    } else {
      result = await conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [
        data,
        data.id,
      ]);
    }
    return result;
  } catch (err) {
    console.error("Error en la consulta todos: " + err);
    return err;
  }
};

module.exports = {
  todos,
  uno,
  filter,
  crear,
  modificar,
  todosPaginado,
  filterHistorial,
};
