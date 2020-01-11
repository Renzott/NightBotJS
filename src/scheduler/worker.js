var update = require("../config/twitter.js");

var image = require("fs").readFileSync("src/scheduler/image.gif");

update("Oh no @renzot_123 \r\n" + new Date(), image);

console.log("Tiempo!!!");
