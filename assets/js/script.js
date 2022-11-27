$(document).ready(function () {

    // empty arrays to push favourite songs & videos to
    var faveSongs = [];
    var faveVids = [];

    // where all data is being stored for each result
    var data = {
        artistName: "",
        songName: "",
        coverArt: "",
        spotifyLink: "",
        youtubeLink: "",
    }

    // empty strings that store user input & search type
    // gets filled only after search has been made
    let userInput = "";
    let searchType = "";

    // main section will hold all results rendered onto the page
    let mainSec = document.getElementById("main");


    // will request and get data from spotify & youtube with given keys 
    function parseURL() {
    
        let spotifyRequest = {
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "5fe74e009cmsh28c55109e96d80ep1ef9acjsn3ac6d6e732c7",
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
            }
        };

        let youtubeRequest = {
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "5fe74e009cmsh28c55109e96d80ep1ef9acjsn3ac6d6e732c7",
                "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
            }
        };
    
        return [spotifyRequest, youtubeRequest];
    
    }

    // gets user's search input & type picked in drop down to give results
    function getResults(userInput, searchType) {

        // both api urls get parsed & formats search (just in case there are spaces)
        let URLs = parseURL(formatInput(userInput));
        
        // spotify & youtube api urls
        // q for each has been replaces with the user's search input
        // type has been replaced with the type
        let spotifyURL = `https://spotify23.p.rapidapi.com/search/?q=${userInput}&type=${searchType}s&offset=0&limit=4&numberOfTopResults=4`
        let youtubeURL = `https://youtube-v31.p.rapidapi.com/search?q=${userInput}&part=snippet%2Cid&maxResults=4&order=relevance`

        // checking dropdown search option picked by user
        // only runs if song is picked
        if (searchType === "tracks") {

            // fetch request for spotify response & to return it as a json
            fetch(spotifyURL,URLs[0]).then(function(response){
                return response.json()

                // after, create elements based on data within said json
            } ).then(function getfromSpotify (spotifyData){

                // for each spotify response result
                for(var i=0; i<spotifyData.tracks.items.length; i++) { 

                    // create elements for each item needed to show response on page
                    let linkHub = document.createElement("div");

                    let resultsRendered = document.createElement("ul");

                    let artistName = document.createElement("li");
                    let songName = document.createElement("li");

                    let coverArt = document.createElement("img");

                    let spotifyLink = document.createElement("a");
                    let youtubeLink = document.createElement("a");

                    let spotifyIcon = document.createElement("i");
                    let youtubeIcon = document.createElement("i");
                    let heartDefault = document.createElement("i");

                    // add classes to each so it can be easily styled
                    $(linkHub).addClass("link-hub");
                    $(resultsRendered).addClass("result-container");
                    $(artistName).addClass("artist-name");
                    $(songName).addClass("song-name");
                    $(coverArt).addClass("cover-art")

                    // icons get special classes used by fontawesome
                    $(spotifyIcon).addClass("fa-brands");
                    $(spotifyIcon).addClass("fa-spotify");

                    $(youtubeIcon).addClass("fa-brands");
                    $(youtubeIcon).addClass("fa-youtube");

                    $(heartDefault).addClass("fa-regular");
                    $(heartDefault).addClass("fa-heart");
                    $(heartDefault).addClass("like-heart");

                    // all links will be opened in a separate tab
                    $("a").attr("target","_blank");

                    // defining the content within each created element
                    // these use data fetched from the api & does so for each result
                    artistName.innerHTML = spotifyData.tracks.items[i].data.artists.items[0].profile.name;
                    songName.innerHTML = spotifyData.tracks.items[i].data.name;
                    coverArt.src = spotifyData.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url + "\n";
                    spotifyLink.href = ("https://play.spotify.com/track/" + spotifyData.tracks.items[i].data.id);
                    youtubeLink.href = "https://www.youtube.com/results?search_query=" + formatInput(artistName.innerHTML + " " + songName.innerHTML);

                    // appends each element as needed 
                    spotifyLink.append(spotifyIcon);
                    youtubeLink.append(youtubeIcon);
                    linkHub.append(spotifyLink, youtubeLink, heartDefault);
                    resultsRendered.append(artistName, songName, coverArt, linkHub);
                    mainSec.append(resultsRendered);
                }
            });
        }
        
        // checking dropdown search option picked by user
        // only runs if video is picked
        if (searchType === "videos") {

            // fetch request for youtube response & to return it as a json
            fetch(youtubeURL,URLs[1]).then(function(response){
                    return response.json()

                // after, create elements based on data within said json
                }).then(function getfromYoutube (youtubeData){

                    let ytData = youtubeData

                    // for each youtube response result
                    for(var i=0; i < youtubeData.items.length; i++) {

                        // create elements for each item needed to show response on page
                        let linkHub = document.createElement("div");

                        let resultsRendered = document.createElement("ul");

                        let artistName = document.createElement("li");
                        let songName = document.createElement("li");

                        let coverArt = document.createElement("img");

                        let youtubeLink = document.createElement("a");
                        let spotifyLink = document.createElement("a");

                        let youtubeIcon = document.createElement("i");
                        let spotifyIcon = document.createElement("i");
                        let starDefault = document.createElement("i");

                        // add classes to each so it can be easily styled
                        $(linkHub).addClass("link-hub");
                        $(resultsRendered).addClass("result-container");
                        $(artistName).addClass("channel-name");
                        $(songName).addClass("video-title")
                        $(coverArt).addClass("thumbnail");

                        // all links will be opened in a separate tab
                        $("a").attr("target","_blank");

                         // icons get special classes used by fontawesome
                        $(youtubeIcon).addClass("fa-brands");
                        $(youtubeIcon).addClass("fa-youtube");

                        $(spotifyIcon).addClass("fa-brands");
                        $(spotifyIcon).addClass("fa-spotify");

                        $(starDefault).addClass("fa-regular");
                        $(starDefault).addClass("fa-star");
                        $(starDefault).addClass("like-star");

                         // defining the content within each created element
                        // these use data fetched from the api & does so for each result
                        artistName.innerHTML = youtubeData.items[i].snippet.channelTitle;
                        songName.innerHTML = youtubeData.items[i].snippet.title;
                        coverArt.src = youtubeData.items[i].snippet.thumbnails.high.url;
                        youtubeLink.href = "https://www.youtube.com/watch?v=" + youtubeData.items[i].id.videoId;
                        spotifyLink.href = "https://open.spotify.com/search/" + userInput;

                        // appends each element as needed 
                        youtubeLink.append(youtubeIcon);
                        spotifyLink.append(spotifyIcon);
                        linkHub.append(youtubeLink, spotifyLink, starDefault);
                        resultsRendered.append(artistName, songName, coverArt, linkHub);
                        mainSec.append(resultsRendered);
                    };
                });
            };
        };
    
    // function that formats parameters used in apis & links
    // this is so there isn't any error when searching due to spaces
    function formatInput(param){
        var searchParam = param.replaceAll(' ', '+');
        return searchParam;
    }
    
    // when searching with the dropdown, it takes into account what search is desired by user
    function searchBy(){
        if (searchOption.includes("song")) {
            searchType = "tracks";
            getResults(userInput, searchType);
            return searchType;

        } else if (searchOption.includes("video")) {
            searchType = "videos";
            getResults(userInput, searchType);
            return searchType;
        }
     }

     // when heart is clicked, it gives it a fontawesome class to make it solid
     // as well as a "liked-song" class
     // it also removes classes if clicked twice
     $(document).on("click", ".like-heart", function (event) {
        if ($(this).hasClass("fa-solid")) {
            $(this).removeClass("fa-solid");
            $(this).addClass("fa-regular");
        } else {
            $(this).removeClass("fa-regular");
                $(this).addClass("fa-solid");
        }

        if ($(this).hasClass("liked-song")) {
            $(this).removeClass("liked-song");
        } else {
                $(this).addClass("liked-song");
        }
    })

    // when star is clicked, it gives it a fontawesome class to make it solid
     // as well as a "liked-video" class
     // it also removes classes if clicked twice
    $(document).on("click", ".like-star", function (event) {
        if ($(this).hasClass("fa-solid")) {
            $(this).removeClass("fa-solid");
            $(this).addClass("fa-regular");
        } else {
            $(this).removeClass("fa-regular");
                $(this).addClass("fa-solid");
        }
        
        if ($(this).hasClass("liked-video")) {
            $(this).removeClass("liked-video");
        } else {
                $(this).addClass("liked-video");
        }
    })

     // dropdown on search appears when clicked
     $("#default-option").click(function() {
        $("#dropdown ul").toggleClass("show-options");
    });

    // when an option is selected in the dropdown menu, it replaces the default "search by" text
    $("#dropdown ul li").click(function() {
        var searchByOption = $(this).text();
        $("#default-option").html(searchByOption);
        $("#dropdown ul").toggleClass("show-options")
    });

    // when hovering over the nav icons, it will change their state to solid
    $(".nav-icons").mouseenter(function() {
        $(this).hideClass("fa-regular");
        },
        function() {
            $(this).addClass("fa-solid");
    });

    // when not hovering over nav icons, it will change their state back to regular
    $(".nav-icons").mouseleave(function() {      
            if($(this).hasClass("fa-solid")){
                $(this).removeClass("fa-solid");
            }
    });
    
    // when click or press enter, then print anything written within input search box
    // it currently also takes into account which option the user picked in the dropdown
    $(".fa-search").click(function() {
        mainSec.innerHTML = ""
        userInput = $("input").val();
            baseParam = userInput;
            searchOption = $("#default-option").html();
            searchBy();
    }); 

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            userInput = $("input").val();
            searchOption = $("#default-option").html();
            mainSec.innerHTML = "";
            searchBy();
        }
    });
});