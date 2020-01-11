var update = require("../config/twitter.js");
var image = require("fs").readFileSync("src/scheduler/image.gif");
var request = require("request");

const mongoose = require("mongoose");

const uriMongo = process.env.MONGODB_URI;

mongoose
  .connect(uriMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log("db connect..."))
  .catch(err => console.log(err));

var Task = require("../model/task");

/* ------------ */

const getTwitchData = async () => {
  var clientID = process.env.API_TW_KEY;
  var Url = "https://api.twitch.tv/helix/videos?user_id=133161955";

  console.log(Url);

  var header = {
    Accept: "application/vnd.twitchtv.v5+json",
    "Client-ID": clientID
  };

  return new Promise((resolve, reject) => {
    request(
      {
        method: "get",
        url: Url,
        headers: header
      },
      (error, response, body) => {
        var data = JSON.parse(body).data;
        var task = null;
        if (data) var dataSize = Object.keys(data).length;
        if (dataSize)
          task = {
            idStream: data[0].id,
            title: data[0].title,
            date: {
              initDate: data[0].published_at,
              updateDate: data[0].published_at
            },
            thumb: data[0].thumbnail_url,
            duration: data[0].duration
          };

        resolve(task);
      }
    );
  });
};

function timeDifference(date1, date2) {
  if (date1 > date2) {
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

getTwitchData().then(async data => {
  //var task = new Task(data);
  //await task.save();
  var tasks = await Task.find()
    .sort({ _id: -1 })
    .limit(10);
  var lastStream = tasks[0];
  data = null;
  if (data) {
    if (lastStream) {
      console.log(data);
      var actualDate = new Date(data.date.initDate);
      var lastDate = new Date(lastStream.date.initDate);

      var diff = timeDifference(actualDate, lastDate);

      var timecompact = Object.values(diff).reduce((total, actual) => {
        return total + actual;
      });
      if (timecompact) {
        var task = new Task(data);
        await task
          .save()
          .then(saveTask => console.log("nuevo task: " + saveTask._id));
      } else {
        var dateTemp = new Date();
        data.date.updateDate = dateTemp.toISOString();
        await Task.updateOne({ _id: lastStream._id }, data).then(
          console.log("update task: " + lastStream._id)
        );
      }
    } else {
      console.log("mongodb vacio");
      var task = new Task(data);
      await task
        .save()
        .then(saveTask => console.log("nuevo task: " + saveTask._id));
    }
  } else {
    console.log("Twitch vods Vacio");

    var dateTemp = new Date();
    lastStream.date.updateDate = dateTemp.toISOString();
    await Task.updateOne({ _id: lastStream._id }, lastStream).then(
      console.log("update task: " + lastStream._id)
    );
  }

  var image = require("fs").readFileSync("src/scheduler/image.gif");

  var twitterDate = () => {
    var jsonDate = [];

    var localDate = new Date();
    var lastTaskDate = new Date(lastStream.date.initDate);

    var diff = timeDifference(lastTaskDate, localDate);

    if (diff.years != 0) {
      if (diff.years == 1) jsonDate.push("un año");
      jsonDate.push(diff.years + " años");
    }

    if (diff.months != 0) {
      if (diff.months == 1) jsonDate.push("un mes");
      jsonDate.push(diff.months + " meses");
    }

    if (diff.days != 0) {
      if (diff.days == 1) jsonDate.push("un dia");
      jsonDate.push(diff.days + " dias");
    }

    if (diff.hours != 0) {
      if (diff.hours == 1) jsonDate.push("una hora");
      jsonDate.push(diff.hours + " horas");
    }

    var indexJSON = Object.keys(jsonDate).length;

    if (indexJSON == 1) {
      return jsonDate.toString();
    } else {
      var saveDataJSON = jsonDate[indexJSON - 1];
      jsonDate[indexJSON - 1] = "y";
      jsonDate[indexJSON] = saveDataJSON;
    }
    return jsonDate.toString().replace(/,/g, " ");
  };

  var status =
    "Ultimo Directo: " +
    twitterDate() +
    "\r\n\r\nTitulo: " +
    lastStream.title +
    "\r\nDuracion: " +
    lastStream.duration +
    "\r\n\r\nHaz directo meco :)\r\n\r\n@MrKeciyo";

  update(status, image);

  mongoose.connection.close();
});
