const express = require("express");
const config = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const fileUpload = require("express-fileupload");
require("dotenv").config();
var multer = require("multer");
var upload = multer();

const app = express();
config.__db_conect();

app.use(cors());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// app.use(upload.array());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// This will set express to render our views folder, then to render the files as normal html
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.use(express.static(path.join(__dirname, './views')));

const socket = require("socket.io");

// API Prefix Config
const prefix = `/${process.env.APPNAME}`;

// this is a jenkins  test

app.get(prefix, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Include all routes
fs.readdir("./routes", (err, files) => {
  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  // Socket connection
  const io = socket(server, {
    cors: {
      origins: ["http://192.168.108.41:3000", "http://localhost:3003"],
    },
  });
  // const io = socket(server, { cors: { methods: ["GET", "PATCH", "POST", "PUT"], origin: true } });
  app.set("socketio", io);

  app.use((req, res, next) => {
    req.io = io;
    return next();
  });

  const { socketRoute } = require("./routes/socket");
  var routes = socketRoute(io);
  app.use(routes);

  if (err) throw Error("Error Reading File");
  for (let file of files) {
    const filename = String(file).split(".")[0];
    if (filename === "socket") continue;
    app.use(`${prefix}/${filename}`, require(`./routes/${filename}`));
  }

  // Error Handle under the Route
  app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

  app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  });
});
