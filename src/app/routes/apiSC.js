
const request = require('request');
var PastebinAPI = require('pastebin-js');
var pastebin = new PastebinAPI();

module.exports = app =>{

app.get('/api',(req,rest) =>{
	
	
	request('https://webapi.streamcraft.com/live/room/anchorinfo?uin=2016230580',(err,res,body) => {
		
		if(!err && res.statusCode == 200){
			
            var obj = JSON.parse(body);
            
            pastebin.getPaste('Zn24sw4h').then(
			
                function (data) {
					
					var fan_num = obj.data.user.fan_num;
					
					var intervalo = 50;

					var meta = (parseInt((fan_num)/intervalo) * intervalo) + intervalo;

                    if(data == '$$')
                        rest.send('Keciyo Follow: ' + fan_num);	
                    else{
						
						var replace = "null";
						
						var mapObj = {
							'@s': fan_num,
							'@l': "<br>",
							'@m': meta
						};
                        
						var indexFollow = data.search("@s");
						var indexLine = data.search("@l");
						var indexMeta = data.search("@m");
						
						if(indexFollow != -1 || indexLine != -1 || indexMeta != -1){
							
							replace = data.replace(/@s|@l|@m/gi,function(matched){
								return mapObj[matched];
							});
							
						}
			
						if(replace != "null"){
							
							rest.send(replace);
							
						}else{
							rest.send(data);
						}
					}
        }).fail(function (err) {
          // Something went wrong
          rest.send('...');
          console.log(err);
        });


		};
		
	});
	
	
  });

};