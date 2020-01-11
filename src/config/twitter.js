var Twitter = require("twitter");
require("dotenv").config();

var client = new Twitter({
  consumer_key: process.env.API_TWIKEY_COk,
  consumer_secret: process.env.API_TWIKEY_COS,
  access_token_key: process.env.API_TWIKEY_Tkk,
  access_token_secret: process.env.API_TWIKEY_TKS
});

console.log(client);

const update = message => {
  client.post(
    "statuses/update",
    { status: message },
    (error, tweet, response) => {
      if (!error) {
        console.log(tweet);
      } else {
        console.log(error);
      }
    }
  );
};

module.exports = update;
