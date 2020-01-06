var request = require("request");

module.exports = app => {
  app.get("/video", (req, res) => {
    var data = "";

    var options = {
      url: "https://www.googleapis.com/youtube/v3/search",
      headers: { "content-type": "application/json" },
      method: "GET",
      qs: {
        part: "snippet",
        channelId: "UCoOfqvtbaQIqlKdiXxDDYPA",
        maxResults: "10",
        order: "date",
        type: "video",
        key: process.env.API_YT_KEY
      }
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body)["items"][0];

        /*Format Date*/
        var monthNames = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Setiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ];

        var date = new Date(json["snippet"]["publishedAt"]);

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var fecha = day + " de " + monthNames[monthIndex] + " del " + year;
        /*------------*/

        var mensaje =
          "Mira mi ultimo video :D '" +
          json["snippet"]["title"] +
          "': " +
          "http://y2u.be/" +
          json["id"]["videoId"] +
          " Fecha de Subida: " +
          fecha;

        res.send(mensaje);
      } else {
        res.send("Ha sucedido un error D:");
      }
    });
  });
};
