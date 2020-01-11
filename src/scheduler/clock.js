var CronJob = require("cron").CronJob;
var bot = require("./bot.js");

var job = new CronJob({
  cronTime: "0 * * ? * *", // everyday, 9:13, 11:13, 4:13, 8:13,
  onTick: bot.start(),
  start: true,
  timeZone: "America/Los_Angeles"
});

job.start();
