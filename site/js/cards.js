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

function cardBountiful(card_id){
  let card_name = "Bountiful";
  let card_tooltip ="Pick up 10+ Bounty runes";
  addSquare(card_id, card_name, card_tooltip, ifExists(player.runes[5])> 10);
}

function cardStopComing(card_id){
  let card_name = "Bully";
  let card_tooltip ="Kill the same player 5+ times";
  let most_killed = 0;

  let obj = player.killed;
  Object.keys(obj).forEach(function(key) {
    if(key.includes("npc_dota_hero")){
      if(obj[key] > most_killed) {
          most_killed = obj[key];
      }
    }
  });
  addSquare(card_id, card_name, card_tooltip, most_killed > 4);
}

function cardRich(card_id){
  let card_name = "Trust Fund";
  let card_tooltip ="600+ gpm";

  addSquare(card_id, card_name, card_tooltip, player.benchmarks.gold_per_min.raw > 600);
}

function cardEfficient(card_id){
  let card_name = "Black^ fanboy";
  let card_tooltip ="10+ lasthits/minute";

  addSquare(card_id, card_name, card_tooltip, player.benchmarks.last_hits_per_min.raw > 10);
}

function cardRampage(card_id){
  let card_name = "Ultra Kill";
  let card_tooltip ="Get an Ultra Kill";

  if(ifExists(player.multi_kills[5])){
    addSquare(card_id, "Rampage!", "Get a Rampage", true);
  }else {
    addSquare(card_id, card_name, card_tooltip, ifExists(player.multi_kills[4]));
  }
}

function cardBuybacks(card_id){
  let card_name = "Insert Coins to Continue";
  let card_tooltip ="More than one buyback";

  addSquare(card_id, card_name, card_tooltip, buyback_count > 1);
}

function cardFountainDive(card_id){
  let card_name = "What Objective?";
  let card_tooltip ="Take damage from the enemy team's fountain";

  addSquare(card_id, card_name, card_tooltip, ifExists(player.damage_taken.dota_fountain) > 0);
}

function cardDewarded(card_id){
  let card_name = "Map Controlled";
  let card_tooltip = "3+ observer wards killed"

  addSquare(card_id, card_name, card_tooltip, player.observer_kills > 2);
}

function cardStacks(card_id){
  let card_name = "401k";
  let card_tooltip = "Stack 5+ camps";

  addSquare(card_id, card_name, card_tooltip, player.camps_stacked > 4);
}

function cardCourierSnipe(card_id){
  let card_name = "Animal Abuse";
  let card_tooltip = "Kill the enemy courier";

  addSquare(card_id, card_name, card_tooltip, player.courier_kills > 0);
}

function cardDenies(card_id){
  let card_name = "Dendi?";
  let card_tooltip = "25+ denies";

  addSquare(card_id, card_name, card_tooltip, player.denies > 24);
}

function cardLateDonkey(card_id){
  let card_name = "No Fly Zone";
  let card_tooltip = "Walking courier past 6 minutes";
  let courier_time = -1;

  for(let i=0; i<10; i++) {
    if(data.players[i].isRadiant == player_side){
      if(data.players[i].first_purchase_time.flying_courier){
        courier_time = data.players[i].first_purchase_time.flying_courier;
      }
    }
  }
  addSquare(card_id, card_name, card_tooltip, courier_time > 360);
}