var request = require("request");

module.exports = app => {
  app.get("/followage", (req, res) => {
    var user = req.query.user;

    var IDs = [];

    var clientID = process.env.API_TW_KEY;
    var Url = "https://api.twitch.tv/kraken/users?login=Keciyo," + user;

    console.log(Url);

    var header = {
      "Content-Type": "application/json",
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": clientID
    };

    request(
      {
        method: "get",
        url: Url,
        headers: header
      },
      (error, response, body) => {
        var data = JSON.parse(body).users;

        IDs[0] = data[0]._id;
        IDs[1] = data[1]._id;

        Url =
          "https://api.twitch.tv/kraken/users/" +
          IDs[1] +
          "/follows/channels/" +
          IDs[0];

        request(
          {
            method: "get",
            url: Url,
            headers: header
          },
          (error, response, body) => {
            data = JSON.parse(body).created_at;

            var now = new Date();
            var date = new Date(data);

            var time = timeDifference(now, date);
            var text = "Rafowos Boomer 🤣🤣👌👌";
            res.send(text);
          }
        );
      }
    );
  });
};

function timeDifference(date1, date2) {
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  return (
    "Llevas siguiendo a Keciyo " +
    daysDifference +
    " dia/s " +
    hoursDifference +
    " hora/s " +
    minutesDifference +
    " minuto/s y " +
    secondsDifference +
    " segundo/s "
  );
}
