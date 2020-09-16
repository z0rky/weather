const request = require('postman-request')

const weatherRequest = ({longitude, latitude, location} = {}, callback) => {
    url = `http://api.weatherstack.com/current?access_key=5ea2918f0470f161be25084cb00141f6&query=${latitude},${longitude}`
    console.log(url)
    request({url: url, json:true}, (error, {body}) => {
    if(error){
        callback('error', undefined)
    }else if(!body){
        callback('unable to find location, error', undefined)
    }else{
        callback(undefined, {
            foreCast:`It is currently ${body.current.temperature}, It feels like ${body.current.feelslike}, weather is ${body.current.weather_descriptions[0]} and UV index is ${body.current.uv_index} `,
            location: location
    });
    }
})
}

module.exports = weatherRequest