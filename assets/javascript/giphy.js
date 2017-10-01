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
  }
  $("#addGame").on("click", function(event) {
    event.preventDefault();
    var game = $("#game-input").val().trim();
    topics.push(game);
    renderGameBtn();
  })
  renderGameBtn();
});