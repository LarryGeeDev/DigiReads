const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const { SECRET_KEY_SESSION } = require("./app.config");
const { getPortNo } = require("./helpers");
const { AUTHORS } = require("./routes/constants");
const router = require("./routes/authors");
const Server = require("./database/graphqlInit");
const dbInitialize = require("./database/mongoInit");

var app = express();
const PORT = process.env.PORT || getPortNo(process.argv);

/**
 * Set up all server context in this function
 * @param appInstance
 * @returns null
 */
function serverSetup() {
  // MIDDLEWARES
  app.use(morgan("dev"));
  app.use(
    cookieSession({
      name: "MyCookie",
      secret: SECRET_KEY_SESSION,
    })
  );

  // DB INIT
  dbInitialize()
    .then(() =>
      // GRAPHQL INIT
      Server.start().then(() => Server.applyMiddleware({ app }))
    )
    .catch((err) => console.error(err));

  return; // exit
}

serverSetup(app);

app.listen(PORT, console.log("We are live at: " + PORT));
