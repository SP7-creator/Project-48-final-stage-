var PLAY = 1;
var END = 0;
var gameState = PLAY;
var edges;
var bg, bgimg;
var caveman, cavemanimg, cavemandie;
var title, titleimg;
var bowandarrow, bowandarrowimg, baGroup;
var gold, goldimg, goldGroup;
var chicken, chickengimg, chickenGroup;
var mace, maceimg, maceGroup;
var dino, dinoimg, dinoGroup;
var gameOver, restart;
var gameOverImg, restartImg;
var score;

function preload() {
  bgimg = loadImage("Images/bg.jpg");
  cavemanimg = loadAnimation(
    "Images/caveman 1.png",
    "Images/caveman 2.png",
    "Images/caveman 3.png",
    "Images/caveman 4.png",
    "Images/caveman 5.png",
    "Images/caveman 6.png"
  );
  titleimg = loadImage("Images/title.png");
  cavemandie = loadImage("Images/die.png");

  bowandarrowimg = loadImage("Images/bowandarrow.png");
  goldimg = loadImage("Images/gold.png");
  maceimg = loadImage("Images/mace.png");
  chickengimg = loadImage("Images/chicken.png");
  dinoimg = loadAnimation(
    "Images/dino1.png",
    "Images/dino2.png",
    "Images/dino3.png",
    "Images/dino4.png"
  );
  gameOverImg = loadImage("Images/gameover.png");
  restartImg = loadImage("Images/restart.png");
}

function setup() {
  createCanvas(800, 600);
  edges = createEdgeSprites();

  bg = createSprite(450, 250);
  bg.addImage("background", bgimg);



  caveman = createSprite(100, 500);
  caveman.addAnimation("caveManimage", cavemanimg);

  caveman.scale = 0.9;

  title = createSprite(130, 100);
  title.addImage("Title", titleimg);
  title.scale = 0.7;

  gameOver = createSprite(400, 300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.1;
  gameOver.visible = false;

  restart = createSprite(400, 390);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  chickenGroup = new Group();
  maceGroup = new Group();
  goldGroup = new Group();
  baGroup = new Group();
  dinoGroup = new Group();
  score = 0;
}

function draw() {
  background(0);
  if (gameState === PLAY) {
    bg.velocityX = -3;
    if (bg.x < 70) {
      bg.x = bg.width / 2;
    }

    if (keyDown("SPACE") && caveman.y >= 250) {
      caveman.velocityY = -8;

    }

    caveman.velocityY = caveman.velocityY + 0.8;

    spawnChicken();
    spawnMace();
    spawnGold();
    spawnBowandarrow();
    dinosaur();

    if (baGroup.isTouching(caveman)) {
      score = score + 10;
      baGroup.destroyEach();
    }
    if (goldGroup.isTouching(caveman)) {
      score = score + 10;
      goldGroup.destroyEach();
    }
    if (chickenGroup.isTouching(caveman)) {
      score = score + 10;
      chickenGroup.destroyEach();
    }
    if (maceGroup.isTouching(caveman)) {
      score = score + 10;
      maceGroup.destroyEach();
    }
    if (dinoGroup.isTouching(caveman)) {
      gameState = END;
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    bg.velocityX = 0;
    caveman.velocityY = 0;


    caveman.addImage("die", cavemandie);
    caveman.changeImage("die", cavemandie);
    goldGroup.setVelocityXEach(0);
    maceGroup.setVelocityXEach(0);
    chickenGroup.setVelocityXEach(0);
    baGroup.setVelocityXEach(0);
    dinoGroup.setVelocityXEach(0);

    goldGroup.setLifetimeEach(-1);
    maceGroup.setLifetimeEach(-1);
    chickenGroup.setLifetimeEach(-1);
    baGroup.setLifetimeEach(-1);
    dinoGroup.setLifetimeEach(-1);
    dinoGroup.destroyEach();
    if (mousePressedOver(restart)) {
      resetGame();
    }
  }

  caveman.collide(edges);

  drawSprites();
  textSize(25);
  fill("white");
  text("Score : " + score, 585, 50);
}

function spawnBowandarrow() {
  if (frameCount % 300 === 0) {
    var bowandarrow = createSprite(840, 500, 40, 40);
    bowandarrow.y = Math.round(random(200, 400));
    bowandarrow.addImage(bowandarrowimg);
    bowandarrow.velocityX = -3;
    bowandarrow.lifetime = 300;
    bowandarrow.scale = 0.6;
    baGroup.add(bowandarrow);
  }
}

function spawnChicken() {
  if (frameCount % 280 === 0) {
    var chicken = createSprite(630, 500, 40, 40);
    chicken.y = Math.round(random(300, 500));
    chicken.addImage(chickengimg);
    chicken.velocityX = -3;
    chicken.lifetime = 300;
    chicken.scale = 0.1;
    chickenGroup.add(chicken);
  }
}

function spawnMace() {
  if (frameCount % 240 === 0) {
    var mace = createSprite(900, 500, 40, 40);
    mace.y = Math.round(random(200, 400));
    mace.addImage(maceimg);
    mace.velocityX = -3;
    mace.lifetime = 300;
    mace.scale = 0.6;
    maceGroup.add(mace);
  }
}

function spawnGold() {
  if (frameCount % 200 === 0) {
    var gold = createSprite(800, 500, 40, 40);
    gold.y = Math.round(random(200, 400));
    gold.addImage(goldimg);
    gold.velocityX = -3;
    gold.lifetime = 300;
    gold.scale = 0.2;
    goldGroup.add(gold);
  }
}
function dinosaur() {
  if (frameCount % 390 === 0) {
    dino = createSprite(800, 530, 70, 50);
    dino.addAnimation("dinnosaurAnim", dinoimg);
    dino.velocityX = -3;
    dino.lifetime = 300;
    dino.scale = 0.4;
    dinoGroup.add(dino);
    //adjust the depth
    //dino.depth = caveman.depth;
    //caveman.depth = caveman.depth + 1;
  }
}
function resetGame() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  dinoGroup.destroyEach();
  chickenGroup.destroyEach();
  maceGroup.destroyEach();
  goldGroup.destroyEach();
  baGroup.destroyEach();
  score = 0;
  caveman.changeAnimation("caveManimage", cavemanimg);
}
