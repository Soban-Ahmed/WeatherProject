const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); // needed to retreive post body

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(request, response ){ //get means - when requesting to open this page. 
    response.sendFile(__dirname + "/index.html", )
});

app.post("/", function(req, res ){ //post used.. this should happen when submit clicked.. we are grabbing the post request - when requesting to open this page. 

    const location = req.body.nameInput; // you are getting the data from the request param
    const apiKey = "";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey; // api url

    https.get(url, function (resp) { // making an api call
        resp.on("data", function (data) { // when receive response on "data" type. can't have response and res as the code will get confused. res.on used for getting response body
            const weatherData = JSON.parse(data); // converting data from json to an object
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description; // carefull when you see an array or item, you need to use []

            console.log(weatherDescription)

            const icon = weatherData.weather[0].icon;

            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.type("html"); // used to help display image   
            res.write("Decritpyion: " + weatherDescription);
            res.write("<h1>Tenpreature in " + location + ": " + temp + "</h1>");

            res.write("<img src=" + imageUrl + ">");
            res.send();

        })

        console.log(res.statusCode);
    });
    
});



app.listen(3000, function () {
         console.log("server is running: 3000");
})
