var request = new XMLHttpRequest();
request.open('GET', 'https://api.opendota.com/api/players/49697106/wordcloud?limit=100', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
    console.log(data);

    if (data.my_word_counts.gg > 70 ){
      var d = document.getElementById("ggout");
      d.className += " has-square";
    }

  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();