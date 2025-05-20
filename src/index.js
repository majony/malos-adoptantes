const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const globalConstant = require("./const/globalConstant");
const routerConfig = require("./routes/index.routes");

const jwt = require("jsonwebtoken");
const privateRoutes = require("./routes/index.routes");

const SECRET_KEY = globalConstant.SECRET_KEY;

const configuracionRouter = (app) => {
  app.use("/malos-adoptantes/api/", routerConfig.rutas_init());
};

const configuracionApi = (app) => {
  app.use(
    cors({
      origin: ["127.0.0.1:5001"],
    })
  );
  app.use(morgan("dev"));
  app.use(express.json());
};

const app = express();

const init = () => {
  app.listen(globalConstant.PORTAPP);
  console.log("Iniciado en puerto: " + globalConstant.PORTAPP);
  configuracionApi(app);
  configuracionRouter(app);
};

init();

// Ruta pública para generar el token
app.post("/malos-adoptantes/token", (req, res) => {
  const { username, password } = req.body;

  if (
    username === globalConstant.USERNAME_TOKEN &&
    password === globalConstant.PASSWORD_TOKEN
  ) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
});
