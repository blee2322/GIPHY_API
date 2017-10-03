$(document).ready(function(){

  var topics = ["Call of Duty", "Resident Evil", "Halo", "Metal Gear Solid", "Overwatch"];

    

  function showgame() {

    $("button").on("click", function(){
          
      var gInput = $(this).attr("data-game");
      console.log(this);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gInput + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url:queryURL,
        method:"GET"
      })
      .done(function(response) {

        var output = response.data;
        for(var j = 0; j < output.length; j++){
          if (output[j].rating !== "r"){ 

            var gDiv = $("<div>");
            var gmRating = output[j].rating;
            var ptag = $("<p>").text("Rating: " + gmRating);
            var gameImg = $("<img>");

            gameImg.attr("src", output[j].images.fixed_height_still.url);
            gameImg.attr("data-still", output[j].images.fixed_height_still.url);
            gameImg.attr("data-animate", output[j].images.fixed_height.url);
            gameImg.attr("date-state", "still");
            gameImg.addClass("gifsrc");
            gDiv.append(ptag);
            gDiv.append(gameImg);
            $("#gifcont").prepend(gDiv)
            gifstate();
          }
          
        }
      })
    })
  }

    function gifstate() {
      
      $(".gifsrc").on("click", function() {
        
        var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })
    }
  

  function renderGameBtn() {

    $("#gamebtn").empty();

    for(var i = 0; i < topics.length; i++) {
      
      var newgbtn = $("<button type=button class=btn btn-primary>");
      // newgbtn.addClass("vGame");
      newgbtn.attr("data-game", topics[i]);
      
      //This will add the physical button to the page.
      newgbtn.text(topics[i]);
      $("#gamebtn").append(newgbtn);
      showgame();
      gifstate();
    }
  }

      $("#addGame").on("click", function(event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();
        console.log(game)
          if(game !== "") {
            topics.push(game);
            renderGameBtn();
            $("#game-input").val("");
          }
      })

      renderGameBtn();
});