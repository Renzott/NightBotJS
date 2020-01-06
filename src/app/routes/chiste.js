var PastebinAPI = require('pastebin-js');

var pastebin = new PastebinAPI();

module.exports = app =>{

app.get('/chiste',(req,res) =>{

  pastebin.getPaste('mraanCwW').then(
  function (data) {
  // data contains the raw paste

  var jokes = data.split(";");

  var jokesIndex = Math.floor((Math.random() * jokes.length) + 1) -1;

  console.log('Comando !chiste usado');

  res.send(jokes[jokesIndex]);

})
.fail(function (err) {
  // Something went wrong
  res.redirect('/');
  console.log(err);
});

  });

};
