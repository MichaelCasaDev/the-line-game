/*...................
.........CONST.......
.....................*/

const body = document.body;
const menubarx = document.getElementById("menubar");
const gamestart = document.getElementById("gamestart");
const game = document.getElementById("game");
const lifenum = document.getElementById("life");
const num = document.getElementById("num");
const line = document.getElementById("line");
const score = document.getElementById("score");
const lose = document.getElementById("lose");
const retrybuttons = document.getElementById("retrybuttons");
const touchscreenbutton = document.getElementById("touch-screen");


/*.................
.........LET.......
...................*/

let speed;
let currentNumber;
let goingUp;
let running;
let life;
let level;



/*........................................
..........Essentials Code.................
..........................................*/

//Do a function when a key is pressed

//Key SPACEBAR code 32
//Key ESC code 27
window.addEventListener("keydown", onKeyDown);

//Disable GameDiv and MenuBarDiv on page load to display only GameStartDiv
window.onload = function(){
  gamestart.style.visibility = "visible";
  menubarx.style.visibility= "hidden";
  game.style.visibility = "hidden";
};



/*.......................................
.............Disable F12.................
.........................................*/

document.onkeypress = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
      return false;
  };
};
document.onmousedown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
      return false;
  };
};
document.onkeydown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
      return false;
  };
};



/*............................
..........Functions...........
..............................*/

//Reset the game variables when life=0 and on start

function reset() {
  speed = 35;
  currentNumber = 0;
  goingUp = true;
  running = false;
  life = 100;
  level = 1;
  retrybuttons.style.visibility = "hidden";
};


/*.......................................
.....Game Management Functions Here......
.........................................*/

function onKeyDown(e) {
  console.log("Key pressed: " + e.keyCode) //OnlyOn DEV
  if(e.keyCode === 32){
    console.log("Game Scene"); //OnlyOn DEV
    gameon();
    loop();
  }else if(e.keyCode === 27){
    console.log("Menu Scene"); //OnlyOn DEV
    menubar();
  };
  
};

//Splash life loss ADD IN FUTURE

/*function lifeloss() {
  console.log(life);

  if(currentNumber < 99) {
    lifesplash.style.visibility = "visible", 3000;
    lifesplash.innerHTML = life - (99 - currentNumber) * 2;
    lifesplash.style.visibility = "hidden";
  }
}*/

//Game functions management
function gameon() {
  touchscreenbutton.style.visibility = "visible";
  menubarx.style.visibility = "hidden";
  gamestart.style.visibility= "hidden";
  num.style.visibility = "visible";
  lifenum.style.visibility = "visible";
  game.style.visibility = "visible";
  score.style.visibility = "visible";
  if (!life) {
    reset();
  };

  running = !running;

  if (running) {
    currentNumber = 0;
  } else {
    speed = Math.max(speed * 0.82, 0);

    if (currentNumber === 100) {
      life = Math.min(life + 10, 100);
    } else if (currentNumber < 98) {
      life = Math.max(life - (98 - currentNumber) * 2, 0);
    };

    if (life) {
      level += 1;
    };
  };

};

//TouchScreen Button function
function spaceTouchScreen() {
  simulateKey(32);
  console.log("Bottone premuto")
};


//Menu Bar
/*function menubar() {
  gamestart.style.visibility = "hidden";
  line.style.width = 0;
  num.style.visibility = "hidden";
  lifenum.style.visibility = "hidden";
  body.style.background = "black";
  menubarx.style.visibility = "visible";
  game.style.visibility = "hidden";
  menutitle.innerHTML = "Menu";
  body.style.background = "balck";
  score.style.visibility = "hidden";
  running = false;
};*/

function menubar() {
  touchscreenbutton.style.visibility = "hidden";
  gamestart.style.visibility = "hidden";
  body.style.background = "black";
  menubarx.style.visibility = "visible";
  menutitle.innerHTML = "Menu";
  body.style.background = "balck";
  running = false;
};

//Loop game function
function loop() {
  if (running) {
    if (currentNumber === 100) {
      goingUp = false;
    } else if (currentNumber === 0) {
      goingUp = true;
    };

    if (goingUp) {
      currentNumber += 1;
    } else {
      currentNumber -= 1;
    };
  };


  updateUI();

  setTimeout(() => {
    if (running) {
      loop();
    };
  }, speed);

  
};

//Update the UI of the page in base of score(CurrentNumber)
function updateUI() {
  if (running) {
    body.style.background = "black";
  } else {
    if (currentNumber === 100) {
      body.style.background = "blue";
    } else if (currentNumber === 98 || currentNumber === 99 ) {
      body.style.background = "green";
    } else if (currentNumber < 98) {
      body.style.background = "red";
    };
  };

  if (life) {
    retrybuttons.style.visibility = "hidden";
    lose.style.visibility = "hidden";
    num.innerHTML = currentNumber;
  } else {
    //GameOver Scene
    touchscreenbutton.style.visibility = "hidden";
    retrybuttons.style.visibility = "visible";
    num.style.visibility= "hidden";
    lifenum.style.visibility= "hidden";
    score.style.visibility= "visible";
    lose.style.visibility = "visible";
    lose.innerHTML= `<img src="src/img/lose.png">`;
  };

  lifenum.innerHTML = "Life " + life + "%";
  line.style.bottom = currentNumber + "%";  //Set the distance of the line from the bottom
  line.style.width = life + "%";            //Set the line width start from center (Life BAR)

  score.innerHTML = "Level: " + level;      //Set the level number
};

//Trigger this with Main Menu DIV in MenuBar
function mainmenu(){
  body.style.background = "black";
  num.style.visibility ="hidden";
  score.style.visibility = "hidden";
  lifenum.style.visibility = "hidden";
  game.style.visibility= "hidden";
  menubarx.style.visibility = "hidden";
  gamestart.style.visibility = "visible";
  reset();
};

//Emulate key for the retry button on GAMEOVER
function simulateKey (keyCode, type, modifiers) {
	var evtName = (typeof(type) === "string") ? "key" + type : "keydown";	
	var modifier = (typeof(modifiers) === "object") ? modifier : {};

	var event = document.createEvent("HTMLEvents");
	event.initEvent(evtName, true, false);
	event.keyCode = keyCode;
	
	for (var i in modifiers) {
		event[i] = modifiers[i];
	}

	document.dispatchEvent(event);
};

//retry button function on GAMEOVER use also to Continue play button on MenuBar
function retry() {
  simulateKey(32);
};


/*.......................
........TEST AREA........
.........................*/

