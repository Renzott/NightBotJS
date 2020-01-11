var request = require("request");
var update = require("../../config/twitter.js");

module.exports = app => {
  app.get("/twitter", (req, res) => {
    var clientID = process.env.API_TW_KEY;
    var Url = "https://api.twitch.tv/helix/videos?user_id=133161955";

    console.log(Url);

    var header = {
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
        var data = JSON.parse(body).data;
        var dataSize = Object.keys(data).length;

        var now = new Date();
        var date = new Date();

        if (dataSize != 0) {
          date = new Date(data[0].published_at);
        } else {
          date = new Date("12/10/19 12:33:00");
        }
        update(date);
        console.log(date);
        var time = timeDifference(now, date);
        console.log(time);

        res.status(200).send(time.toString());
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

  //var secondsDifference = Math.floor(difference / 1000);

  return daysDifference;
}
