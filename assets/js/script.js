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

$.ajax(spotifyResults).done(function (response) {
	console.log(response);
});

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
        var userInput = $("input").val();
        console.log(userInput);
    }); 

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            userInput = $("input").val();
            console.log(userInput);
        }
      });
});