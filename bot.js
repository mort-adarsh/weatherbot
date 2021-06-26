let request = require('request');

let apiKey = 'cdb316f2617159d63f4d358795568ba3';


require("dotenv").config()
const Discord =require("discord.js")

const client = new Discord.Client({
    partials: ["MESSAGE"]
})

client.on('ready', ()=>
{    
    console.log("Bot is running");
}); 

client.on('message', msg => {
let city = msg;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
          console.log('error:', error);
        } else {
          let weather = JSON.parse(body)
          let wth = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          msg.channel.send(wth);
        }
      });


});

client.login(process.env.BOT_TOKEN)

