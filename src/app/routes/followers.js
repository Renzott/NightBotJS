module.exports = app =>{

app.get('/followers',(req,res) =>{

    res.render('followers/followers.ejs');

  });

};


/*const request = require('request');


module.exports = app =>{

app.get('/followers',(req,res) =>{
	
	function request() {
	(async function(){
	
	request('https://webapi.streamcraft.com/live/room/anchorinfo?uin=2016230580',(err,res,body) => {
		
		if(!err && res.statusCode == 200){
			
			var obj = JSON.parse(body);
			
			res.send('Keciyo Follow:',obj.data.user.fan_num);			
			
		};
		
	});
	})();
setInterval(request, 6000);
    };

	
	
  });

	};*/



