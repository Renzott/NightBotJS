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
        console.log(date);
        var time = timeDifference(date, now);
        console.log(time);

        res.status(200).send("Pagina en Construccion :)");
      }
    );
  });
};

function timeDifference(date1, date2) {
  if (date1 > date2) {
    // swap
    var result = timeDifference(date2, date1);
    result.years = -result.years;
    result.months = -result.months;
    result.days = -result.days;
    result.hours = -result.hours;
    return result;
  }
  result = {
    years: date2.getYear() - date1.getYear(),
    months: date2.getMonth() - date1.getMonth(),
    days: date2.getDate() - date1.getDate(),
    hours: date2.getHours() - date1.getHours()
  };
  if (result.hours < 0) {
    result.days--;
    result.hours += 24;
  }
  if (result.days < 0) {
    result.months--;
    // days = days left in date1's month,
    //   plus days that have passed in date2's month
    var copy1 = new Date(date1.getTime());
    copy1.setDate(32);
    result.days = 32 - date1.getDate() - copy1.getDate() + date2.getDate();
  }
  if (result.months < 0) {
    result.years--;
    result.months += 12;
  }
  return result;
}
