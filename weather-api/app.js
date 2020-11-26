const express = require("express")
const https = require("https")

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=5bdc4b58358b0e0c0a2dec2d52c5c2ae?units=metric"

    https.get(url, function(response) {
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            
            res.write("<p>The the weather is" + weatherDescription + "</p>")
            res.write("<h1>The Temperature in London is " + temp + " degrees Celcius.</h1> /br" + description)
            res.send()
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})