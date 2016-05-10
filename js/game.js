$(document).ready(function(){
  //$('#header ul').addClass('hide');
  //$('#header').append('<div class="leftButton" onclick="toggleMenu()">Menu</div>');

  $('#addPlayerButton').bind('click', addPlayer);
  $('#distributeTopicButton').bind('click', buildScreen2);
  addPlayer({ name: "Alice" } );
  addPlayer({ name: "Bob" } );
  addPlayer({ name: "Charlie" } );
});

function toggleMenu() {
  $('#header ul').toggleClass('hide');
  $('#header .leftButton').toggleClass('pressed');
}

function getPlayersFromForm(){
  $('.playerNameInput')
}


function assert(message, expr) {
  if (!expr) {
    throw new Error(message);
  }
  assert.count++;
  return true;
}

assert.count = 0;

function deletePlayer(foo){
  console.log('deleting player' + foo);
  $(foo).parent().remove();
}

function addPlayer(opts){
  var numPlayers = $('#playerList li').size();
  var n = opts.name || ("Player" + (numPlayers + 1));
  $("<li><input type='text' class='playerNameInput' value='"+n+"'/><span class='deletePlayer' onclick='deletePlayer(this);'>(delete)</span></li>").appendTo('#playerList');
}

function buildScreen2(){
  console.log('building screen 2');
  var playerLIs = $('#playerList li').size();
}
