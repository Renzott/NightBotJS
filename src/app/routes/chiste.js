var PastebinAPI = require("pastebin-js");

var pastebin = new PastebinAPI();

module.exports = app => {
  app.get("/chiste", (req, res) => {
    var index = req.query.id;

    pastebin
      .getPaste("mraanCwW")
      .then(function(data) {
        var jokes = data.split("\r\n");

        var jokesIndex = Math.floor(Math.random() * jokes.length + 1) - 1;

        console.log("Comando !chiste usado");
        if (index % 1 === 0) {
          if (index <= jokes.length && index > 0) {
            res.send(jokes[index - 1].slice(0, -1));
          } else {
            res.send("Te has pasado tres pueblos crack :^)");
          }
        } else {
          res.send(jokes[jokesIndex].slice(0, -1));
        }
      })
      .fail(function(err) {
        res.redirect("/");
        console.log(err);
      });
  });
};
