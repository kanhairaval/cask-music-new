// defining what the user input would be
// by default is is nothing
let userInput = "";
var searchType = "";
var searchParam, spotifyRequest, youtubeRequest, URLs, searchOption;

// when clicking on the dropdown on search bar, 
// it will toggle the class "show-options", 
// then when clicked, it will replace the default option with selected option
$(document).ready(function () {
    $("#default-option").click(function () {
        $("#dropdown ul").toggleClass("show-options");
    });

    $("#dropdown ul li").click(function () {
        var searchByOption = $(this).text();
        $("#default-option").html(searchByOption);
        $("#dropdown ul").toggleClass("show-options")
    });

// when hovering over the nav icons, it will change their state to solid
    $(".nav-icons").mouseenter(function () {
        $(this).hideClass("fa-regular");
        },
        function () {
            $(this).addClass("fa-solid");
    });

// when not hovering over nav icons, it will change their state back to regular
    $(".nav-icons").mouseleave(function() {      
            if($(this).hasClass("fa-solid")){
                $(this).removeClass("fa-solid");
            }
    });

    let mainSec = document.getElementById("main");

    // let resultsRendered = document.createElement('ul');
    // let artistName = document.createElement('li');
    // let songName = document.createElement('li');
    // let coverArt = document.createElement('img');
    // let linkHub = document.createElement('div');
    // let spotifyLink = document.createElement('a');
    // let spotifyIcon = document.createElement('i');
    // let youtubeLink = document.createElement('a');
    // let youtubeIcon = document.createElement('i');

    // var resultsArray = [];
    var arrayEach = [];

    var data = {
        artistName: "",
        songName: "",
        coverArt: "",
        spotifyLink: "",
        youtubeLink: "",
    }

    var ytArtistName, ytSongName, ytVidTitle;

    function getResults(searchType) {

        let URLs = parseURL(formatInput(userInput));

        console.log(URLs)
        console.log(searchOption);
        console.log(searchType);
           
        let spotifyURL = `https://spotify23.p.rapidapi.com/search/?q=${userInput}&type=${searchType}s&offset=0&limit=4&numberOfTopResults=4`
        let youtubeMusicURL = `https://youtube-music1.p.rapidapi.com/v2/search?query=${userInput}`

        fetch(spotifyURL,URLs[0]).then(function(response){
            return response.json()
        } ).then(function(spotifyData){
            let artistName =  spotifyData.tracks.items[0].data.artists.items[0].profile.name;
            let songName = spotifyData.tracks.items[0].data.name;
            console.log(spotifyData);
        for(var i=0; i<spotifyData.tracks.items.length; i++) { 

                data = {
                    artistName: "",
                    songName: "",
                    coverArt: "",
                    spotifyLink: "",
                    youtubeLink: "",
                }

                let linkHub = document.createElement('div');
                $(linkHub).addClass("link-hub");
                
                let resultsRendered = document.createElement("ul")
                $(resultsRendered).addClass("result-container");

                let artistName = document.createElement('li');
                artistName.innerHTML = spotifyData.tracks.items[i].data.artists.items[0].profile.name;
                $(artistName).addClass("artist-name");

                let songName = document.createElement('li');
                songName.innerHTML = spotifyData.tracks.items[i].data.name;
                $(songName).addClass("song-name");

                let coverArt = document.createElement('img');
                coverArt.src = spotifyData.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url + "\n";

                let spotifyLink = document.createElement('a');
                spotifyLink.href = ("https://play.spotify.com/track/" + spotifyData.tracks.items[i].data.id);

                let spotifyIcon = document.createElement('i');
                $(spotifyIcon).addClass("fa-brands");
                $(spotifyIcon).addClass("fa-spotify");

                // let youtubeLink = document.createElement('a');
                // youtubeLink.href =  "https://www.youtube.com/watch?v=";
                // $(youtubeLink).addClass("yt-link");

                let youtubeLink = document.createElement("a");
                    fetch(youtubeMusicURL, URLs[1])
                    .then((jsonResponse) => jsonResponse.json())
                    .then((data) => {
                     let youtube = data.result.videos.map((val) => val.id);

                   youtubeLink.href = `https://www.youtube.com/watch?v=${youtube}`;
                 })
                 .catch((err) => {
                    console.log(err);
                  });
               

                let youtubeIcon = document.createElement('i');
                $(youtubeIcon).addClass("fa-brands");
                $(youtubeIcon).addClass("fa-youtube");

                $(youtubeLink).addClass("yt-link");

                spotifyLink.append(spotifyIcon);
                youtubeLink.append(youtubeIcon);
                linkHub.append(spotifyLink, youtubeLink);
                resultsRendered.append(artistName, songName, coverArt, linkHub);

                mainSec.append(resultsRendered);

                // arrayEach.push(data);

                console.log(arrayEach)

            }

            // perform all operations related to spotify
            fetch(youtubeMusicURL,URLs[1]).then(function(response){
                return response.json()
            }).then(function(youtubeData){

                let ytData = youtubeData

                youtubeLink = $(".yt-link");

                console.log(ytData.result.songs)
                console.log(ytData.result.videos)

                for(var i=0; i<youtubeData.result.songs.length; i++) {

                    // if(youtubeLinkData = undefined) 
                    // youtubeLinkData = "https://www.youtube.com/watch?v=" + youtubeData.result.songs[i].id
                    
                        // ytArtistName = youtubeData.result.songs[i].artists[0].name;
                        // ytSongName = youtubeData.result.songs[i].title;
                        ytVidTitle = youtubeData.result.songs[i].name;

                        youtubeLink = "https://www.youtube.com/watch?v=" + youtubeData.result.songs[i].id;
                        

                        console.log(ytVidTitle)
                        
                    }

                        // arrayEach.data.forEach(function() { 
                        for(var i=0; i<spotifyData.tracks.items.length; i++) { 
                        
                        if (ytVidTitle.includes(songName)) {
                            

                                data[i].youtubeLink.href = youtubeLink;
                                arrayEach.push(data);

                                return[arrayEach]


                            // this.youtubeLink.append(this.youtubeIcon);
                            // linkHub.append(youtubeLink);
                            // arrayEach.push(youtubeLinkData);
                        // }
                    }
                }
            })

        })

        

        // function getData(artistName, songName) {
        //     $.ajax(URLs[1]).done(function(response) {
        //         // resultsArray.forEach(function() {
    
        //             for(var i=0; i<response.result.songs.length; i++) {

        //                 // let ytData = {
        //                 //     ytArtistName: "",
        //                 //     songName: "",
        //                 //     coverArt: "",
        //                 //     spotifyLink: "",
        //                 // }

        //                 youtubeLinkData = "https://www.youtube.com/watch?v=" + response.result.videos[i].id;
        //                 if(youtubeLinkData = undefined) youtubeLinkData = "https://www.youtube.com/watch?v=" + response.result.songs[i].id
        //                 youtubeLink.href = youtubeLinkData;
                    
        //                 ytArtistName = response.result.songs[i].artists[0].name;
        //                 ytSongName = response.result.songs[i].title;
        //                 ytVidTitle = response.result.songs[i].name;
                        

        //                 console.log(ytVidTitle)
        //                 console.log()
                        
        //                 if (ytVidTitle.includes(artistName, songName)) {
        //                     $(youtubeIcon).addClass("fa-brands");
        //                     $(youtubeIcon).addClass("fa-youtube");


                            
        //                     youtubeLink.append(youtubeIcon);
        //                     linkHub.append(youtubeLink);
        //                     arrayEach.push(youtubeLinkData);
        //                 }
                        // console.log(artistName)
                        // console.log(songName)
    
                    // }
                        
                    //     youtubeLinkData = "https://www.youtube.com/watch?v=" + response.result.songs[0].id;
                    //     youtubeLink.href = youtubeLinkData;
    
                    //     // debugger
    

                    
                    //     $(youtubeIcon).addClass("fa-brands");
                    //     $(youtubeIcon).addClass("fa-youtube");
         
                    //     youtubeLink.append(youtubeIcon);
                    //     linkHub.append(youtubeLink);
                    //     arrayEach.push(youtubeLinkData);
                    // }
    
                    // console.log(ytVidTitle)
                    // console.log(youtubeLinkData);
                // })
        //     }
        // }
        // )
    };
    
    function formatInput(param){
        var searchParam = param.replaceAll(' ', '+');
        return searchParam;
    }
    
    function parseURL() {
    
        let spotifyRequest = {
            // "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "011ce89769msh6e180690fb08442p1a266ajsne3b7f9c28356",
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
            }
        };

        let youtubeRequest = {
            // "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "011ce89769msh6e180690fb08442p1a266ajsne3b7f9c28356",
                "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com"
            }
        };
    
        // console.log(spotifyRequest);
        // console.log(youtubeRequest);
    
        return [spotifyRequest, youtubeRequest];
    
    }
    
     function searchBy(){
        if (searchOption.includes("song")) {
            searchType = "tracks";
            getResults(searchOption, searchType);
            console.log(searchType);
            return searchType;

        } else if (searchOption.includes("artist")) {
            searchType = "multi";
            getResults(searchOption, searchType);
            console.log(searchType);
            return searchType;

        }
     }
    
// when click or press enter, then print anything written within input search box
// it currently also takes into account which option the user picked in the dropdown
    $(".fa-search").click(function() {
        $("#main").empty();
        userInput = $("input").val();
        baseParam = userInput;
        searchOption = $("#default-option").html();
        searchBy();

        console.log(userInput);
    }); 

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $("#main").empty();
            resultContainerEl.removeChild();
            userInput = $("input").val();
            searchOption = $("#default-option").html();
            searchBy();
    
            console.log(userInput);
        }
    });
});

