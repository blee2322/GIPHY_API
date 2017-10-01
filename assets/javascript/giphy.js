$(document).ready(function(){

  var topics = ["Call of Duty", "Resident Evil", "Halo", "Metal Gear Solid", "Overwatch"];

    

  function renderGameBtn() {

    $("#gamebtn").empty();

    for(var i = 0; i < topics.length; i++) {
      
      var newgbtn = $("<button type=button class=btn btn-primary>");
      newgbtn.addClass("vGame");
      newgbtn.attr("data-game", topics[i]);
      
      //This will add the physical button to the page.
      newgbtn.text(topics[i]);
      $("#gamebtn").append(newgbtn);
    }

      $("#addGame").on("click", function(event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();
        topics.push(game);
        renderGameBtn();
      })
  }

    renderGameBtn();
    
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

                gameImg.attr("src", output[j].images.fixed_height.url);
                gDiv.append(ptag);
                gDiv.append(gameImg);
                $("#gifcont").prepend(gDiv);
              }
            }
          })
    })
});