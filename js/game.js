"use strict";

//TODO: Display that a game-master has seen the topic for this round, 
//      if it's been peeked or manually set.

//TODO: when adding or deleting players, ensure that current topicInfo and
// gInfos are all wiped.  A deleted player could have been the impostor...

//TODO: leave the player names (buttons) in original order.

var currentTopicInfo;
var gInfos;

var topicsInfoList = [
  {category: "Activity", topic: "Fishing", difficulty: 1},
  {category: "Activity", topic: "Sailing", difficulty: 1},
  {category: "Activity", topic: "Ballet Dancing", difficulty: 2},  
  {category: "Activity", topic: "Wine Tasting", difficulty: 2},  
  {category: "Animal", topic: "Dog", difficulty: 1},
  {category: "Animal", topic: "Cat", difficulty: 1},
  {category: "Animal", topic: "Lion", difficulty: 1},
  {category: "Animal", topic: "Giraffe", difficulty: 1},
  {category: "Animal", topic: "Octopus", difficulty: 1},
  {category: "Animal", topic: "Rhino", difficulty: 1},
  {category: "Animal", topic: "Elephant", difficulty: 1},
  {category: "Famous Landmark", topic: "Eiffel Tower", difficulty: 1},
  {category: "Famous Landmark", topic: "Big Ben", difficulty: 1},
  {category: "Famous Landmark", topic: "Pyramids", difficulty: 1},
  {category: "Famous Landmark", topic: "Niagara Falls", difficulty: 1},
  {category: "Food/Drink", topic: "Ice Cube", difficulty: 2},
  {category: "Food/Drink", topic: "Banana", difficulty: 2},
  {category: "Food/Drink", topic: "", difficulty: 2},
  {category: "Profession", topic: "Wrestler", difficulty: 2},
  {category: "Profession", topic: "Policeman", difficulty: 2},
  {category: "Profession", topic: "Assassin", difficulty: 2},
  {category: "Profession", topic: "Painter", difficulty: 2},
  {category: "Profession", topic: "Fisherman", difficulty: 1},
  {category: "Science", topic: "Space Station", difficulty: 1},
  {category: "Science", topic: "Mars Rover", difficulty: 1},
  {category: "Science", topic: "Mars Rover", difficulty: 1},
  {category: "Science", topic: "antimatter", difficulty: 3},
  {category: "Science-Fiction", topic: "Teleporter", difficulty: 1},
  {category: "Science-Fiction", topic: "Teleporter", difficulty: 1},
  {category: "Sport", topic: "Rugby", difficulty: 1},    
  {category: "Transportation", topic: "Dog Sled", difficulty: 2},
  {category: "Transportation", topic: "Wind Surfer", difficulty: 2},
  {category: "Vehicle", topic: "Submarine", difficulty: 1},
  {category: "Vehicle", topic: "Tug Boat", difficulty: 1},
  {category: "Vehicle", topic: "Breakdown recovery truck", difficulty: 2},
  {category: "Vehicle", topic: "Tractor", difficulty: 1},
  {category: "Vehicle", topic: "Combine Harvester", difficulty: 1},
  {category: "Vehicle", topic: "Motorbike", difficulty: 1},
  {category: "Vehicle", topic: "Ambulance", difficulty: 1},
  {category: "Vehicle", topic: "Helicopter", difficulty: 1},
]
$(document).ready(function(){
  //$('#header ul').addClass('hide');
  //$('#header').append('<div class="leftButton" onclick="toggleMenu()">Menu</div>');
  currentTopicInfo = null;

  $('#addPlayerButton').bind('click', addPlayer);
  $('#show').bind('click', function() { 
    $('#showRoleDialog')[0].show();
  });
  $('#exit').bind('click', function() { 
    $('#showRoleDialog')[0].close();
  });

  $('#setTopicButton').bind('click', function() { 
    $('#topicInputDialog #topicInput')[0].value = "";
    $('#topicInputDialog #categoryInput')[0].value = "";
    $('#topicInputDialog')[0].show();
  });
  $('#randomTopicButton').bind('click', function() { 
    setRandomTopic();
  });

  $('#exitTopicInputDialogButton').bind('click', function() { 
    $('#topicInputDialog')[0].close();
  });
  $('#saveAndExitTopicInputDialogButton').bind('click', function() { 
    var info = {
      topic: $('#topicInputDialog #topicInput')[0].value, 
      category: $('#topicInputDialog #categoryInput')[0].value
    };
    setTopicInfo(info);
    //TODO: validate topic and category are present
    $('#topicInputDialog')[0].close();
  });


  $('#editGameButton').bind('click', editGame);
  $('#distributeTopicButton').bind('click', buildScreen2);
  $('#endAndRevealButton').bind('click', revealImpostor);
  $('#exitRevealDialogButton').bind('click', function() {
    $('#revealDialog')[0].close(); });
  $('#startButton').bind('click', buildScreen3);
  buildScreen1();
});

function buildScreen1(){
  changeScreenTo('#screenSetPlayers');
  ["Alice", "Bob", "Charlie", "Dave", "Eric"].forEach(function(n) {
    addPlayer({ name: n } );    
  });
  $('#distributeTopicButton').hide();
}

function buildScreen3(){
  changeScreenTo('#screenGameInProgress');
}
function editGame(){
  changeScreenTo('#screenSetPlayers');
}
function setTopicInfo(info){
    currentTopicInfo = info;
    updateCategoryDisplay();
    if(currentTopicInfo.topic && currentTopicInfo.category){
      $('#distributeTopicButton').show();
    } else {
      $('#distributeTopicButton').hide();
    }
}
function updateCategoryDisplay(){
  $('#categoryDisplay')[0].innerHTML = currentTopicInfo.category;
}

function toggleMenu() {
  $('#header ul').toggleClass('hide');
  $('#header .leftButton').toggleClass('pressed');
}

function getPlayersFromForm(){
  return $('.playerNameInput');
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



function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(deck){
  // For each element in the array, swap with a randomly chosen lower element
  var len = deck.length;
  for(var i = len-1; i > 0; i--) {
    var r = Math.floor(Math.random()*(i+1)), temp; // Random number
    temp = deck[i];
    deck[i] = deck[r];
    deck[r] = temp; // Swap
  }
  return deck;
}

function randInt(n){
  return Math.floor(Math.random() * n);
}

function two(thing){
  console.log("two: "+ thing);
}

function setRandomTopic(){
  //TODO: don't pick a topic we've played already in this session.
  var randomPick = pick(topicsInfoList);
  setTopicInfo(randomPick);  
}

function changeScreenTo(screenId){

  $('.screen').hide();
  $(screenId).show();
}

function buildScreen2(){
  if (!currentTopicInfo) {
    console.log("Can't proceed - no topic set.");
    return;
  }
  console.log('Building screen 2');
  //TODO: disable add/remove players controls.
  changeScreenTo('#screenDistributeTopic');
  var topic = currentTopicInfo.topic;
  var category = currentTopicInfo.category;

  var playerLIs = $('#playerList li');
  //remove existing elems of show-list
  $('#playerListForShowTopic li').remove();
  $('#startButton').hide();
  
  var numPlayers = playerLIs.size();
  gInfos = [];
  playerLIs.each(function(n, obj) {
    var playerName = $(obj).children()[0].value;
    gInfos.push({category: category, topic: topic, isImpostor: false, playerName: playerName});
  });
  shuffle(gInfos);
  gInfos[0].topic = "???";
  gInfos[0].isImpostor = true;
  shuffle(gInfos);
  
  playerLIs.each(function(n, obj) {
    var info = gInfos[n];    
    var labelText = info.playerName + ": " + info.topic + ", category: "+ info.category;
    var inp = $("<input type='button' value='"+labelText+"'/>");
    var li = $("<li>");
    inp.appendTo(li);
    inp.bind('click', function() { 
      showForPlayer(inp[0], info)
    });
    li.appendTo('#playerListForShowTopic');
  });
}
function revealImpostor(){
  $('#revealDialog')[0].show();
  var impostorInfo = gInfos.find(function(info) {
    return info.isImpostor;
  });
  $('#revealDialog .impostorName')[0].innerHTML = impostorInfo.playerName;
  $('#revealDialog .topic')[0].innerHTML = currentTopicInfo.topic;

}
function showForPlayer(obj, info){
  //TODO: Don't show topic for the impostor, show only the category.
  //TODO: Ensure dialog is cleared before and after being displayed, 
  //      so that no lazy rendering gives info away where it should not.
  if (info.isImpostor) {
    $('#showRoleDialog .topicDisplay')[0].innerHTML = "You're the impostor!";
    $('#showRoleDialog .topicDisplayLabel').hide();
  } else {
    $('#showRoleDialog .topicDisplay')[0].innerHTML = info.topic;
    $('#showRoleDialog .topicDisplayLabel').show();
  }
  $('#showRoleDialog .nameDisplay')[0].innerHTML = info.playerName;
  $('#showRoleDialog .categoryDisplay')[0].innerHTML = info.category;
  $('#showRoleDialog')[0].show();

  $(obj).parent().remove();
  var remainingPlayerCount = $('#playerListForShowTopic li').size();
  console.log(remainingPlayerCount);
  if (remainingPlayerCount < 1){
    $('#startButton').show();
  }
}
