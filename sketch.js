var lvl = 1;
var difficulty = 1;
var lives = 20;
var create = true;
var gem1,gem2,gem3;
var g1 = 255, g2 = 255, g3 = 255;
var playerIMG;
var gi;
var gg;
var player;
var robot = [];
var rbt = [];
var edge = [];
var edge_corner = [];
var edgeimg, edge_cornerimg;
var level;
var c1;
var ximg;
var gamestate = "menu";
var gem;
var start = 0;
var plr;
var flag = 0;
var rbt_img;
var redd, neon, gold, ring;
var playbutton;
var wallbreakSound;
//var realtime;
//var gametime;
var lasthit = 0;
var teleportSE;
var textx = 0, texty = 0;
var levelTiming = 0;
var totalTime = 0;
var levelTime = 0;
var wallbreaks = 0;
var totalWallbreaks = 0;
var ltwbRatio = 0;
var textx1 = 0;
var texty1 = 0;
var go = false;
var blackscreen;
var a;
var r, r1, r2 , r3, r4, r5 ,r6;
var p;
var hitsound;
var powerdownsound;
var dashToX = 0;
var dashToY = 0;
var dashSpeed = 0;
var opaque = true;
var opaquefactor = 0;
var appearin = -1;
var lifechance = 50;
var endbreaks = 0;
var won = false;
var mainMusic, bossMusic, winMusic, bossMusic2, menuMusic, completionMusic, selection, click;
var amplitude;
var rpg = 1;
var m;
var easy, medium, hard, insane, impossible;
var change = false;
var changeto = "menu";
var changetime = 0;
var winplaying = false;
var endTime = 0;
var factor = 0;
var factdiv = 1920;
var startTime = 0;
var agencyfb, ocra, arial;

//level 1
var l1_l1 = [];                                   //layer 1
var level1_layer1;

//level2
var l2_l1 = [];                                   //layer 1
var level2_layer1;
var l2_c1 = [];                                   //layer 1 corners
var level2_corner1;
var l2_l2 = [];                                   //layer 2
var level2_layer2;
var l2_c2 = [];                                   //layer 2 corners
var level2_corner2;

//level 3
var l3_l1 = [];                                   //layer 1
var level3_layer1;
var l3_c1 = [];                                   //layer 1 corners
var level3_corner1;
var l3_l2 = [];                                   //layer 2
var level3_layer2;
var l3_c2 = [];                                   //layer 2 corners
var level3_corner2;
var l3_l3 = [];                                   //layer 3
var level3_layer3;
var l3_c3 = [];                                   //layer 3 corners
var level3_corner3;

//level 4
var l4_l1 = [];                                   //layer 1
var level4_layer1;
var l4_c1 = [];                                   //layer 1 corners
var level4_corner1;
var l4_l2 = [];                                   //layer 2
var level4_layer2;
var l4_c2 = [];                                   //layer 2 corners
var level4_corner2;
var l4_l3 = [];                                   //layer 3
var level4_layer3;
var l4_c3 = [];                                   //layer 3 corners
var level4_corner3;
var l4_l4 = [];                                   //layer 4
var level4_layer4;
var l4_c4 = [];                                   //layer 4 corners
var level4_corner4;

//level 5
var l5_l1 = [];                                   //layer 1
var level5_layer1;
var l5_c1 = [];                                   //layer 1 corners
var level5_corner1;
var l5_l2 = [];                                   //layer 2
var level5_layer2;
var l5_c2 = [];                                   //layer 2 corners
var level5_corner2;
var l5_l3 = [];                                   //layer 3
var level5_layer3;
var l5_c3 = [];                                   //layer 3 corners
var level5_corner3;
var l5_l4 = [];                                   //layer 4
var level5_layer4;
var l5_c4 = [];                                   //layer 4 corners
var level5_corner4;

//level 6
var l6_l1 = [];                                   //layer 1
var level6_layer1;
var l6_c1 = [];                                   //layer 1 corners
var level6_corner1;
var l6_l2 = [];                                   //layer 2
var level6_layer2;
var l6_c2 = [];                                   //layer 2 corners
var level6_corner2;
var l6_l3 = [];                                   //layer 3
var level6_layer3;
var l6_c3 = [];                                   //layer 3 corners
var level6_corner3;
var l6_l4 = [];                                   //layer 4
var level6_layer4;
var l6_c4 = [];                                   //layer 4 corners
var level6_corner4;

//level 7
var l7_l1 = [];                                   //layer 1
var level7_layer1;
var l7_c1 = [];                                   //layer 1 corners
var level7_corner1;
var l7_l2 = [];                                   //layer 2
var level7_layer2;
var l7_c2 = [];                                   //layer 2 corners
var level7_corner2;
var l7_l3 = [];                                   //layer 3
var level7_layer3;
var l7_c3 = [];                                   //layer 3 corners
var level7_corner3;
var l7_l4 = [];                                   //layer 4
var level7_layer4;
var l7_c4 = [];                                   //layer 4 corners
var level7_corner4;

//level 8
var l8_l1 = [];                                   //layer 1
var level8_layer1;
var l8_c1 = [];                                   //layer 1 corners
var level8_corner1;
var l8_l2 = [];                                   //layer 2
var level8_layer2;
var l8_c2 = [];                                   //layer 2 corners
var level8_corner2;
var l8_l3 = [];                                   //layer 3
var level8_layer3;
var l8_c3 = [];                                   //layer 3 corners
var level8_corner3;
var l8_l4 = [];                                   //layer 4
var level8_layer4;
var l8_c4 = [];                                   //layer 4 corners
var level8_corner4;

//level 9
var l9_l1 = [];                                   //layer 1
var level9_layer1;
var l9_c1 = [];                                   //layer 1 corners
var level9_corner1;
var l9_l2 = [];                                   //layer 2
var level9_layer2;
var l9_c2 = [];                                   //layer 2 corners
var level9_corner2;
var l9_l3 = [];                                   //layer 3
var level9_layer3;
var l9_c3 = [];                                   //layer 3 corners
var level9_corner3;
var l9_l4 = [];                                   //layer 4
var level9_layer4;
var l9_c4 = [];                                   //layer 4 corners
var level9_corner4;

//level 10
var l10_gc = [];                                  //outermost gold corners
var level10_gcorner;
var l10_rc = [];                                  //rest red corners
var level10_rcorner;
var l10_ec = [];                                  //middle emerald corner
var level10_ecorner;

function preload(){
  ximg = loadImage("x.png");
  playerIMG = loadImage("player.png");
  gi = loadImage("gem.png")
  gg = loadImage("powered.png");
  rbt_img = loadImage("robot.png");
  redd = loadImage("red.png");
  neon = loadImage("neon.png");
  gold = loadImage("gold.png");
  wallbreakSound = loadSound("wallbreak.mp3");
  blackscreen = loadImage("blackscreen.png");
  a = loadImage("c.jpg");
  p = loadImage("b.jpg");
  r = loadImage("r.jpg");
  r1 = loadImage("rules.png");
  r2 = loadImage("rules2.png");
  r3 = loadImage("rules3.png");
  r4 = loadImage("rules4.png");
  r5 = loadImage("rules5.png");
  r6 = loadImage("rules6.png");
  edgeimg = loadImage("edge.png");
  edge_cornerimg = loadImage("edge_corner.png")
  //teleportSE = loadSound("teleport.MID");
  hitsound = loadSound("hit.m4a");
  powerdownsound = loadSound("powerdown.mp3");
  ring = loadImage("ring.png");
  //mainMusic = loadSound("main.mp3");
  //bossMusic = loadSound("boss.mp3");
  //winMusic = loadSound("win.mp3");
  mainMusic = loadSound("main.m4a");
  bossMusic = loadSound("boz.m4a");
  winMusic = loadSound("win.wav");
  completionMusic = loadSound("level.m4a");
  menuMusic = loadSound("menu.wav");
  bossMusic2 = loadSound("bozs.m4a");
  m = loadImage("menu.png");
  easy = loadImage("easy.png");
  medium = loadImage("medium.png");
  hard = loadImage("hard.png");
  insane = loadImage("insane.png");
  impossible = loadImage("impossible.png");
  selection = loadSound("selection.wav");
  click = loadSound("click.wav");
  agencyfb = loadFont("AGENCYFB.TTF");
  ocra = loadFont("OCRAStd.otf");
  arial = loadFont("arial.ttf");
}

function setup() {
  /*      CANVAS LINES      */

  //createCanvas(displayWidth,displayHeight);
  createCanvas(1920,1080);
  //createCanvas(windowWidth,windowHeight);


  player = createSprite(160,90,10,10);
  player.speed = 5;
  level = new Level;
  edge.push(createSprite((1920/2)-960-200,1080/2,400,1080));
  edge.push(createSprite(1920/2,(1080/2)-540-200,1920,400));
  edge.push(createSprite((1920/2)+960+200,1080/2,400,1080));
  edge.push(createSprite(1920/2,(1080/2)+540+200,1920,400));
  edge_corner.push(createSprite((1920/2)-960-200,(1080/2)-540-200,400,400));
  edge_corner.push(createSprite((1920/2)+960+200,(1080/2)-540-200,400,400));
  edge_corner.push(createSprite((1920/2)+960+200,(1080/2)+540+200,400,400));
  edge_corner.push(createSprite((1920/2)-960-200,(1080/2)+540+200,400,400));
  for(var i = 0; i < 4; i++){
    edge[i].visible = false;
    edge_corner[i].visible = false;
  }
  gem = new Gems;
  plr = new Player();
  powerdownsound.playMode('sustain');
  powerdownsound.rate(3.3);
  amplitude = new p5.Amplitude();
  
  gamestate = "menu";
  hitsound.setVolume(2,0);
  selection.playMode('sustain');
  //playbutton = createSprite(1670,950,420,170);
  resizeCanvas(windowWidth, windowHeight);
  if(windowHeight > windowWidth){
    factor = windowHeight;
    factdiv = 1080;
  }else{
    factor = windowWidth;
  }
}

function draw() {
  background(a);
  drawSprites();
  if(gamestate === "menu"){
    background(m);

    //if(touches.length > 0){
      //touchcoords();
      //console.log(touches);
      //touches = [];
    //}

    camera.position.x = displayWidth/2;
    camera.position.y = displayHeight/2;

    /*      CAMERA LINES      */

    camera.zoom = 1;                         /*     default     */
    //camera.zoom = (1920/displayWidth);       /*     1920/dW     */
    //camera.zoom = (displayWidth/1920);       /*     dW/1920     */
    //camera.zoom = (displayWidth*displayHeight)/(1920*1080);     /*    acc. size    */
    //camera.zoom = (1920*1080)/(displayWidth*displayHeight);     /*    acc. rev. size    */
    //camera.zoom = (canvas.width/1920);       /*     cW/1920     */
    //camera.zoom = (1920/canvas.width);       /*     1920/cW     */
    //camera.zoom = (canvas.width*canvas.height)/(1920*1080);     /*    acc. cSize    */
    //camera.zoom = (1920*1080)/(canvas.width*canvas.height);     /*    acc. rev. cSize    */
    //camera.zoom = (1920/windowWidth);       /*     1920/wW     */
    //camera.zoom = (windowWidth/1920);       /*     wW/1920     */
    //camera.zoom = (windowWidth*windowHeight)/(1920*1080);     /*    acc. size    */
    //camera.zoom = (1920*1080)/(windowWidth*windowHeight);     /*    acc. rev. size    */

    mainMusic.setVolume(0,0);
    winMusic.setVolume(0,0);
    bossMusic.setVolume(0,0);
    bossMusic2.setVolume(0,0);
    completionMusic.setVolume(0,0);
    menuMusic.setVolume(2,1);
    menuMusic.playMode('untilDone');
    menuMusic.play();
  
    push();
    translate(displayWidth/2-865*(windowWidth)/1920,displayHeight/2-15*(windowHeight)/1080);
    for(var i = 0; i < 5; i++){
      if(i === difficulty){
        tint(0,255,100,255);
      }else{
        tint(255,255,100,100);
      }
      switch(i){
        case 0:
          image(easy,-1+displayWidth/1920,i*100*(windowHeight)/1080,666*(windowWidth)/1920,96*(windowHeight)/1080);
          break;
        case 1:
          image(medium,-1+displayWidth/1920,i*100*(windowHeight)/1080,666*(windowWidth)/1920,96*(windowHeight)/1080);
          break;
        case 2:
          image(hard,-1+displayWidth/1920,i*100*(windowHeight)/1080,666*(windowWidth)/1920,96*(windowHeight)/1080);
          break;
        case 3:
          image(insane,-1+displayWidth/1920,i*100*(windowHeight)/1080,666*(windowWidth)/1920,96*(windowHeight)/1080);
          break;
        case 4:
          image(impossible,-1+displayWidth/1920,i*100*(windowHeight)/1080,666*(windowWidth)/1920,96*(windowHeight)/1080);
          break;
      }
    }
    pop();
    if(mouseIsPressed || touches){
      if(mouseX >= 785*windowWidth/1920 && mouseX <= 1280*windowWidth/1920){
        if(mouseY >= 625*windowHeight/1080 && mouseY < 860*windowHeight/1080){
          switch(difficulty){
            case 0:
              lives = 60;
              lifechance = 50;
              break;
            case 1:
              lives = 40;
              lifechance = 33;
              break;
            case 2:
              lives = 25;
              lifechance = 10;
              break;
            case 3:
              lives = 11;
              lifechance = 5;
              break;
            case 4:
              lives = 1;
              lifechance = 0.1;
              break;
          }
          level = delete Level;
          level = new Level;
          lvl = 1;
          create = true;
          go = false;
          change = true;
          start = 0;
          levelTime = 0;
          totalTime = 0;
          changeto = "play";
          if(millis()-changetime > 1000){
            changetime = round(millis());
          }
          player.m = true;
          endbreaks = 0;
          won = false;
          player.t = 255; player.x = 160; player.y = 90;
          wallbreaks = 0;
          totalWallbreaks = 0;
          opaquefactor = 0;
        }
      }
      if(mouseX >= 1500*windowWidth/1920 && mouseX <= 1900*windowWidth/1920){
        if(mouseY >= 605*windowHeight/1080 && mouseY < 855*windowHeight/1080){
          rpg = 1;
          //gamestate = "rules";
          change = true;
          changeto = "rules";
          if(millis()-changetime > 1000){
            changetime = round(millis());
          }
        }
      }
      if(mouseX >= 95*windowWidth/1920 && mouseX <= 761*windowWidth/1920){
        if(mouseY >= 520*windowHeight/1080 && mouseY <= 620*windowHeight/1080){
          if(difficulty !== 0){
            selection.play();
          }
          difficulty = 0;
        }else if(mouseY >= 620*windowHeight/1080 && mouseY <= 720*windowHeight/1080){
          if(difficulty !== 1){
            selection.play();
          }
          difficulty = 1;
        }else if(mouseY >= 720*windowHeight/1080 && mouseY <= 820*windowHeight/1080){
          if(difficulty !== 2){
            selection.play();
          }
          difficulty = 2;
        }else if(mouseY >= 820*windowHeight/1080 && mouseY <= 920*windowHeight/1080){
          if(difficulty !== 3){
            selection.play();
          }
          difficulty = 3;
        }else if(mouseY >= 920*windowHeight/1080 && mouseY <= 1025*windowHeight/1080){
          if(difficulty !== 4){
            selection.play();
          }
          difficulty = 4;
        }
      }
    }
  }else if(gamestate === "rules"){
    background(r);

    menuMusic.setVolume(1,1);
    menuMusic.playMode('untilDone');
    menuMusic.play();

    switch(rpg){
      case -1:
        change = true;
        changeto = "menu";
        changetime = round(millis());
        rpg = rpg+11;
        break;
      case 0:
        change = true;
        changeto = "menu";
        changetime = round(millis());
        rpg = rpg+10;
        break;
      case 1:
        background(r1);
        break;
      case 2:
        background(r2);
        break;
      case 3:
        background(r3);
        break;
      case 4:
        background(r4);
        break;
      case 5:
        background(r5);
        break;
      case 6:
        background(r6);
        break;
      case 7:
        change = true;
        changeto = "menu";
        changetime = round(millis());
        rpg = rpg+10;
        break;
      case 8:
        change = true;
        changeto = "menu";
        changetime = round(millis());
        rpg = rpg+9;
        break;
      case 10:
        background(r1);
        break;
      case 17:
        background(r6);
      default:
        break;
    }
    if(mouseIsPressed || touches){
      if(mouseX > 1010*windowWidth/1920 && mouseX < 1430*windowWidth/1920){
        if(mouseY > 865*windowHeight/1080 && mouseY < 1035*windowHeight/1080){
          mouseIsPressed = false;
          rpg -= 1;
          mouseIsPressed = false;
        }
      }else if(mouseX > 1460*windowWidth/1920 && mouseX < 1880*windowWidth/1920){
        if(mouseY > 860*windowHeight/1080 && mouseY < 1035*windowHeight/1080){
          mouseIsPressed = false;
          rpg += 1;
          mouseIsPressed = false;
        }
      }
    }
    //transition("menu",850)
  }else if(gamestate === "play"){
    background(p);
    menuMusic.setVolume(0,1);
    camera.position.x = player.x;
    camera.position.y = player.y;
    if(windowWidth > windowHeight){
      camera.zoom = 5 * windowWidth/1920;
    }else{
      camera.zoom = 5 * windowHeight/1080;
    }
    if(touches){
      flag = 1;
    }else{
      flag = 0;
    }
    //background(a); 
    level.play();
  }
  if(change){
    transition(changeto,changetime);
  }
  drawSprites();
}

function transition(state,time){
  var div = round(millis()-time);
  var div2 = round(millis()-(time+1000));
  //console.log(time,div,div*8.5/33,div2*8.5/33);
  push();
  translate(camera.position.x,camera.position.y);
  imageMode(CENTER);
  if(div*8.5/33 < 10){
    click.playMode('untilDone');
    click.play();  
  }else if(div*8.5/33 < 255){
    tint(255,div*8.5/33);
  }else if(div2*8.5/33 < 255){
    if(gamestate === "play" && gamestate !== state){
      gamestate = state;
      del();
    }
    gamestate = state;
    tint(255,255-div2*8.5/33);
  }else{
    change = false;
    //console.log("FALSE!");
    gamestate = state;
  }
  image(blackscreen,0,0,windowWidth,windowHeight);
  pop();
}

function delarr(variable){
  if(variable === rbt || variable === robot){
    for(var i = variable.length; i > 0; i -= 1){
      rbt.pop();
      robot.pop();
    }
  }else{
    for(var i = variable.length; i > 0; i -= 1){
      variable.pop();
    }
  }
}

function d(arr){
  arr = delete [];
}

function del(){
  if(lvl >= 1){
    delarr(rbt);
    delarr(l1_l1);
    d(level1_layer1);
    if(lvl >= 2){
      delarr(l2_c1);
      delarr(l2_c2);
      delarr(l2_l1);
      delarr(l2_l2);
      d(level2_corner1);
      d(level2_corner2);
      d(level2_layer1);
      d(level2_layer2);
      if(lvl >= 3){
        delarr(l3_c1);
        delarr(l3_c2);
        delarr(l3_c3);
        delarr(l3_l1);
        delarr(l3_l2);
        delarr(l3_l3);
        d(level3_corner1);
        d(level3_corner2);
        d(level3_corner3);
        d(level3_layer1);
        d(level3_layer2);
        d(level3_layer3);
        if(lvl >= 4){
          delarr(l4_c1);
          delarr(l4_c2);
          delarr(l4_c3);
          delarr(l4_c4);
          delarr(l4_l1);
          delarr(l4_l2);
          delarr(l4_l3);
          delarr(l4_l4);
          d(level4_corner1);
          d(level4_corner2);
          d(level4_corner3);
          d(level4_corner4);
          if(lvl >= 5){
            delarr(l5_c1);
            delarr(l5_c2);
            delarr(l5_c3);
            delarr(l5_c4);
            delarr(l5_l1);
            delarr(l5_l2);
            delarr(l5_l3);
            delarr(l5_l4);
            d(level5_corner1);
            d(level5_corner2);
            d(level5_corner3);
            d(level5_corner4);
            d(level5_layer1);
            d(level5_layer2);
            d(level5_layer3);
            d(level5_layer4);
            if(lvl >= 6){
              delarr(l6_c1);
              delarr(l6_c2);
              delarr(l6_c3);
              delarr(l6_c4);
              delarr(l6_l1);
              delarr(l6_l2);
              delarr(l6_l3);
              delarr(l6_l4);
              d(level6_corner1);
              d(level6_corner2);
              d(level6_corner3);
              d(level6_corner4);
              d(level6_layer1);
              d(level6_layer2);
              d(level6_layer3);
              d(level6_layer4);
              if(lvl >= 7){
                delarr(l7_c1);
                delarr(l7_c2);
                delarr(l7_c3);
                delarr(l7_c4);
                delarr(l7_l1);
                delarr(l7_l2);
                delarr(l7_l3);
                delarr(l7_l4);
                d(level7_corner1);
                d(level7_corner2);
                d(level7_corner3);
                d(level7_corner4);
                d(level7_layer1);
                d(level7_layer2);
                d(level7_layer3);
                d(level7_layer4);
                if(lvl >= 8){
                  delarr(l8_c1);
                  delarr(l8_c2);
                  delarr(l8_c3);
                  delarr(l8_c4);
                  delarr(l8_l1);
                  delarr(l8_l2);
                  delarr(l8_l3);
                  delarr(l8_l4);
                  d(level8_corner1);
                  d(level8_corner2);
                  d(level8_corner3);
                  d(level8_corner4);
                  d(level8_layer1);
                  d(level8_layer2);
                  d(level8_layer3);
                  d(level8_layer4);
                  if(lvl >= 9){
                    delarr(l9_c1);
                    delarr(l9_c2);
                    delarr(l9_c3);
                    delarr(l9_c4);
                    delarr(l9_l1);
                    delarr(l9_l2);
                    delarr(l9_l3);
                    delarr(l9_l4);
                    d(level9_corner1);
                    d(level9_corner2);
                    d(level9_corner3);
                    d(level9_corner4);
                    d(level9_layer1);
                    d(level9_layer2);
                    d(level9_layer3);
                    d(level9_layer4);
                    if(lvl === 10){
                      delarr(l10_ec);
                      delarr(l10_gc);
                      delarr(l10_rc);
                      d(level10_ecorner);
                      d(level10_gcorner);
                      d(level10_rcorner);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function roundoff(v,l){
  if(v > 0){
    var val = v.toString();
    var valu = val.split("");
    var value = "";
    var decimal = false;
    for(var i = 0; i < valu.length; i++){
      if(valu[i] === "."){
        decimal = true;
      }
    }
    if(decimal === false){
      for(var i = 0; i < valu.length; i++){
        if(valu[i]){
          value += valu[i];
        }
      }
    }else{
      for(var i = 0; valu[i-1] !== "."; i++){
        if(valu[i] === "."){
          value += ".";
          for(var j = i+1; j < i+1 + l; j++){
            if(valu[j]){
              value += valu[j];
            }
          }
        }else{
          value += valu[i];
        }
      }
      return value;
    }
  }else{
    return "N/A";
  }
}

function invert(str){
  if(str === "+"){
    let r = "-"
    return r;
  }else{
    let r = "+"
    return r;
  }
}

function v3(e){
  var retun = Math.ceil(e/3)%2
  return retun;
}

/*function touchcoords() {
  flag = 1;
  //text(touches[length-1],windowWidth/2,windowHeight/2)
  if(gamestate === "menu"){
    if(touches[touches.length-1] >= (785*windowWidth/1920,625*windowHeight/1080) && touches[touches.length-1] <= (1280*windowWidth/1920,860*windowHeight/1080)){
        switch(difficulty){
          case 0:
            lives = 60;
            lifechance = 50;
            break;
          case 1:
            lives = 40;
            lifechance = 33;
            break;
          case 2:
            lives = 25;
            lifechance = 10;
            break;
          case 3:
            lives = 11;
            lifechance = 5;
            break;
          case 4:
            lives = 1;
            lifechance = 0.1;
            break;
        }
        level = delete Level;
        level = new Level;
        lvl = 1;
        create = true;
        go = false;
        change = true;
        start = 0;
        levelTime = 0;
        totalTime = 0;
        changeto = "play";
        if(millis()-changetime > 1000){
          changetime = round(millis());
        }
        player.m = true;
        endbreaks = 0;
        won = false;
        player.t = 255; player.x = 160; player.y = 90;
        wallbreaks = 0;
        totalWallbreaks = 0;
        opaquefactor = 0;
    }
    if(touches[touches.length-1] >= (1500*windowWidth/1920,605*windowHeight/1080) && touches[touches.length-1] <= (1900*windowWidth/1920,touchY < 855*windowHeight/1080)){
      //if(touchY >= 605*windowHeight/1080 && touchY < 855*windowHeight/1080){
        rpg = 1;
        //gamestate = "rules";
        change = true;
        changeto = "rules";
        if(millis()-changetime > 1000){
          changetime = round(millis());
        }
      //}
    }
    if(touches[touches.length-1] >= (95*windowWidth/1920,520*windowHeight/1080) && touches[touches.length-1] <= (761*windowWidth/1920,620*windowHeight/1080)){
      //if(touchY >= 520*windowHeight/1080 && touchY <= 620*windowHeight/1080){
        if(difficulty !== 0){
          selection.play();
        }
        difficulty = 0;
    }else if(touches[touches.length-1] >= (95*windowWidth/1920,620*windowHeight/1080) && touches[touches.length-1] <= (761*windowWidth/1920,720*windowHeight/1080)){
    //if(touchY >= 620*windowHeight/1080 && touchY <= 720*windowHeight/1080){
        if(difficulty !== 1){
          selection.play();
        }
        difficulty = 1;
    }else if(touches[touches.length-1] >= (95*windowWidth/1920,720*windowHeight/1080) && touches[touches.length-1] <= (761*windowWidth/1920,820*windowHeight/1080)){
    //if(touchY >= 720*windowHeight/1080 && touchY <= 820*windowHeight/1080){
        if(difficulty !== 2){
          selection.play();
        }
        difficulty = 2;
    }else if(touches[touches.length-1] >= (95*windowWidth/1920,820*windowHeight/1080) && touches[touches.length-1] <= (761*windowWidth/1920,920*windowHeight/1080)){
        if(difficulty !== 3){
          selection.play();
        }
        difficulty = 3;
    }else if(touches[touches.length-1] >= (95*windowWidth/1920,920*windowHeight/1080) && touches[touches.length-1] <= (761*windowWidth/1920,1020*windowHeight/1080)){
        if(difficulty !== 4){
          selection.play();
        }
        difficulty = 4;
    }
  }else if(gamestate === "rules"){
    if(touches[touches.length-1] >= (1010*windowWidth/1920,865*windowHeight/1080) && touches[touches.length-1] <= (1430*windowWidth/1920,touchY < 1035*windowHeight/1080)){
    //if(touchX > 1010*windowWidth/1920 && touchX < 1430*windowWidth/1920){
      //if(touchY > 865*windowHeight/1080 && touchY < 1035*windowHeight/1080){
        touchIsPressed = false;
        rpg -= 1;
        touchIsPressed = false;
      //}
    }else if(touches[touches.length-1] >= (1460*windowWidth/1920,860*windowHeight/1080) && touches[touches.length-1] <= (860*windowHeight/1080,1035*windowHeight/1080)){
    //if(touchX > 1460*windowWidth/1920 && touchX < 1880*windowWidth/1920){
      //if(touchY > 860*windowHeight/1080 && touchY < 1035*windowHeight/1080){
        touchIsPressed = false;
        rpg += 1;
        touchIsPressed = false;
      //}
    }
  }
}*/

function mousePressed() {
  flag = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(windowHeight > windowWidth){
    factor = windowHeight;
    factdiv = 1080;
  }else{
    factor = windowWidth;
    factdiv = 1920;
  }
}
