const app = require("./config/server");

require("./app/routes/principal")(app);
require("./app/routes/amor")(app);
require("./app/routes/chiste")(app);
require("./app/routes/name")(app);
require("./app/routes/followers")(app);
require("./app/routes/apiSC")(app);
require("./app/routes/chatbot")(app);
require("./app/routes/video")(app);
require("./app/routes/followage")(app);
require("./app/routes/twitter")(app);

app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
