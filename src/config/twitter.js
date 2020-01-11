var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.API_TWIKEY_COk,
  consumer_secret: process.env.API_TWIKEY_COS,
  access_token_key: process.env.API_TWIKEY_Tkk,
  access_token_secret: process.env.API_TWIKEY_TKS
});

const update = message => {
  client
    .post("statuses/update", { status: message })
    .then(function(tweet) {
      console.log(tweet);
    })
    .catch(function(error) {
      throw error;
    });
};

module.exports = update;
