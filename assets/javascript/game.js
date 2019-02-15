/*
    UpennLPS HW4 Starwars Game js
    Author: Kevin Wang
    Date due: 2019/02/16
*/


var game = {
  characterSelected: false,
  enemySelected: false,
  userChar: "",
  userAtk: 0,
  userHP: 0,
  characterAtk: 0,
  enemy: "",
  enemyHP: 0,
  enemyAtk: 0,
  enemyRemaining: 3,

  encounter: function () {
    game.enemyHP = parseInt(game.enemyHP) - parseInt(game.userAtk);
    game.userAtk = parseInt(game.userAtk) + parseInt(game.characterAtk);
    if (game.enemyHP > 0) {
      game.userHP -= game.enemyAtk;
    }
  },

  endEncounter: function () {
    if (game.enemyHP <= 0) {
      game.enemyRemaining--;
      game.enemySelected = false;
      $(".defender").appendTo("#defeatedEnemies");
      $(".enemytxt").show();
      $("#battlelog").hide();
    }
  },

  endCondition: function () {
    if (game.enemyRemaining == 0) {
      $("#restarttxt").text("You defeated all the enemies press restart to play again")
      $("#restartSection").show();
      $(".enemytxt").hide();
    }
    else if (game.userHP <= 0) {      
      $("#restarttxt").text("You've been defeated press restart to play again")
      $("#restartSection").show();
    }
  },

  reset: function () {
    game.enemySelected = false;
    game.characterSelected = false;
    game.userAtk = 0;
    game.userHP = 0;
    game.enemyHP = 0;
    game.enemyAtk = 0;
    game.enemyRemaining = 3;
    $(".enemytxt").show();
    $(".characters").off();
    $(".characters").appendTo("#characterSelect");
    $(".characters").show();
    $(".characters").removeClass("enemies");
    $(".characters").removeClass("defender");
    $("#defeatedtxt").hide();
    $("#characterSelect").show();
    $("#yodaHP").text($("#yoda").attr("data-hp"));
    $("#winduHP").text($("#windu").attr("data-hp"));
    $("#vaderHP").text($("#vader").attr("data-hp"));
    $("#dookuHP").text($("#dooku").attr("data-hp"));
  }
}



$(document).ready(function () {
  // on click for the character selection, user clicked character moves to selected the rest are moved to enemy selection and given enemy class
  $(".characters").on("click", function () {
    if (!game.characterSelected) {
      game.userChar = $(this).attr("data-name");
      game.userAtk = $(this).attr("data-atk");
      game.characterAtk = $(this).attr("data-atk")
      game.userHP = $(this).attr("data-hp");
      $(".characters").addClass("enemies");
      $(".characters").appendTo("#enemySection");
      $(this).removeClass("enemies");
      $(this).appendTo("#userCharacter");
      $("#characterSelect").hide();
      $("#afterSelected").show();
      game.characterSelected = true;
    }
    //selecting a defender from the enemy section
    $(".enemies").on("click", function () {
      if (!game.enemySelected) {
        game.enemyAtk = $(this).attr("data-catk");
        game.enemyHP = $(this).attr("data-hp");
        game.enemy = $(this).attr("data-name");
        game.enemySelected = true;
        $(".enemytxt").hide();
        $(this).addClass("defender");
        $(".enemyNametxt").text($(this).attr("data-name"));
        $(this).appendTo("#defender");
        $("#fightSection").show();
      }
    });
  });

  //attack button interaction
  $("#atkBtn").on("click", function () {
    if (game.enemySelected && game.userHP>0) {
      $("#atkBtn").prop("disabled",true)
      setTimeout(function(){
        $("#atkBtn").prop("disabled",false)
      }, 1000);
      $("#battlelog").show();
      $("#battlelog").addClass("logAnimation")
      setTimeout(function(){
        $("#battlelog").removeClass("logAnimation")
      }, 1000);
      $(".userDamagetxt").text(game.userAtk);
      $(".enemyDamagetxt").text(game.enemyAtk);
      game.encounter();
      game.endEncounter();
      $("#" + game.enemy + "HP").text(game.enemyHP)
      $("#" + game.userChar + "HP").text(game.userHP)
      $("#" + game.enemy + "Healthtxt").addClass("healthAnimation")
      $("#" + game.userChar + "Healthtxt").addClass("healthAnimation")
      setTimeout(function(){
        $("#" + game.enemy + "Healthtxt").removeClass("healthAnimation")
        $("#" + game.userChar + "Healthtxt").removeClass("healthAnimation")
        }, 1000);

    } else if(game.userHP<=0){
      alert("Game Over");
    } else{
      alert("select an enemy");
    }
    //game end and restart button
    game.endCondition();

    $("#restartBtn").on("click", function () {
      game.reset()
      $("#restartSection").hide();
      //reapply .on click
      $(".characters").on("click", function () {
        if (!game.characterSelected) {
          game.userChar = $(this).attr("data-name");
          game.userAtk = $(this).attr("data-atk");
          game.characterAtk = $(this).attr("data-atk")
          game.userHP = $(this).attr("data-hp");
          $(".characters").addClass("enemies");
          $(".characters").appendTo("#enemySection");
          $(this).removeClass("enemies");
          $(this).appendTo("#userCharacter");
          $("#characterSelect").hide();
          game.characterSelected = true;
          $("#afterSelected").show();
        }
        $(".enemies").on("click", function () {
          if (!game.enemySelected) {
            game.enemyAtk = $(this).attr("data-catk");
            game.enemyHP = $(this).attr("data-hp");
            game.enemy = $(this).attr("data-name");
            $(this).addClass("defender");
            $(".enemyNametxt").text($(this).attr("data-name"));
            $(this).prependTo("#defender");
            game.enemySelected = true;
            $(".enemytxt").hide();
            $("#fightSection").show();
          }
        });
      });
    });
  });



});
