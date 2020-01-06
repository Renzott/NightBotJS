var validator = require("validator");

module.exports = app => {
  app.get("/name", (req, res) => {
    var user = req.query.user;

    var sentence = "asdxcv" + user;

    console.log("Comando !name usado");

    var re = /^([a-z0-9]{5,})$/;
    /*validator.matches(user, /^([a-z0-9]{5,})$/i)*/
    if (re.test(user)) {
      console.log("Valid" + user);
    } else {
      console.log("Invalid" + user);
    }

    res.send(sentence);
  });
};
