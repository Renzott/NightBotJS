var Twitter = require("twitter");
require("dotenv").config();

var client = new Twitter({
  consumer_key: process.env.API_TWIKEY_COk,
  consumer_secret: process.env.API_TWIKEY_COS,
  access_token_key: process.env.API_TWIKEY_Tkk,
  access_token_secret: process.env.API_TWIKEY_TKS
});

const update = (message, image) => {
  client.post("media/upload", { media: image }, (error, media, response) => {
    if (!error) {
      console.log(media);

      var status = {
        status: message,
        media_ids: media.media_id_string
      };

      client.post("statuses/update", status, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        } else {
          console.log(error);
        }
      });
    } else {
      console.log(error);
    }
  });
};

module.exports = update;
