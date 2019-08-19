require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

function main(selection, value) {
    switch (selection) {
        case "concert-this":
            concert(value);
            break;
        case "spotify-this-song":
            spotify(value);
            break;
        case "movie-this":
            movie(value);
            break;
        case "do-what-it-says":
            random();
            break;
        default:
            console.log("Not Valid Operation");
    }
}

function concert(name) {
    var artist = name;
    var artistForError = name;
    if (!artist) {
        console.log("Please enter a valid Artist");

    } else {

        var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(url).then(
            function (response) {
                if (response.data.length > 0) {
                    console.log("\n\n\n\nSearch Events for " + artistForError);
                    writeLog("Search Events for " + artistForError + "\n")
                    console.log("\nVenue Name: " + response.data[0].venue.name);
                    writeLog("Venue Name: " + response.data[0].venue.name + "\n")
                    console.log("\nVenue Location: " + response.data[0].venue.city);
                    writeLog("Venue Location: " + response.data[0].venue.city + "\n")
                    console.log("\nDate of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY") + "\n\n\n\n");
                    writeLog("Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY") + "\n" +"====================================================" + "\n")
                } else {
                    console.log("No upcoming events for " + artistForError);
                }

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

}


function movie(name) {
    var movieUrl = name;
    var movieforError = name;
    if (!movieUrl) {
        var movieUrl = "Mr. Nobody";
        var movieforError = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: It's on Netflix!");

    }
    axios.get("http://www.omdbapi.com/?t=" + movieUrl + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (response.data.Title != undefined) {
                console.log("\n\n\nSearching info for " + movieforError);
                writeLog("Searching info for " + movieforError + "\n")
                console.log("Title: " + response.data.Title);
                writeLog("Title: " + response.data.Title + "\n")
                console.log("Year: " + response.data.Year);
                writeLog("Year: " + response.data.Year + "\n")
                console.log("Imdb Rating: " + response.data.imdbRating);
                writeLog("Imdb Rating: " + response.data.imdbRating + "\n")
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                writeLog("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n")
                console.log("Country: " + response.data.Country);
                writeLog("Country: " + response.data.Country + "\n")
                console.log("Language: " + response.data.Language);
                writeLog("Language: " + response.data.Language + "\n")
                console.log("Plot: " + response.data.Plot);
                writeLog("Plot: " + response.data.Plot + "\n")
                console.log("Actors: " + response.data.Actors + "\n\n\n");
                writeLog("Actors: " + response.data.Actors + "\n" +"====================================================" + "\n")
            } else {
                console.log("No results for " + movieforError);
            }
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

function spotify(name) {
    var spotifyUrl = name;
    var spotifyUrlError = name;

    if (!spotifyUrl) {
        spotifyUrl = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: spotifyUrl }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n\nSearching info for song: " + spotifyUrl);
        writeLog("Searching info for song: " + spotifyUrl + "\n")
        console.log("\nArtist(s) Name: " + data.tracks.items[0].artists[0].name);
        writeLog("Artist(s) Name: " + data.tracks.items[0].artists[0].name + "\n")
        console.log("\nSong Name: " + data.tracks.items[0].name);
        writeLog("Song Name: " + data.tracks.items[0].name + "\n")
        console.log("\nSpotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
        writeLog("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n")
        console.log("\nAlbum Name: " + data.tracks.items[0].album.name + "\n\n\n\n");
        writeLog("Album Name: " + data.tracks.items[0].album.name + "\n" +"====================================================" + "\n")

    });

}

function random() {
    fs.readFile('random.txt', "utf8", function (error, res) {

        if (error) {
            return console.log(error);
        }
        var sel = res.split("%")
        //console.log(sel);
        var pos = Math.floor(Math.random() * sel.length)
        var arr = sel[pos].split(",")
        main(arr[0], arr[1]);
    });
}

main(process.argv[2], process.argv.slice(3).join("+"));

function writeLog(data) {
    fs.appendFile("log.txt", data, function (err) {

        if (err) {
            console.log(err);
        }
    });
}