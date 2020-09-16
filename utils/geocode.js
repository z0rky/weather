const request = require('./node_modules/postman-request')

const getCoordinates = (city, callback) => {
    const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoiejBya3kiLCJhIjoiY2tldmIxenoxMDQwNzJ2anBtZmd3b3VtbCJ9.wRp0aPN_II8QDyIn---7_g&limit=1`
    request({url: urlMapBox, json:true}, (error, {body}) => {
        if(error){
            callback(' error has accured connecting to service', undefined)
        }else if(body.features.length === 0) {
            callback('location not found', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
});
}

module.exports = getCoordinates
