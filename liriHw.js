
require("dotenv").config();
var axios = require("axios");
var keys = require("./js/keys");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require("fs");

var command = process.argv[2];

var userInput = process.argv.slice(3).join(" ");

function userCommand(command, userInput) {

    switch (command) {

        case 'concert-this':

            concert(userInput);

            break;

        case 'spotify-this-song':

            song(userInput);

            break;

        case 'movie-this':

            omdb(userInput);

            break;

        case 'do-what-it-says':

            random();

    }

}

 

function concert(artist) {

    var artist = userInput;

    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

 

    axios.get(bandUrl).then(function (response) {

        var jsonData = response.data[0]

        // console.log(jsonData);

        var artistInfo = [

            "Venue name: " + jsonData.venue.name,

            "Location: " + jsonData.venue.city,

            "Date: " + moment(jsonData.datetime).format("L")

        ].join("\n\n");

        console.log(artistInfo);

    })

}

 

function song(title) {

    var spotify = new Spotify(keys.spotify);

   

    if (!title) {

        title = "The Sign";

    }

    spotify.search({ type: 'track', query: title }, function (err, data) {

        var jsonData = data.tracks.items[0];

 

        if (err) {

            return console.log('Error: ' + err)

        }

        // console.log(jsonData);

    console.log("Artist Name: " + jsonData.album.artists[0].name + "\r\n"),

    console.log("Song Name: " + jsonData.name + "\r\n"),

    console.log("Song Preview Link: " + jsonData.href + "\r\n"),

    console.log("Album: " + jsonData.album.name + "\r\n")

})

};

 

function omdb(movie) {

    var movie = userInput;

    if (!movie) {

        movie = "Mr. Nobody";

    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

 

    axios.get(movieUrl).then(function (response) {

        var jsonData = response.data

        var movieInfo = [

            "Title: " + jsonData.Title,

            "Release Year: " + jsonData.Year,

            "IMDB Rating: " + jsonData.imdbRating,

            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].value,

            "Country where Produced: " + jsonData.Country,

            "Language: " + jsonData.Language,

            "Plot: " + jsonData.Plot,

            "Actors: " + jsonData.Actors

        ].join("\n\n");

        console.log(movieInfo);

    })

 

}

 

function random() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {

            return console.log(err);

        } else {

            // console.log(data)

            var randomData = data.split(",");

            userCommand(randomData[0], randomData[1]);

        }

    })

}

 

userCommand(command, userInput);