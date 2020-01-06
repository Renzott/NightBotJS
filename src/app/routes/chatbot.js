var request = require("request");

module.exports = app => {
  app.get("/chatbot", (req, res) => {
    var msg = req.query.msg;

    if (!msg) msg = "Hola";

    var accessToken = process.env.API_AI_KEY;
    var baseUrl = "https://api.api.ai/v1/";

    var headersOpt = {
      "content-type": "application/json",
      Authorization: "Bearer " + accessToken
    };
    request(
      {
        method: "post",
        url: baseUrl + "query?v=20180101",
        headers: headersOpt,
        json: {
          contexts: ["shop"],
          lang: "es",
          query: msg,
          sessionId: "something"
        }
      },
      function(error, response, body) {
        res.send(body.result.fulfillment.speech);
      }
    );
  });
};
