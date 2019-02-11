/*
    UpennLPS HW4 Crystal Game js
    Author: Kevin Wang
    Date due: 2019/02/16
*/

var game = {
    crystalval: [],
    userScore: 0,
    targetScore: 0,

    crystalvalRNG: function(){
    //Generates 4 distinct numbers between 1 and 12 inclusive

      val1 = 1 + Math.floor(Math.random() * 12); //generate a number between 1 and 12
      val2 = 1 + Math.floor(Math.random() * 12); 
      val3 = 1 + Math.floor(Math.random() * 12); 
      val4 = 1 + Math.floor(Math.random() * 12); 
      
    //same value prevention
      while (val1 === val2) {
        val2 = 1 + Math.floor(Math.random() * 12); 
      }
      while (val3 === val2 || val3 === val1 ) {
        val3 = 1 + Math.floor(Math.random() * 12); 
      }
      while (val4 === val2 || val4 === val1 || val4 === val3 ) {
        val4 = 1 + Math.floor(Math.random() * 12); 
      }
      return [val1, val2, val3, val4]
    },

    targetvalRNG: function(){
        //generates a value between 19 and 120
        targetval = 19 + Math.floor(Math.random() * 102); 
        return targetval
    },

    winCheck: function(current,target){
        if(current == target){
            alert("win");
            game.reset();
        }else if(current >= target){
            alert("lose");
            game.reset();
        }
    },

    reset: function(){
        game.userScore = 0;
        game.targetScore = game.targetvalRNG();
        $("#targetScore").text(game.targetScore);
        game.crystalval = game.crystalvalRNG();

    },
}

$(document).ready(function () {

    game.reset()
    for(var i =1; i<=4; i++){
    $("#crystal"+i).attr("value",game.crystalval[i-1]);
    }
    $(".crystalimg").on("click", function () {
        game.userScore += parseInt( $(this).attr("value"));
        $("#userScore").text(game.userScore);
        game.winCheck(game.userScore,game.targetScore);
    });
    

});
