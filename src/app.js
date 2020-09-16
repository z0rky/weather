const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherRequest = require('./utils/weatherRequest')
const app = express()
const port = process.env.PORT || 3000

//define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
//customize views folder name
const viewPath = path.join(__dirname, '../templates/views')
const partialViewPath = path.join(__dirname, '../templates/partials')


//setup static directory ( css, images, static html,  ...)
app.use(express.static(publicDirectoryPath))


// setup handlebars engine and views location
// tell app to use hbs as viewengine // same as nunjucks
app.set('view engine', 'hbs')
//customize views folder name link to app 
app.set('views', viewPath)
hbs.registerPartials(partialViewPath)


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "koen"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about app",
        name: "indy"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "help app",
        name: "odin"
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'please select location'
        })
    }else{
        geocode(req.query.address, (error, data = {})=>{
            error && res.send({error})
            data && weatherRequest(data, (error, weather) => {
                error && res.send({error})
                weather && res.send({weather})
            })
        })
    }
    
})

app.get('/products', (req,res) => {
    !req.query.search && res.send({
        error: 'you must provide search term'
    })
    console.log(req.query)
    req.query.search &&res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "help article not found",
        name: "koen"
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        errorMessage: "page not found",
        name: "koen"
    })
})
app.listen(port, () => {
    console.log(`server started on ${port}` )
})