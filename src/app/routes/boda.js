const request = require("request");

module.exports = (app) => {
  app.get("/boda", (req, res) => {
    var url = "https://tmi.twitch.tv/group/user/keciyo/chatters";

    request(url, (error, response, body) => {
      var json = JSON.parse(body).chatters;

      var users = [];

      for (var k in json) {
        for (var j in json[k]) {
          users.push(json[k][j]);
        }
      }

      var indexUser1 = Math.floor(Math.random() * users.length);

      var indexUser2 = Math.floor(Math.random() * users.length);

      res.send(
        "💕💕💕 👰🏻 Hay una boda! 🤵 💕💕💕, los afortunado son: " +
          users[indexUser1] +
          " y " +
          users[indexUser2] +
          ", espero que sean muy felices 😍"
      );
    });
  });
};
