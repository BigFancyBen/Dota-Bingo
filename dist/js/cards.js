function checkSquares() {

  cardStrHeroes("card-5-3");
  cardKillStreaks("card-3-1");
  cardFarmFail("card-1-2");
  cardQuickBlink("card-2-3");

}

function cardKillStreaks(card_id){
  let card_name = "Killing Frenzy";
  let card_tooltip ="10+ kill streak";
  if (player.kill_streaks) {
    if (player.kill_streaks[15] >= 1) {
      addSquare(card_id, "Running Riot", "15+ kill streak", true);
    } else if (player.kill_streaks[10] >= 1) {
      addSquare(card_id, card_name, card_tooltip, true);
    } else {
      addSquare(card_id, card_name, card_tooltip, false);
    }
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardStrHeroes(card_id){
  let card_name = "Popeye's Spinach";
  let card_tooltip ="5 strength heroes";
  let str_heroes = 0;

  for(i=0; i<10; i++){
    if(data.players[i].isRadiant == player_side ){
      let x = parseInt([data.players[i].hero_id])-2;
      if (heroes[x].primary_attr == "str"){
        str_heroes++;
      }
    }
  }

  if (str_heroes == 5){
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardQuickBlink(card_id){
  let card_name = "In a blink";
  let card_tooltip = "Farm a blink dagger before 12 minutes";

  if (player.first_purchase_time.blink < 720) {
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardFarmFail(card_id){
  let card_name = "Team???";
  let card_tooltip ="Lots of farm during laning, but lose the game";

  if (player.lane_efficiency_pct >= 80 && player_won == 0){
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function addSquare(card_id, card_name, card_tooltip, card_completed) {
  let card = `<span>${card_name}</span><div class='tooltip'>${card_tooltip}</div>`;
  let d = document.getElementById(card_id)
  d.innerHTML = card;

  if(card_completed) {
    d.className += " has-square";
  } else {
    d.classList.remove("has-square");
  }
}