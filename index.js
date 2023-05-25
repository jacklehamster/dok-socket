const express = require("express");
const { serveSocket } = require("./src/index")
require('colors');

const port = process.env.PORT ?? 3000;

const app = express();
const { server } = serveSocket(app);
const httpServer = server.listen(port, () =>
   console.log(`Listening on port`, `${port}`.green));

app.use(express.static(`${__dirname}`));
