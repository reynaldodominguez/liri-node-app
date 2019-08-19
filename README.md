Liri Node App

Link to video demostration 
https://drive.google.com/file/d/1Ow9PhCXQoW7GVthGInwexNwZ9XMBqs6z/view

LIRI is a Language Interpretation and Recognition Interface

LIRI perform searchs in Spotify for songs, Bands in Town for concerts, and OMDB for movies

To run the program the user must write in cosole node liri then any of the commands and then the info to search

For example:

node liri spotify-this-song 24K or node liri movie-this titanic 

or node liri concert-this metallica or node liri do-what-it-says

The features for the program are:

Take the console user input validate and depending on the info do the following 

Command movie-this: takes the movie name from the user input and make an call to the OMDB API and show the info from the response in the console.

Command concert-this: takes the band name from the user input and make an call to the bandsintown API and show the info from the response in the console.

Command spotify-this-song: takes the song name from the user input and make an call to the Spotify API and show the info from the response in the console.

Command do-what-it-says: read the file ramdon.txt and separe the commands and values intro an array and then choose randomly one of the commands and values and then with this information call the function depending the commands selected and sent the value and show the info in the console, so each time the action must be diferent

Every time that the user perform an action all the info is appended to the log.txt file

In the development of this system was used severals node packages like: axios, fs, moments, node-spotify-api

The system was developed by 
Luis Dominguez
