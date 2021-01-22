const request = require('postman-request');

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGFtYXJtb3NoZTE0IiwiYSI6ImNrazJyMWN0NzBtNDMzMnFvM2lrNjU4NGMifQ.vL0mc8LfnYBBhozZRROzPA&limit=1";
    request({url, json:true},(error, {body})=>{
        if (error){
            callback("unable to connect to geo app.", undefined)
        }else if(body.features.length===0){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, {long:body.features[0].center[0],
                                lat:body.features[0].center[1],
                                location:body.features[0].place_name})
            }    
        })
};

module.exports = geocode;