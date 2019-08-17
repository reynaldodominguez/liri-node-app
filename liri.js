//require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var axios = require("axios");

switch (process.argv[2]) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":

        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":

        break;
    default:
        console.log("Not Valid Operation");
}

function concert() {
    var artist = process.argv[3];
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(
        function (response) {
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city);
        }).catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}


function movie() {
    var movie = process.argv[3];
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Imdb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}