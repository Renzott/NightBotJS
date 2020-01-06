module.exports = app => {

  app.get('/amor',(req,res)=>{

  var option = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

	var love = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

  //var user = req.params.user;

	var sentence = null;


	switch(option){

		case 1:
				sentence = ", te quiero un " + love + "%";
				break;
		case 2:
				sentence = ", te odio un " + love + "%";
				break;
		case 3:
				sentence = ", te detesto un " + love + "%";
				break;
		case 4:
				sentence = ", Keciyo! te ama un " + love + "%";
				break;
		case 5:
				sentence = ", Keciyo! te odia un " + love + "%";
				break;
		case 6:
				sentence = ", nadie te quiere :)";
				break;
		default:
				sentence = ", ahora no" ;
				break;
	}

  console.log('Comando !amor usado');

  res.send(sentence);
  
  });

};
