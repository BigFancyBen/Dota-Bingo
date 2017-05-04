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
let current_heroes = [];

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
              player_id = data.players[i].account_id;
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
              player_name = data.players[i].personaname.toLowerCase();
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