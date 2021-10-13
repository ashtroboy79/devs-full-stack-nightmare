function addToScoreDatabase(username, score) {
  const gameData = { username, score };

  fetch('/score', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(gameData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.scores));
}

const game = new Game();
let precisionStrikeButton;
let wildFlailButton;
let healButton;
let okButton;
let fleeButton;
let battleBackgroundImage;
const battleBackgroundImagePath = './stylesheets/assets/battleBackground.jpg';
let wallImg;
let playerImg;
let playerImg2;
let enemyImg;
let backgroundMusic;
let playerFaintAnimation;
let faintingEnemy;

function preload() {
  wallImg = loadImage('./images/wall1.png');
  wallImg.resize(Config.cellSize, Config.cellSize);
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
  playerImg2 = createImg('./images/playerIdleAnimations.gif');
  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  tileArray = loadTiles();
  playerFaintAnimation = createImg(
    './images/playerFaintAnimation.gif',
    'fainting player'
  );
  backgroundMusic = loadSound('./stylesheets/assets/map-music-but-quiet.wav');
  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
}

function loadTiles() {
  const tileArray = [];

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach((i) => {
    tileArray.push(loadImage(`./images/new-tiles/${i}.png`));
  });

  tileArray.forEach((img) => {
    img.resize(Config.cellSize, Config.cellSize);
  });

  return tileArray;
}

function setup() {
  createPrecisionStrikeButton();
  createWildFlailButton();
  createHealButton();
  createOkButton();
  createFleeButton();
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent('play-area');
  enemyImg.parent('right');
  playerImg2.parent('left');
  playerFaintAnimation.parent('left');
  faintingEnemy.parent('right');
  battleBackroundImage = loadImage(battleBackgroundImagePath);
  nameSetup();
}

function inputForm() {
  // hide all unnecessary stuff in nameScreen state
  // show form and get user name
  // call addUserName method in game class which
  // adds username to Player class and updates this.state in Game class
  // InputForm will be called in case 'nameScreen'
}

function nameSetup() {
  // create canvas
  createCanvas(710, 400);

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed();

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  background(0);

  switch (game.state) {
    case 'nameScreen':
      okButton.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
      fleeButton.hide();
      break;
    case 'mapScreen':
      //  backgroundMusic.play();
      enemyImg.hide();
      playerImg2.show();
      okButton.hide();
      faintingEnemy.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
      fleeButton.hide();
      game.showMap();
      playerFaintAnimation.hide();
      playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

      image(
        playerImg,
        game.player.gridX + Config.cellSize / 4,
        game.player.gridY + Config.cellSize / 4
      );
      // fill(Config.playerColour);
      // rect(game.player.location[0],game.player.location[1], Config.spriteSize);

      break;
    case 'battleScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.show();
      playerImg2.show();
      game.showBattle();
      precisionStrikeButton.show();
      wildFlailButton.show();
      healButton.show();
      fleeButton.show();
      playerFaintAnimation.hide();
      faintingEnemy.hide();
      break;
    case 'gameOver':
      okButton.hide();
      enemyImg.hide();
      playerImg2.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
      fleeButton.hide();
      playerFaintAnimation.show();
      faintingEnemy.hide();
      game.showGameOver();
      break;
    case 'victoryScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
      faintingEnemy.show();
      okButton.show();
      playerImg2.show();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      fleeButton.hide();
      healButton.hide();
      game.showVictoryScreen();
      break;
  }
}

function keyPressed() {
  if (game.state === 'mapScreen') {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      game.playerAction('west', 75);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      game.playerAction('east', 75);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      game.playerAction('north', 75);
    }
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      game.playerAction('south', 75);
    }

    // THIS WAS TAKEN OUT IN MORE TILING AND IS JUST HERE FOR ARCHIVAL PURPOSES
    //     if (moved) {
    //      if (Math.random() > Config.encounterProbability) game.enterBattle();
    //    }
  }
}

function createOkButton() {
  okButton = createImg('./images/okButton150px.png');
  okButton.parent('okButton');

  okButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
  });
}

function createPrecisionStrikeButton() {
  precisionStrikeButton = createButton('Precision Strike');
  precisionStrikeButton.parent('strike');

  precisionStrikeButton.mousePressed(() => {
    if (game.battle) {
      game.battle.takeTurn(Ability.find('Precision Strike'));
    }
  });
}

function createWildFlailButton() {
  wildFlailButton = createImg('./images/wildFlail150px.png');
  wildFlailButton.parent('wildflail');

  wildFlailButton.mousePressed(() => {
    if (game.battle) {
      game.battle.takeTurn(Ability.find('Wild Flail'));
    }
  });
}

function createHealButton() {
  healButton = createImg('./images/recovery150px.png');
  healButton.parent('heal');

  healButton.mousePressed(() => {
    if (game.battle) {
      heal = new Ability('Recovery');
      game.battle.takeTurn(heal);
    }
  });
}

function createFleeButton() {
  fleeButton = createImg('./images/flee150px.png');
  fleeButton.parent('flee');

  fleeButton.mousePressed(() => {
    if (Math.random() > Config.fleeFailureChance) {
      game.battle = null;
      game.state = 'mapScreen';
    } else {
      game.battle.takeTurn('Flee!', true);
    }
  });
}
