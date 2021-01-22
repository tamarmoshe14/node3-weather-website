const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;
// define paths for express
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static dir to serve
app.use(express.static(publicDirPath));

//routes
app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        name: "Tamar Moshe"
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About Me",
        name: "Tamar Moshe"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: "HELP",
        name: "Tamar Moshe",
        message: "If you need any help you can read the instructions here:"
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address."
        })
    }
    const address = req.query.address;
    geocode(address, (error, {long, lat, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(long, lat, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            });    
          })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term."
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        error: "Help article not found.",
        name: "Tamar Moshe",
        title: "404 error"
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        error: "Page not found",
        name: "Tamar Moshe",
        title: "404 error"
        
        
    })
})

app.listen(port, ()=>{
    console.log("app has started on port" + port)
})