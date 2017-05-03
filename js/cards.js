function checkSquares() {
  let cardArray = [cardStrHeroes,cardKillStreaks,cardQuickBlink,cardFarmFail,cardMoneyHand];
  cardArray[0]("card-5-3");
  cardKillStreaks("card-3-1");
  cardFarmFail("card-1-2");
  cardQuickBlink("card-2-3");
  cardMoneyHand("card-1-5");
  cardRandomWin("card-2-1");
  cardThrowGame("card-3-5");
  cardSpeedrun("card-4-2");
  cardLongGame("card-1-4");
  cardSalty("card-1-1");

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

  addSquare(card_id, card_name, card_tooltip, str_heroes == 5);
}

function cardQuickBlink(card_id){
  let card_name = "In a blink";
  let card_tooltip = "Farm a blink dagger before 12 minutes";

  addSquare(card_id, card_name, card_tooltip, player.first_purchase_time.blink < 720);
}

function cardFarmFail(card_id){
  let card_name = "Team???";
  let card_tooltip ="Lots of farm during laning, but lose the game";

  addSquare(card_id, card_name, card_tooltip, player.lane_efficiency_pct >= 80 && player_won == 0);
}

function cardMoneyHand(card_id){
  let card_name = "Not Listening"
  let card_tooltip = "5+ midases in the game"

  let num_midases = 0;

  for(i=0; i<10; i++){
    if(data.players[i].item_usage.hand_of_midas){
      num_midases++;
    }
  }

  addSquare(card_id, card_name, card_tooltip, num_midases >= 5);
}

function cardRandomWin(card_id) {
  let card_name = "Gaben's Choice"
  let card_tooltip = "Random your hero and then win the game"

  addSquare(card_id, card_name, card_tooltip, player.randomed == true && player_won == 1);
}

function cardThrowGame(card_id) {
  let card_name = "322";
  let card_tooltip = "Be 10k+ gold ahead, but lose anyway"
  let max_gold_lead = 0;
  if(player_side == 1){
    for(let i = 0; i < data.radiant_gold_adv.length; i++) {
      if(data.radiant_gold_adv[i] > max_gold_lead ) {
        max_gold_lead = data.radiant_gold_adv[i];
      }
    }
  } else {
    for(let i = 0; i < data.radiant_gold_adv.length; i++) {
      if(data.radiant_gold_adv[i]*-1 > max_gold_lead ) {
        max_gold_lead = data.radiant_gold_adv[i]*-1;
      }
    }
  }
  var lead_formatted = max_gold_lead.toLocaleString('en-US', {minimumFractionDigits: 0});

  if(max_gold_lead > 10000 && player_won == 0) {
    addSquare(card_id, card_name,  `You threw a ${lead_formatted} gold lead`, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardSpeedrun(card_id) {
  let card_name ="Dota2 speedrun (any %)";
  let card_tooltip="Win in under 25 minutes";

  addSquare(card_id, card_name, card_tooltip, data.duration < 1500 && player_won);
}

function cardLongGame(card_id) {
  let card_name ="5 more minutes mom";
  let card_tooltip="Win a game that went on for longer than 1 hr";

  addSquare(card_id, card_name, card_tooltip, data.duration > 3600 && player_won);
}

function cardSalty(card_id){
  let card_name ="Salty";
  let card_tooltip ="Nobody on the losing team said GG";
  let loser_ggs = 0;
  if (data.radiant_win){
    for(let i=0; i<data.chat.length; i++){
      if(data.chat[i].slot > 4) {
        if(data.chat[i].key.toLowerCase().includes("gg")){
          loser_ggs++;
        }
      }
    }
  } else {
    for(let i=0; i<data.chat.length; i++){
      if(data.chat[i].slot < 5) {
        if(data.chat[i].key.toLowerCase().includes("gg")){
          loser_ggs++;
        }
      }
    }
  }

  addSquare(card_id, card_name, card_tooltip, loser_ggs == 0);
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