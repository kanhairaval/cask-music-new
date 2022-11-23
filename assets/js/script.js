// let reqURL1 = new URL("https://spotify23.p.rapidapi.com/search/?q=test&type=multi&offset=0&limit=10&numberOfTopResults=5");
// let reqURL2 = new URL("https://youtube-music1.p.rapidapi.com/v2/search?query=test");
// let params1 = reqURL1.searchParams;
// let params2 = reqURL2.searchParams;

// params1.set("q", "Lady+Gaga");
// params1.set("type", "tracks");

// console.log(reqURL1);

// params2.set("query", "Adele");

// console.log(reqURL2);

let userInput = ''

const spotifyResults = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q=tracks&type=multi&offset=0&limit=8&numberOfTopResults=8",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "661870ef5emsh19190db4d6e2f83p1ce48cjsnaa117cab61b9",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
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
        getResults(userInput);
    }); 

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            userInput = $("input").val();
            console.log(userInput);
            return;
        }
      });
});

let resultsRendered = document.createElement('ul')
let artistName = document.createElement('li');
let mainSec = document.getElementById('main');

function getResults(){
    $.ajax(spotifyResults).done(function(response) {
        console.log(response.tracks);
        response?.tracks?.items.forEach(function(item){
            artistName.innerHTML = item.data.artists.items[0].profile.name;
            //artistImage.src = response.artists.items[0].data.visuals.avatarImage.sources[0].url;       
            resultsRendered.append(artistName);
            mainSec.append(resultsRendered);
            console.log(artistName);
        });
    });
};


  //spotifyResults.tracks