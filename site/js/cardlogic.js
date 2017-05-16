function checkSquares() {
  let cardArray = [cardStrHeroes,cardKillStreaks,cardQuickBlink,cardFarmFail,
      cardMoneyHand,cardRandomWin,cardThrowGame,cardSpeedrun,cardLongGame,
      cardSalty,cardDrowStrat,cardSoloSupport,cardObjectiveGamer,cardBountiful,
      cardStopComing,cardRich,cardEfficient,cardRampage,cardFountainDive];

  let randomCard = shuffle(cardArray, player_id);
  let currentCard = 0;
  matchHeroes();

  while(randomCard[currentCard]){
    for(let y = 1; y<6;y++){
      for(let x = 1; x<6;x++){
        if(!(x==3 && y==3)){
          if(typeof randomCard[currentCard] != 'undefined'){
            randomCard[currentCard](`card-${y}-${x}`);
            currentCard++;
          }
        }
      }
    }
  }
}

function addSquare(card_id, card_name, card_tooltip, card_completed) {
  let card = `<div class='tooltip'>${card_tooltip}</div><span>${card_name}</span>`;
  let d = document.getElementById(card_id)
  d.innerHTML = card;

  if(card_completed) {
    d.className += " has-square";
  } else {
    d.classList.remove("has-square");
  }
}

function ifExists (maybeExists){
  if(maybeExists){
    return maybeExists;
  }else{
    return 0;
  }
}

function matchHeroes () {
  for(let i=0; i<10; i++){
    let cur_hero = data.players[i].hero_id;
    for(let j=0; j<heroes.length;j++){
      if(heroes[j].id == cur_hero){
        current_heroes.push(heroes[j]);
      }
    }
  }
}