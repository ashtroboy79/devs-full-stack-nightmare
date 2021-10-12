function addToScoreDatabase(username, score) {
  const gameData = { username, score };

  fetch('http://localhost:3000/score', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(gameData),
  }).then((res) => {
    console.log('Score added to database:', res);
  });
}
addToScoreDatabase('new-test-player', 100);

const game = new Game();
let precisionStrikeButton;
let wildFlailButton;
let okButton;
let fleeButton;
let battleBackgroundImage;
let battleBackgroundImagePath = "./stylesheets/assets/battleBackground.jpg";
let tileImg;
let wallImg;
let playerImg;
let playerImg2;
let enemyImg;

function preload() {
	tileImg = loadImage("./images/tile1.png");
	tileImg.resize(Config.cellSize, Config.cellSize);
	wallImg = loadImage("./images/wall1.png");
	wallImg.resize(Config.cellSize, Config.cellSize);
	playerImg = loadImage("./images/idlePlayer1CROPPED.png");
  playerImg2 = createImg("./images/playerIdleAnimations.gif");
	enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
}

function setup() {
	createPrecisionStrikeButton();
  createWildFlailButton();
	createOkButton();
	createFleeButton();
	canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
	canvas.parent("play-area");
  enemyImg.parent("right");
  playerImg2.parent("left");
	battleBackroundImage = loadImage(battleBackgroundImagePath);
}

function draw() {
  background(0);

	switch (game.state) {
		case "mapScreen":
      enemyImg.hide();
      playerImg2.show();
			okButton.hide();
			precisionStrikeButton.hide();
      wildFlailButton.hide();
			fleeButton.hide();
			game.showMap();
			playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
			image(
				playerImg,
				game.player.location[0] + Config.cellSize / 4,
				game.player.location[1] + Config.cellSize / 4
			);
			// fill(Config.playerColour);
      // rect(game.player.location[0],game.player.location[1], Config.spriteSize);

			break;
		case "battleScreen":
			background(battleBackroundImage, 0, 0);
      enemyImg.show();
      playerImg2.show();
			game.showBattle();
			precisionStrikeButton.show();
      wildFlailButton.show();
			fleeButton.show();
			break;
		case "gameOver":
			okButton.hide();
      enemyImg.hide();
      playerImg2.show();
			precisionStrikeButton.hide();
      wildFlailButton.hide();
			fleeButton.hide();
			game.showGameOver();
			break;
		case "victoryScreen":
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
			okButton.show();
      playerImg2.show();
			precisionStrikeButton.hide();
      wildFlailButton.hide();
			fleeButton.hide();
			game.showVictoryScreen();
			break;
	}
}

function keyPressed() {
  if (game.state === 'mapScreen') {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      game.playerAction('left', 75);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      game.playerAction('right', 75);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      game.playerAction('up', 75);
    }
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      game.playerAction('down', 75);
    }
  }
}

function createOkButton() {
  okButton = createButton('OK');
  okButton.position(Config.canvasWidth / 2, Config.canvasHeight / 2);

  okButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
  });
}

function createPrecisionStrikeButton() {

	precisionStrikeButton = createButton("Precision Strike");
	precisionStrikeButton.parent("strike");

	precisionStrikeButton.mousePressed(() => {
		if (game.battle) {
      precisionStrike = new Ability("Precision Strike")
			game.battle.takeTurn(precisionStrike);
		}
	});
}

function createWildFlailButton() {

	wildFlailButton = createButton("Wild Flail");
  wildFlailButton.parent("wildflail");

	wildFlailButton.mousePressed(() => {
		if (game.battle) {
      wildFlail = new Ability("Wild Flail", Config.wildFlailMin, Config.wildFlailMax)
			game.battle.takeTurn(wildFlail);
		}
	});
}

function createFleeButton() {
  fleeButton = createButton('Flee!');
  fleeButton.parent('flee');

  fleeButton.mousePressed(() => {
    if (Math.random() > Config.fleeFailureChance) {
		  game.battle = null;
		  game.state = "mapScreen";
    }
    else {
      game.battle.takeTurn("Flee!", true);

    }
	});
}

