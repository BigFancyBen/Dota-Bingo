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

function cardMoneyHand(card_id){
  let card_name = "Not Listening"
  let card_tooltip = "5+ midases in the game"

  let num_midases = 0;

  for(i=0; i<10; i++){
    if(data.players[i].item_usage.hand_of_midas){
      num_midases++;
    }
  }

  if (num_midases >= 5){
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardRandomWin(card_id) {
  let card_name = "Gaben's Choice"
  let card_tooltip = "Random your hero and then win the game"

  if(player.randomed == true && player_won == 1) {
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
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

  if(data.duration < 1500 && player_won){
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
}

function cardLongGame(card_id) {
  let card_name ="5 more minutes mom";
  let card_tooltip="Win a game that went on for longer than 1 hr";

  if(data.duration > 3600 && player_won){
    addSquare(card_id, card_name, card_tooltip, true);
  } else {
    addSquare(card_id, card_name, card_tooltip, false);
  }
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

  if(loser_ggs == 0){
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
let heroes = [{"id":1,"name":"npc_dota_hero_antimage","localized_name":"Anti-Mage","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Nuker"]},{"id":2,"name":"npc_dota_hero_axe","localized_name":"Axe","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Durable","Disabler","Jungler"]},{"id":3,"name":"npc_dota_hero_bane","localized_name":"Bane","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker","Durable"]},{"id":4,"name":"npc_dota_hero_bloodseeker","localized_name":"Bloodseeker","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Disabler","Jungler","Nuker","Initiator"]},{"id":5,"name":"npc_dota_hero_crystal_maiden","localized_name":"Crystal Maiden","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker","Jungler"]},{"id":6,"name":"npc_dota_hero_drow_ranger","localized_name":"Drow Ranger","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Disabler","Pusher"]},{"id":7,"name":"npc_dota_hero_earthshaker","localized_name":"Earthshaker","primary_attr":"str","attack_type":"Melee","roles":["Support","Initiator","Disabler","Nuker"]},{"id":8,"name":"npc_dota_hero_juggernaut","localized_name":"Juggernaut","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Pusher","Escape"]},{"id":9,"name":"npc_dota_hero_mirana","localized_name":"Mirana","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Support","Escape","Nuker","Disabler"]},{"id":10,"name":"npc_dota_hero_morphling","localized_name":"Morphling","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Escape","Durable","Nuker","Disabler"]},{"id":11,"name":"npc_dota_hero_nevermore","localized_name":"Shadow Fiend","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Nuker"]},{"id":12,"name":"npc_dota_hero_phantom_lancer","localized_name":"Phantom Lancer","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Pusher","Nuker"]},{"id":13,"name":"npc_dota_hero_puck","localized_name":"Puck","primary_attr":"int","attack_type":"Ranged","roles":["Initiator","Disabler","Escape","Nuker"]},{"id":14,"name":"npc_dota_hero_pudge","localized_name":"Pudge","primary_attr":"str","attack_type":"Melee","roles":["Disabler","Initiator","Durable","Nuker"]},{"id":15,"name":"npc_dota_hero_razor","localized_name":"Razor","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Durable","Nuker","Pusher"]},{"id":16,"name":"npc_dota_hero_sand_king","localized_name":"Sand King","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Nuker","Escape","Jungler"]},{"id":17,"name":"npc_dota_hero_storm_spirit","localized_name":"Storm Spirit","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Escape","Nuker","Initiator","Disabler"]},{"id":18,"name":"npc_dota_hero_sven","localized_name":"Sven","primary_attr":"str","attack_type":"Melee","roles":["Carry","Disabler","Initiator","Durable","Nuker"]},{"id":19,"name":"npc_dota_hero_tiny","localized_name":"Tiny","primary_attr":"str","attack_type":"Melee","roles":["Carry","Nuker","Pusher","Initiator","Durable","Disabler"]},{"id":20,"name":"npc_dota_hero_vengefulspirit","localized_name":"Vengeful Spirit","primary_attr":"agi","attack_type":"Ranged","roles":["Support","Initiator","Disabler","Nuker","Escape"]},{"id":21,"name":"npc_dota_hero_windrunner","localized_name":"Windranger","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Support","Disabler","Escape","Nuker"]},{"id":22,"name":"npc_dota_hero_zuus","localized_name":"Zeus","primary_attr":"int","attack_type":"Ranged","roles":["Nuker"]},{"id":23,"name":"npc_dota_hero_kunkka","localized_name":"Kunkka","primary_attr":"str","attack_type":"Melee","roles":["Carry","Disabler","Initiator","Durable","Nuker"]},{"id":25,"name":"npc_dota_hero_lina","localized_name":"Lina","primary_attr":"int","attack_type":"Ranged","roles":["Support","Carry","Nuker","Disabler"]},{"id":26,"name":"npc_dota_hero_lion","localized_name":"Lion","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker","Initiator"]},{"id":27,"name":"npc_dota_hero_shadow_shaman","localized_name":"Shadow Shaman","primary_attr":"int","attack_type":"Ranged","roles":["Support","Pusher","Disabler","Nuker","Initiator"]},{"id":28,"name":"npc_dota_hero_slardar","localized_name":"Slardar","primary_attr":"str","attack_type":"Melee","roles":["Carry","Durable","Initiator","Disabler","Escape"]},{"id":29,"name":"npc_dota_hero_tidehunter","localized_name":"Tidehunter","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Durable","Disabler","Nuker"]},{"id":30,"name":"npc_dota_hero_witch_doctor","localized_name":"Witch Doctor","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Disabler"]},{"id":31,"name":"npc_dota_hero_lich","localized_name":"Lich","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker"]},{"id":32,"name":"npc_dota_hero_riki","localized_name":"Riki","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Disabler"]},{"id":33,"name":"npc_dota_hero_enigma","localized_name":"Enigma","primary_attr":"int","attack_type":"Ranged","roles":["Disabler","Jungler","Initiator","Pusher"]},{"id":34,"name":"npc_dota_hero_tinker","localized_name":"Tinker","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Nuker","Pusher"]},{"id":35,"name":"npc_dota_hero_sniper","localized_name":"Sniper","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Nuker"]},{"id":36,"name":"npc_dota_hero_necrolyte","localized_name":"Necrophos","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Nuker","Durable","Disabler"]},{"id":37,"name":"npc_dota_hero_warlock","localized_name":"Warlock","primary_attr":"int","attack_type":"Ranged","roles":["Support","Initiator","Disabler"]},{"id":38,"name":"npc_dota_hero_beastmaster","localized_name":"Beastmaster","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Durable","Nuker"]},{"id":39,"name":"npc_dota_hero_queenofpain","localized_name":"Queen of Pain","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Nuker","Escape"]},{"id":40,"name":"npc_dota_hero_venomancer","localized_name":"Venomancer","primary_attr":"agi","attack_type":"Ranged","roles":["Support","Nuker","Initiator","Pusher","Disabler"]},{"id":41,"name":"npc_dota_hero_faceless_void","localized_name":"Faceless Void","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Initiator","Disabler","Escape","Durable"]},{"id":42,"name":"npc_dota_hero_skeleton_king","localized_name":"Wraith King","primary_attr":"str","attack_type":"Melee","roles":["Carry","Support","Durable","Disabler","Initiator"]},{"id":43,"name":"npc_dota_hero_death_prophet","localized_name":"Death Prophet","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Pusher","Nuker","Disabler"]},{"id":44,"name":"npc_dota_hero_phantom_assassin","localized_name":"Phantom Assassin","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape"]},{"id":45,"name":"npc_dota_hero_pugna","localized_name":"Pugna","primary_attr":"int","attack_type":"Ranged","roles":["Nuker","Pusher"]},{"id":46,"name":"npc_dota_hero_templar_assassin","localized_name":"Templar Assassin","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Escape"]},{"id":47,"name":"npc_dota_hero_viper","localized_name":"Viper","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Durable","Initiator","Disabler"]},{"id":48,"name":"npc_dota_hero_luna","localized_name":"Luna","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Nuker","Pusher"]},{"id":49,"name":"npc_dota_hero_dragon_knight","localized_name":"Dragon Knight","primary_attr":"str","attack_type":"Melee","roles":["Carry","Pusher","Durable","Disabler","Initiator","Nuker"]},{"id":50,"name":"npc_dota_hero_dazzle","localized_name":"Dazzle","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Disabler"]},{"id":51,"name":"npc_dota_hero_rattletrap","localized_name":"Clockwerk","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Durable","Nuker"]},{"id":52,"name":"npc_dota_hero_leshrac","localized_name":"Leshrac","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Support","Nuker","Pusher","Disabler"]},{"id":53,"name":"npc_dota_hero_furion","localized_name":"Nature's Prophet","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Jungler","Pusher","Escape","Nuker"]},{"id":54,"name":"npc_dota_hero_life_stealer","localized_name":"Lifestealer","primary_attr":"str","attack_type":"Melee","roles":["Carry","Durable","Jungler","Escape","Disabler"]},{"id":55,"name":"npc_dota_hero_dark_seer","localized_name":"Dark Seer","primary_attr":"int","attack_type":"Melee","roles":["Initiator","Jungler","Escape","Disabler"]},{"id":56,"name":"npc_dota_hero_clinkz","localized_name":"Clinkz","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Escape","Pusher"]},{"id":57,"name":"npc_dota_hero_omniknight","localized_name":"Omniknight","primary_attr":"str","attack_type":"Melee","roles":["Support","Durable","Nuker"]},{"id":58,"name":"npc_dota_hero_enchantress","localized_name":"Enchantress","primary_attr":"int","attack_type":"Ranged","roles":["Support","Jungler","Pusher","Durable","Disabler"]},{"id":59,"name":"npc_dota_hero_huskar","localized_name":"Huskar","primary_attr":"str","attack_type":"Ranged","roles":["Carry","Durable","Initiator"]},{"id":60,"name":"npc_dota_hero_night_stalker","localized_name":"Night Stalker","primary_attr":"str","attack_type":"Melee","roles":["Carry","Initiator","Durable","Disabler","Nuker"]},{"id":61,"name":"npc_dota_hero_broodmother","localized_name":"Broodmother","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Pusher","Escape","Nuker"]},{"id":62,"name":"npc_dota_hero_bounty_hunter","localized_name":"Bounty Hunter","primary_attr":"agi","attack_type":"Melee","roles":["Escape","Nuker"]},{"id":63,"name":"npc_dota_hero_weaver","localized_name":"Weaver","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Escape"]},{"id":64,"name":"npc_dota_hero_jakiro","localized_name":"Jakiro","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Pusher","Disabler"]},{"id":65,"name":"npc_dota_hero_batrider","localized_name":"Batrider","primary_attr":"int","attack_type":"Ranged","roles":["Initiator","Jungler","Disabler","Escape"]},{"id":66,"name":"npc_dota_hero_chen","localized_name":"Chen","primary_attr":"int","attack_type":"Ranged","roles":["Support","Jungler","Pusher"]},{"id":67,"name":"npc_dota_hero_spectre","localized_name":"Spectre","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Durable","Escape"]},{"id":68,"name":"npc_dota_hero_ancient_apparition","localized_name":"Ancient Apparition","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker"]},{"id":69,"name":"npc_dota_hero_doom_bringer","localized_name":"Doom","primary_attr":"str","attack_type":"Melee","roles":["Carry","Disabler","Initiator","Durable","Nuker"]},{"id":70,"name":"npc_dota_hero_ursa","localized_name":"Ursa","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Jungler","Durable","Disabler"]},{"id":71,"name":"npc_dota_hero_spirit_breaker","localized_name":"Spirit Breaker","primary_attr":"str","attack_type":"Melee","roles":["Carry","Initiator","Disabler","Durable","Escape"]},{"id":72,"name":"npc_dota_hero_gyrocopter","localized_name":"Gyrocopter","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Nuker","Disabler"]},{"id":73,"name":"npc_dota_hero_alchemist","localized_name":"Alchemist","primary_attr":"str","attack_type":"Melee","roles":["Carry","Support","Durable","Disabler","Initiator","Nuker"]},{"id":74,"name":"npc_dota_hero_invoker","localized_name":"Invoker","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Nuker","Disabler","Escape","Pusher"]},{"id":75,"name":"npc_dota_hero_silencer","localized_name":"Silencer","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Support","Disabler","Initiator","Nuker"]},{"id":76,"name":"npc_dota_hero_obsidian_destroyer","localized_name":"Outworld Devourer","primary_attr":"int","attack_type":"Ranged","roles":["Carry","Nuker","Disabler"]},{"id":77,"name":"npc_dota_hero_lycan","localized_name":"Lycan","primary_attr":"str","attack_type":"Melee","roles":["Carry","Pusher","Jungler","Durable","Escape"]},{"id":78,"name":"npc_dota_hero_brewmaster","localized_name":"Brewmaster","primary_attr":"str","attack_type":"Melee","roles":["Carry","Initiator","Durable","Disabler","Nuker"]},{"id":79,"name":"npc_dota_hero_shadow_demon","localized_name":"Shadow Demon","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Initiator","Nuker"]},{"id":80,"name":"npc_dota_hero_lone_druid","localized_name":"Lone Druid","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Pusher","Jungler","Durable"]},{"id":81,"name":"npc_dota_hero_chaos_knight","localized_name":"Chaos Knight","primary_attr":"str","attack_type":"Melee","roles":["Carry","Disabler","Durable","Pusher","Initiator"]},{"id":82,"name":"npc_dota_hero_meepo","localized_name":"Meepo","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Nuker","Disabler","Initiator","Pusher"]},{"id":83,"name":"npc_dota_hero_treant","localized_name":"Treant Protector","primary_attr":"str","attack_type":"Melee","roles":["Support","Initiator","Durable","Disabler","Escape"]},{"id":84,"name":"npc_dota_hero_ogre_magi","localized_name":"Ogre Magi","primary_attr":"int","attack_type":"Melee","roles":["Support","Nuker","Disabler","Durable","Initiator"]},{"id":85,"name":"npc_dota_hero_undying","localized_name":"Undying","primary_attr":"str","attack_type":"Melee","roles":["Support","Durable","Disabler","Nuker"]},{"id":86,"name":"npc_dota_hero_rubick","localized_name":"Rubick","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker"]},{"id":87,"name":"npc_dota_hero_disruptor","localized_name":"Disruptor","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker","Initiator"]},{"id":88,"name":"npc_dota_hero_nyx_assassin","localized_name":"Nyx Assassin","primary_attr":"agi","attack_type":"Melee","roles":["Disabler","Nuker","Initiator","Escape"]},{"id":89,"name":"npc_dota_hero_naga_siren","localized_name":"Naga Siren","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Support","Pusher","Disabler","Initiator","Escape"]},{"id":90,"name":"npc_dota_hero_keeper_of_the_light","localized_name":"Keeper of the Light","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Disabler","Jungler"]},{"id":91,"name":"npc_dota_hero_wisp","localized_name":"Io","primary_attr":"str","attack_type":"Ranged","roles":["Support","Escape","Nuker"]},{"id":92,"name":"npc_dota_hero_visage","localized_name":"Visage","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Durable","Disabler","Pusher"]},{"id":93,"name":"npc_dota_hero_slark","localized_name":"Slark","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Disabler","Nuker"]},{"id":94,"name":"npc_dota_hero_medusa","localized_name":"Medusa","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Disabler","Durable"]},{"id":95,"name":"npc_dota_hero_troll_warlord","localized_name":"Troll Warlord","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Pusher","Disabler","Durable"]},{"id":96,"name":"npc_dota_hero_centaur","localized_name":"Centaur Warrunner","primary_attr":"str","attack_type":"Melee","roles":["Durable","Initiator","Disabler","Nuker","Escape"]},{"id":97,"name":"npc_dota_hero_magnataur","localized_name":"Magnus","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Nuker","Escape"]},{"id":98,"name":"npc_dota_hero_shredder","localized_name":"Timbersaw","primary_attr":"str","attack_type":"Melee","roles":["Nuker","Durable","Escape"]},{"id":99,"name":"npc_dota_hero_bristleback","localized_name":"Bristleback","primary_attr":"str","attack_type":"Melee","roles":["Carry","Durable","Initiator","Nuker"]},{"id":100,"name":"npc_dota_hero_tusk","localized_name":"Tusk","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Nuker"]},{"id":101,"name":"npc_dota_hero_skywrath_mage","localized_name":"Skywrath Mage","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Disabler"]},{"id":102,"name":"npc_dota_hero_abaddon","localized_name":"Abaddon","primary_attr":"str","attack_type":"Melee","roles":["Support","Carry","Durable"]},{"id":103,"name":"npc_dota_hero_elder_titan","localized_name":"Elder Titan","primary_attr":"str","attack_type":"Melee","roles":["Initiator","Disabler","Nuker","Durable"]},{"id":104,"name":"npc_dota_hero_legion_commander","localized_name":"Legion Commander","primary_attr":"str","attack_type":"Melee","roles":["Carry","Disabler","Initiator","Durable","Nuker"]},{"id":105,"name":"npc_dota_hero_techies","localized_name":"Techies","primary_attr":"int","attack_type":"Ranged","roles":["Nuker","Disabler"]},{"id":106,"name":"npc_dota_hero_ember_spirit","localized_name":"Ember Spirit","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Nuker","Disabler","Initiator"]},{"id":107,"name":"npc_dota_hero_earth_spirit","localized_name":"Earth Spirit","primary_attr":"str","attack_type":"Melee","roles":["Nuker","Escape","Disabler","Initiator","Durable"]},{"id":108,"name":"npc_dota_hero_abyssal_underlord","localized_name":"Underlord","primary_attr":"str","attack_type":"Melee","roles":["Support","Nuker","Disabler","Durable","Escape"]},{"id":109,"name":"npc_dota_hero_terrorblade","localized_name":"Terrorblade","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Pusher","Nuker"]},{"id":110,"name":"npc_dota_hero_phoenix","localized_name":"Phoenix","primary_attr":"str","attack_type":"Ranged","roles":["Support","Nuker","Initiator","Escape","Disabler"]},{"id":111,"name":"npc_dota_hero_oracle","localized_name":"Oracle","primary_attr":"int","attack_type":"Ranged","roles":["Support","Nuker","Disabler","Escape"]},{"id":112,"name":"npc_dota_hero_winter_wyvern","localized_name":"Winter Wyvern","primary_attr":"int","attack_type":"Ranged","roles":["Support","Disabler","Nuker"]},{"id":113,"name":"npc_dota_hero_arc_warden","localized_name":"Arc Warden","primary_attr":"agi","attack_type":"Ranged","roles":["Carry","Escape","Nuker"]},{"id":114,"name":"npc_dota_hero_monkey_king","localized_name":"Monkey King","primary_attr":"agi","attack_type":"Melee","roles":["Carry","Escape","Disabler","Initiator"]}];

// let player_id = 49697106;
// let match_id = 3132493264;
// let player_name = "Big Fancy Ben";
let player_id = "";
let match_id = "";
let player_name = "";
let player_slot = "";
let player_side = "";
let player_won = "";
let player_hero = "";
let data = "";
let player = "";

let queryString = (window.location.search).substring(1);
if (queryString){
  queries = queryString.split("&");
  for(let i=0; i<queries.length; i++) {
    let param = queries[i].split('=');
    if (param[0] == "match_id") {
      match_id=param[1];
      document.getElementById("match-id").value = match_id;
    }
    if (param[0] == "player_id"){
      player_id=param[1];
      document.getElementById("steam-acc").value = player_id;
    }
    if (param[0] == "player_name"){
      player_name = decodeURI(param[1]);
      document.getElementById("steam-name").value = player_name;
      player_name = player_name.toLowerCase();
    }
  }
  makeCard();
}

document.getElementById("submit-button").onclick = function getCardInput () {
  match_id = document.getElementById("match-id").value;
  player_name = document.getElementById("steam-name").value;
  player_name = player_name.toLowerCase();
  console.log(player_name);
  player_id = document.getElementById("steam-acc").value;
  if (match_id == "") {
    console.log("No Match ID");
  } if (player_name == "" && player_id == "") {
    console.log("No player info");
  } else {
    let queryParamString = `match_id=${match_id}&player_id=${player_id}&player_name=${player_name}`;
    history.pushState (null, null, "?" + queryParamString);
    makeCard();
  }

}

function makeCard () {
  let request = new XMLHttpRequest();
  console.log(match_id);
  console.log(player_name);
  request.open('GET', 'https://api.opendota.com/api/matches/'+ match_id, true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      data = JSON.parse(this.response);
      console.log(data);
      if(player_name){
        for(i=0; i<10; i++){
          if(data.players[i].personaname)  {
            if (data.players[i].personaname.toLowerCase() == player_name) {
              player_slot = i;
              setPlayerVars();
            }
          }
        }
      }
      else if (player_id) {
        for(i=0; i<10; i++){
          if(data.players[i].account_id)  {
            if (data.players[i].account_id == player_id) {
              player_slot = i;
              setPlayerVars();
            }
          }
        }
      }
      checkSquares();
    } else {
      console.log("opendota api error");
    }
  };
  request.send();
}

function setPlayerVars() {
  player = data.players[player_slot];
  console.log(player);
  player_won = !!player.win;
  player_side = player.isRadiant;
  player_hero = player.hero_id;
}