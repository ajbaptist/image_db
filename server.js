const express = require("express");

require("./config/database.js")();

const collection = require("./routes/collectionRoutes.js");

const subCollection = require("./routes/subCollectionRoutes.js");


var bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// parse json to use in all requests got or sent by router .. which is provided by express
// Add middleware/settings/routes to express.
// Update CORS configuration to allow requests from the production domain
app.use(cors({}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',collection)

app.use('/api',subCollection)

app.use((_req, _res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
