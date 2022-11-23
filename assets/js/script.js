let userInput = '';
var searchParam, spotifyRequest, youtubeRequest, URLs, searchType;
const searchOption = document.getElementById('default-option');

let spotifyResults = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=default&type=multi&offset=0&limit=8&numberOfTopResults=8",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "661870ef5emsh19190db4d6e2f83p1ce48cjsnaa117cab61b9",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

let youtubeResults = {
	"async": true,
	"crossDomain": true,
	"url": "https://youtube-music1.p.rapidapi.com/v2/search?query=default",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "6600cc37781msh650029158347f80p100b30jsnf080569dd3e7",
		"X-RapidAPI-Host": "youtube-music1.p.rapidapi.com"
	}
};
// $.ajax(spotifyResults).done(function (response) {
// 	console.log(response);
// });

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
    })
})

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
            $(this).showClass("fa-regular");
        }
    });

// when click or press enter, then print anything written within input search box
$(document).ready(function() {
    $(".fa-search").click(function() {
        userInput = $("input").val();
        getRequest();
        getResults(userInput);
    }); 

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            userInput = $("input").val();
            console.log(userInput);
            getRequest();
            return;
        }
      });
});

let resultsRendered = document.createElement('ul')
let artistName = document.createElement('li');
let mainSec = document.getElementById('main');

function getResults(){

    let URLs = parseURL(formatInput(userInput));

    $.ajax(URLs[0]).done(function(response) {
        console.log(response.tracks);
        response?.tracks?.items.forEach(function(item){
            artistName.innerHTML = item.data.artists.items[0].profile.name;
            //artistImage.src = response.artists.items[0].data.visuals.avatarImage.sources[0].url;       
            resultsRendered.append(artistName);
            mainSec.append(resultsRendered);
            console.log(artistName);
        });
    });

    $.ajax(URLs[1]).done(function(response) {
        console.log(response.result.songs);
        response?.songs?.items.forEach(function(item){
            artistName.innerHTML = item.data.artists.items[0].profile.name;
            //artistImage.src = response.artists.items[0].data.visuals.avatarImage.sources[0].url;       
            resultsRendered.append(artistName);
            mainSec.append(resultsRendered);
            console.log(artistName);
        });
    });
};

function getRequest(){
    
}

function formatInput(param){
    var searchParam = param.replaceAll(' ', '+');
    console.log(searchParam);
    return searchParam;
}

function parseURL(baseParam){

    var searchBySpotify, searchByYoutube;

    if (searchBy() == "bySong"){ 
        searchBySpotify = "tracks";
    } else if (searchBy() == "byArtist"){
        searchBySpotify = "artists";
    } else {
        console.log("Error. Try again.");
    }
    

    let spotifyURL = new URL("https://spotify23.p.rapidapi.com/search/?q=test&type=multi&offset=0&limit=8&numberOfTopResults=5");
    let youtubeMusicURL = new URL("https://youtube-music1.p.rapidapi.com/v2/search?query=default");
    let spotifyParams = spotifyURL.searchParams;
    let youtubeMusicParams = youtubeMusicURL.searchParams;

    spotifyParams.set("q", baseParam);
    spotifyParams.set("type", searchBySpotify);

    console.log(spotifyURL);

    youtubeMusicParams.set("query", baseParam);

    console.log(youtubeMusicURL);

    let spotifyRequest = {
        "async": true,
        "crossDomain": true,
        "url": spotifyURL,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "661870ef5emsh19190db4d6e2f83p1ce48cjsnaa117cab61b9",
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
        }
    };
    let youtubeRequest= {
        "async": true,
        "crossDomain": true,
        "url": youtubeMusicURL,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "600cc37781msh650029158347f80p100b30jsnf080569dd3e7",
            "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com"
        }
    };

    console.log(spotifyRequest);
    console.log(youtubeRequest);

    return [spotifyRequest, youtubeRequest];

}

 function searchBy(){
    if (searchOption.textContent.includes("song")) {
        searchType = "bySong";
        return searchType;
    } else if (searchOption.textContent.includes("artist")) {
        searchType = "byArtist";
        return searchType;
    } else {
        console.log("Error. Try again");
    }
 }





  //spotifyResults.tracks