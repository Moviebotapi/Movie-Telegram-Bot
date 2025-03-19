var TelegramBot= require('node-telegram-bot-api')
const axios = require('axios');
const cheerio = require('cheerio');


token="YOUR_TELEGRAM_BOT_TOKEN"  //token obtained from bot father
var bot= new TelegramBot(token, {polling:true});
bot.on("polling_error", (err) => console.log(err));

var reques=require('request')

bot.onText(/\/movie (.+)/,function(msg,match){
    var movie= match[1];
    var chatId=msg.chat.id
    //reques('http://www.omdbapi.com/?t='+movie+'&apikey=YOUR_OMDB_KEY',function(error,response,body){
		
		//key obtained from omdbapi

      const url = `${movie}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const title = $("div.banners-right > h1").text().trim();
      const imdb = $("div.jws-imdb").text().trim();
      const desc = $("div.description").text().trim(); // Changed selector to something more likely for description
      const year = $("span.video-years").text().trim();
      const duration = $("span.video-time").text().trim();
      const type1 = $("div.jws-category > a:nth-child(1)").text().trim();
      const type2 = $("div.jws-category > a:nth-child(2)").text().trim();
      const type3 = $("div.jws-category > a:nth-child(3)").text().trim();
      const image = $("div.jws-images > img").attr('src');

      const type = `${type1} | ${type2} | ${type3}`;

	
		if(!error && response.statusCode==200)
        {
            bot.sendMessage(chatId,'_Looking for_ '+movie+'...',{parse_mode: "Markdown"})
            .then(msg)
            {
                res=JSON.parse(body)
                bot.sendPhoto(chatId, image, {caption: 'Result:\nTitle: '+ title +'\nGenre: '+ type +'\nRated: '+ imdb+ '\nReleased: '+ year})
            }
        }
  //  })

})
