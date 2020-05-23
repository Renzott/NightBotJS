const request = require("request");
const moment = require("moment");

var Task = require("../../model/boda");

module.exports = (app) => {
  app.get("/boda", (req, res) => {
    var url = "https://tmi.twitch.tv/group/user/keciyo/chatters";

    request(url, async (error, response, body) => {
      var json = JSON.parse(body).chatters;

      var user = req.query.u;
      var query = req.query.q;

      var users = [];

      for (var k in json) {
        for (var j in json[k]) {
          users.push(json[k][j]);
        }
      }

      if (query != undefined) {
        query = query.split(" ");
      } else {
        query = [];
      }

      if (query.length != 0 && query[0] != "") {
        console.log("------");
        var data = await Task.find({
          pareja: {
            $all: [query[0].toLowerCase()],
          },
        })
          .then((e) => {
            return e;
          })
          .catch(console.log);

        if (data.length == 0) {
          res.send(query + " esta suelt@ en plaza :)");
        } else {
          var pareja = data[0].pareja.filter(
            (e) => e != query[0].toLowerCase()
          )[0];
          res.send("💕💕 " + query[0] + " esta casad@ con " + pareja + " 💕💕");
        }
      } else {
        if (users.length >= 120) {
          var x = new moment();
          var y = new moment(app.get("moment"));

          var diff = moment.duration(x.diff(y)).as("seconds");

          //if (diff >= app.get("interval")) {
          if (true) {
            // Reniciar el moment
            //app.set("moment", moment());

            // 20 intentos para !boda
            var whileIndex = 0;

            while (true) {
              if (whileIndex == 20) {
                res.send(
                  "😭😭 La suerte no esta de nuestra parte, no hay boda esta vez 😭😭"
                );
                break;
              }

              var indexUser1 = Math.floor(Math.random() * users.length);

              var indexUser2 = Math.floor(Math.random() * users.length);

              var boda = {
                pareja: [users[indexUser1], users[indexUser2]],
                fecha: new moment(),
              };

              var data = await Task.find()
                .or([{ pareja: boda.pareja[0] }, { pareja: boda.pareja[1] }])
                .then((e) => {
                  return e;
                })
                .catch(console.log);

              if (data.length == 0 && indexUser1 != indexUser2) {
                var task = new Task(boda);

                await task.updateOne(boda, { upsert: true }).catch(console.log);

                res.send(
                  "💕💕💕 👰🏻 Hay una boda! 🤵 💕💕💕, los afortunado son: " +
                    users[indexUser1] +
                    " y " +
                    users[indexUser2] +
                    ", espero que sean muy felices 😍"
                );
                break;
              }
              whileIndex++;
            }
          } else {
            var minutesBefore = app.get("interval") - diff;
            var interval = moment
              .duration(minutesBefore, "seconds")
              .locale("es")
              .humanize(true);

            res.send(
              "💕💕 👰🏻 El comando estara disponible " + interval + " 🤵 💕💕"
            );
          }
        } else {
          // 120 viewers
          res.send(
            "Debe haber mas de 120 viewers en el directo para que el comando !boda funcione :)"
          );
        }
        //
      }
    });
  });
};
