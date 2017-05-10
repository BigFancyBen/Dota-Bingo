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
  let card_name = "Strength in Numbers";
  let card_tooltip ="6+ strength heroes in the game";
  let str_heroes = 0;

  for(let i=0; i<10; i++){
    if(current_heroes[i].primary_attr == "str"){
      str_heroes++;
    }
  }
  addSquare(card_id, card_name, card_tooltip, str_heroes >= 6);
}

function cardQuickBlink(card_id){
  let card_name = "In a blink";
  let card_tooltip = "Farm a blink dagger before 12 minutes";

  addSquare(card_id, card_name, card_tooltip, (player.first_purchase_time.blink || 1000) < 720);
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

  for(let i=0; i<10; i++){
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
  let lead_formatted = max_gold_lead.toLocaleString('en-US', {minimumFractionDigits: 0});

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
  if (data.radiant_win && data.chat){
    for(let i=0; i<data.chat.length; i++){
      if(data.chat[i].slot > 4) {
        if(data.chat[i].key.toLowerCase().includes("gg")){
          loser_ggs++;
        }
      }
    }
  } else if (data.chat) {
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

function cardSoloSupport(card_id){
  let card_name ="Single Mother of 4";
  let card_tooltip ="Buy 90%+ of the obs/sentries";
  let team_wards = 0;
  let player_wards = 0;
  let ward_pct = 0;

  for(let i=0; i<10; i++){
    if(data.players[i].isRadiant == player_side){
        team_wards += ifExists(data.players[i].purchase_ward_observer);
        team_wards += ifExists(data.players[i].purchase_ward_sentry);
    }
  }

  player_wards = ifExists(player.purchase_ward_observer) + ifExists(player.purchase_ward_sentry);
  if(team_wards>0){
    ward_pct = player_wards/team_wards;
  }
  addSquare(card_id, card_name, card_tooltip, ward_pct>=.9);
}

function cardDrowStrat(card_id){
  let card_name = "Drow Strat";
  let card_tooltip ="Drow Ranger with 3+ ranged heroes";
  let ranged_heroes = 0;
  let drow_side = null;

  for(let i=0; i<10; i++){
    if(data.players[i].hero_id == "6" ){
      drow_side = data.players[i].isRadiant
    }
  }
  if(drow_side != null){
    if(!drow_side){
      for(let i=5; i<10; i++){
        ranged_heroes++;
      }
    } else {
      for(let i=0; i<5; i++){
        ranged_heroes++;
      }
    }
  }
  addSquare(card_id, card_name, card_tooltip, ranged_heroes >= 3);
}

function cardObjectiveGamer(card_id){
  let card_name = "Wolves need no armor";
  let card_tooltip ="More building damage than hero damage";

  addSquare(card_id, card_name, card_tooltip, ifExists(player.tower_damage) > ifExists(player.hero_damage));
}