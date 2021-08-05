const Discord =require("discord.js")
const  axios = require('axios')
require("dotenv").config()

const client = new Discord.Client({
    //partials: ["MESSAGE"]
})

client.on('ready', ()=>
{    
    console.log("Bot is running");
}); 

client.on('message', msg => {
  var x = msg.content

  if(x[0]===process.env.PREFIX)
  {      
        let command = x.substring(1, 5);
        let city = x.substring(6);
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`

        async function sendGetRequest()
        {

          try 
          {
            if(command==='help')
            {
              msg.channel.send('I will write docs after some time'); 
            }
            else {
              let weather = await axios.get(url);
              // console.error(weather.data);
              const value = weather.data;
              if(value)
                { 
                  if(command==='temp'){
                      let wth = `It's ${value.main.temp} degrees in ${value.name}!`;
                      msg.channel.send(wth);  
                    }

                  else if(command==='hmid'){
                    let wth = `It's ${value.main.humidity} % humidity in ${value.name}!`;
                    msg.channel.send(wth);  
                  }

                  else if(command==='cord'){
                    let wth = `The coordinate of ${value.name} is Longitude: ${value.coord.lon} ,Latitude ${value.coord.lat}.`;
                    msg.channel.send(wth); 
                  }

                  else if(command==='wind'){
                    let wth = `Wind Speed is ${(value.wind.speed*3.6).toFixed(2)} Km/h blowing at ${value.wind.deg}° Degree in ${value.name}!.`;
                    msg.channel.send(wth); 
                  }

                  else if(command==='wthr'){
                    let img = `https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
                    msg.channel.send(`Today's Weather in ${value.name}:  `+ value.weather[0].main+' ( '+value.weather[0].description +' ) ' ).then( msg.channel.send(img));
                  }

                  else if(command==='tomr'){
                    let url2  = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`
                    let w2 = await axios.get(url2);

                    let img2 = `https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
                    msg.channel.send(`Tommorow's Weather in ${w2.data.city.name}: `+ w2.data.list[8].weather[0].main+' ( '+w2.data.list[8].weather[0].description +' ) ' ).then( msg.channel.send(img2));

                  }

                  else if(command==='twin'){
                    let url2  = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`
                    let w2 = await axios.get(url2);
                    msg.channel.send(`Tommorow's Wind Speed will be ${(w2.data.list[8].wind.speed*3.6).toFixed(2)} Km/h blowing at ${w2.data.list[8].wind.deg}° Degree in ${w2.data.city.name}!.` )

                  }

                  else if(command==='ttem'){
                    let url2  = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`
                    let w2 = await axios.get(url2);
                    msg.channel.send(`Tommorrow temperature will be ${w2.data.list[8].main.temp} degrees in ${w2.data.city.name}!`)
                  }

                  else{
                    msg.channel.send("Command Not Found"); 
                  }
              }

            }
          } catch (err) 
          {
              console.error(err.message);
              msg.channel.send("Please give valid City Name!"); 
              
          }
        }
      sendGetRequest();
  }
});

client.login(process.env.BOT_TOKEN)

