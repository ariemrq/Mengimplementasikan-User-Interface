require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mainRouter = require("./src/routes");
const app = express();
const port = process.env.PORT
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const whitelist = process.env.CORS_ALLOW_LIST.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", mainRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
