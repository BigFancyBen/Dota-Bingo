var player_id = 49697106;
var request = new XMLHttpRequest();
request.open('GET', 'https://api.opendota.com/api/players/'+ player_id +'/wordcloud?limit=100', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);

    if (data.my_word_counts.gg > 70 ){
      var d = document.getElementById("ggout");
      d.className += " has-square";
    }

    if (data.all_word_counts.gg < 250 ){
      var d = document.getElementById("nogg");
      d.className += " has-square";
    }

  } else {
    // We reached our target server, but it returned an error

  }
};

var request2 = new XMLHttpRequest();
request2.open('GET', 'https://api.opendota.com/api/players/'+ player_id +'/pros?limit=100&win=1', true);

request2.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
  }
}

request.send();
request2.send();