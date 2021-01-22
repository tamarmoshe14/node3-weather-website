const request = require("postman-request");

const forecast = (lat, long, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=c2504b9cc21d4c834eb243a19e227647&query=" + long + "," + lat + "&units=m";
    request({url, json: true},(error, {body})=>{
        if (error){
            callback("unable to connect to weather app.", undefined)
        }else if(body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%.`);
        }
    })
}

module.exports = forecast;