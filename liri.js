require("dotenv").config();
var keys = require("./keys.js");


// Core node package for reading and writing files
var Spotify = require('node-spotify-api');
var fs = require("fs");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

if (process.argv[2] == "concert-this") {
  var artist = process.argv.slice(3).join(" ");
  // Then run a request with axios to the OMDB API with the movie specified
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {

  for (i = 0 ; i < response.data.length ; i++) {
  var venueName = response.data[i].venue.name;
  var venueCountry = response.data[i].venue.country;
  var date = response.data[i].datetime;

  console.log("------------------------------");
  console.log("Concert #" + [i+1] + ":")          
  console.log("Venue Name: " + venueName);
  console.log("Country: " + venueCountry);
  console.log("Date: " + date);
  console.log("------------------------------");

  var everything = "\nArtist: " + artist + "\n" + "Venue Name: " + venueName +
    "\n" + "Country: " + venueCountry + "\n" + "Date: " + date + "\n";

  fs.appendFile("log.txt", everything, function (err) {

  if (err) {
    return console.log(err);
  }
  });
  }})
  .catch(function (error) {
    console.log(error);
  });
} 

if (process.argv[2] == "spotify-this-song") {
    var song = process.argv.slice(3).join(" ");

    var Spotify = require('node-spotify-api');
 
 
var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: song })
  .then(function(response) {

  var nameArtist = response.tracks.items[0].artists[0].name;
  var nameAlbum = response.tracks.items[0].album.name;
  var nameSong = response.tracks.items[0].name;
  var preview = response.tracks.items[0].preview_url; 

  console.log("------------------------------");
  console.log("Artist Name: " + nameArtist);
  console.log("Album Name: " + nameAlbum);
  console.log("Song Name: " + nameSong);
  console.log("preview: " + preview);
  console.log("------------------------------");

  var everything = "\n----------------------------\nArtist Name: " + nameArtist + "\n" + "Album Name: " + nameAlbum +
                "\n" + "Song Name: " + nameSong + "\n" + "preview: " + preview;

  fs.appendFile("log.txt", everything, function (err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  });
    
  })
  .catch(function(err) {
    console.log(err);
  })};

  if (process.argv[2] == "movie-this") {
    var movie = process.argv.slice(3).join("+");
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
      function (response) {
  var movieTitle = response.data.Title;
  var year = response.data.Released;
  
  var country = response.data.Country; 
  var language = response.data.Language; 
  var plot = response.data.Plot; 
  var actors = response.data.Actors;

  console.log("------------------------------");
  console.log("Movie Name: " + movieTitle);
  console.log("Year of Release: " + year);
  if (response.data.Ratings.length > 0) {
  var rating = response.data.Ratings[0].Value;
  var tomatoRating = response.data.Ratings[1].Value; 
  console.log("ImDB Rating: " + rating);
  console.log("Rotten Tomato Rating: " + tomatoRating);
  };
  console.log("country: " + country);
  console.log("Language: " + language);
  console.log("Plot: " + plot);
  console.log("Actors: " + actors);
  
  
  console.log("------------------------------");

  var everything = "\n----------------------------\nMovie Name: " + movieTitle + "\n" + "Year of Release: " + year +
  "\n" + "ImDB Rating: " + rating + "\n" + "Rotten Tomato Rating: " + tomatoRating + "country: " + country + "Language: " + language + "Plot: " + plot 
  "Actors: " + actors ;

fs.appendFile("log.txt", everything, function (err) {

// If the code experiences any errors it will log the error to the console.
if (err) {
return console.log(err);
}

});
  
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  if (process.argv[2] == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
    
      // We will then print the contents of data
      /* console.log(data); */
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
      
    
    if ( dataArr[0] == "spotify-this-song") {
      var song = dataArr[1];
  
      var Spotify = require('node-spotify-api');
   
      var spotify = new Spotify(keys.spotify);
   
  spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
  
    var nameArtist = response.tracks.items[0].artists[0].name;
    var nameAlbum = response.tracks.items[0].album.name;
    var nameSong = response.tracks.items[0].name;
    var preview = response.tracks.items[0].preview_url; 
  
    console.log("------------------------------");
    console.log("Artist Name: " + nameArtist);
    console.log("Album Name: " + nameAlbum);
    console.log("Song Name: " + nameSong);
    console.log("preview: " + preview);
    console.log("------------------------------");
  
    var everything = "\n----------------------------\nArtist Name: " + nameArtist + "\n" + "Album Name: " + nameAlbum +
                  "\n" + "Song Name: " + nameSong + "\n" + "preview: " + preview;
  
    fs.appendFile("log.txt", everything, function (err) {
  
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    });
      
    })
    .catch(function(err) {
      console.log(err);
    })
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      }

      if ( dataArr[0] == "concert-this") {
        var artist = dataArr[1];
  // Then run a request with axios to the OMDB API with the movie specified
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {

  for (i = 0 ; i < response.data.length ; i++) {
  var venueName = response.data[i].venue.name;
  var venueCountry = response.data[i].venue.country;
  var date = response.data[i].datetime;

  console.log("------------------------------");
  console.log("Concert #" + [i+1] + ":")          
  console.log("Venue Name: " + venueName);
  console.log("Country: " + venueCountry);
  console.log("Date: " + date);
  console.log("------------------------------");

  var everything = "\nArtist: " + artist + "\n" + "Venue Name: " + venueName +
    "\n" + "Country: " + venueCountry + "\n" + "Date: " + date + "\n";

  fs.appendFile("log.txt", everything, function (err) {

  if (err) {
    return console.log(err);
  }
  });
  }})
  .catch(function (error) {
    console.log(error);
  });

      }

      if ( dataArr[0] == "movie-this") {
        var movie = dataArr[1];
        // Then run a request with axios to the OMDB API with the movie specified
        axios.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
          function (response) {
            var movieTitle = response.data.Title;
            var year = response.data.Released;
            
            var country = response.data.Country; 
            var language = response.data.Language; 
            var plot = response.data.Plot; 
            var actors = response.data.Actors;
          
            console.log("------------------------------");
            console.log("Movie Name: " + movieTitle);
            console.log("Year of Release: " + year);
            if (response.data.Ratings.length > 0) {
            var rating = response.data.Ratings[0].Value;
            var tomatoRating = response.data.Ratings[1].Value; 
            console.log("ImDB Rating: " + rating);
            console.log("Rotten Tomato Rating: " + tomatoRating);
            };
            console.log("country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
            
            
            console.log("------------------------------");
    
      var everything = "\n----------------------------\nMovie Name: " + movieTitle + "\n" + "Year of Release: " + year +
      "\n" + "ImDB Rating: " + rating + "\n" + "Rotten Tomato Rating: " + tomatoRating + "country: " + country + "Language: " + language + "Plot: " + plot 
      "Actors: " + actors ;
    
    fs.appendFile("log.txt", everything, function (err) {
    
    // If the code experiences any errors it will log the error to the console.
    if (err) {
    return console.log(err);
    }
    
    });
      
        })
        .catch(function (error) {
          console.log(error);
        });
    
      }




    })
    };
    





  

