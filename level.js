class Level{
    constructor(){
        create = true;
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
        lvl = 1;
        player.speed = 5;
        var stormillis = round(millis(),3);
        startTime = stormillis/1000;
    }
    
    async play(){
        stroke(255);
        line(1920/2,0,1920/2,1080);
        line(0,1080/2,1920,1080/2);
        var vd1 = 0, vd2 = 0;
        if(player.rotation >= 0 && player.rotation < 90){
            vd1 = -0.5, vd2 = 0.5;
        }else if(player.rotation >= 90 && player.rotation < 180){
            vd1 = 0.5, vd2 = 0.5;
        }else if(player.rotation >= 180 && player.rotation < 270){
            vd1 = 0.5, vd2 = -0.5;
        }else if(player.rotation >= -90 && player.rotation < 0){
            vd1 = -0.5, vd2 = -0.5;
        }
        var r1er = random(-0.01,0.01), r2er = random(-0.01,0.01);
        stroke(55+frameCount%200,70+frameCount*2%185,70+frameCount*3%185)
        for(var i = random(1,1.01); i < (1920/100)-1; i ++){
            for(var j = random(1,1.01); j < (1080/100)-1; j ++){
                line((i+r1er)*100,(j+r2er)*100,(i+r1er)*100+vd1,(j+r2er)*100+vd2);
            }
        }
        /*for(var i = 0; i < jarr.length; i++){
            if(!jarr[i]){
                jarr[i] = 
            }
        }*/
        for(var i = 0; i < 4; i++){
            push();
            translate(edge[i].x,edge[i].y);
            imageMode(CENTER);
            if(i%2){
                rotate(90*i);
                image(edgeimg,0,0,edge[i].height,edge[i].width);
            }else{
                rotate(90*i);
                image(edgeimg,0,0,edge[i].width,edge[i].height);
            }
            pop();
            push();
            translate(edge_corner[i].x,edge_corner[i].y);
            rotate(90*i);
            imageMode(CENTER);
            image(edge_cornerimg,0,0,edge_corner[i].width,edge_corner[i].height);
            pop();
        }
        plr.show();
        if(start === 1){
            plr.move();
        }
        if(gamestate === "play"){
            if(lvl === 1){
                /*if(levelClear === true){
                    levelClear= false;
                    create = true;
                }*/
                if(create){
                    completionMusic.setVolume(0,0.5);
                    if(!gem1){
                        gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    }
                    if(!gem2){
                        gem2 = createSprite(1920/2,1080/2,30,30);
                    }
                    if(!gem3){
                        gem3 = createSprite(1920/2,1080/2 + 45,30,30);
                    }
                    gem1.visible = false;
                    gem2.visible = false;
                    gem3.visible = false;
                    l1_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l1_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l1_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l1_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    robot.push(createSprite(30,30,10,10)); //robot[0]
                    robot.push(createSprite(980,540,10,10)); //robot[1] gem saefguarder
                    rbt.push(new Rbt(0,0)); //rbt[0]
                    rbt.push(new Rbt(1,1)); //rbt[1]
                    mouseX = 1000;
                    mouseY = 1080;
                    level1_layer1 = new Wall(l1_l1);
                    g1 = 255;
                    g2 = 255;
                    g3 = 255;
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    mouseIsPressed = false;
                    flag = 0;
                    opaque = true;
                    create = false;
                }
                if(start === 0){
                    if(!go && (mouseIsPressed || flag === 1)){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        rbt[0].kill();
                        rbt[1].kill();
                        rbt[0].turn();
                        rbt[1].turn();
                        mainMusic.playMode('untilDone');
                        mainMusic.play();
                        mainMusic.setVolume(1,2);
                        
                    }else{      
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        }
                        //player.m = false;
                    }
                    level1_layer1.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(20 > rbt[0].over + rbt[1].over && rbt[0].over + rbt[1].over > 5){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 2;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 2){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l2_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l2_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l2_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l2_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l2_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l2_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l2_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l2_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 1 corners
                    l2_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l2_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l2_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l2_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l2_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l2_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l2_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l2_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot.push(createSprite(30,1050,10,10)); //robot[2]
                    rbt.push(new Rbt(2,0)); //rbt[2]
                    level2_layer1 = new Wall(l2_l1);
                    level2_corner1 = new Wall(l2_c1);
                    level2_layer2 = new Wall(l2_l2);
                    level2_corner2 = new Wall(l2_c2);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{      
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level2_layer1.l1();
                    level2_corner1.l1();
                    level2_layer2.l1();
                    level2_corner2.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 3;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 3){
                if(create){
                    del();
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l3_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l3_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l3_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l3_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l3_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l3_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l3_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l3_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 3
                    l3_l3.push(createSprite(1920/2 - 75,1080/2,20,220));
                    l3_l3.push(createSprite(1920/2,1080/2 - 120,130,20));
                    l3_l3.push(createSprite(1920/2 + 75,1080/2,20,220));
                    l3_l3.push(createSprite(1920/2,1080/2 + 120,130,20));
                    //layer 1 corners
                    l3_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l3_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l3_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l3_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l3_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l3_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l3_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l3_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l3_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l3_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l3_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l3_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot.push(createSprite(1890,1050,10,10)); //robot[3]
                    rbt.push(new Rbt(3,0)); //rbt[3]
                    level3_layer1 = new Wall(l3_l1);
                    level3_corner1 = new Wall(l3_c1);
                    level3_layer2 = new Wall(l3_l2);
                    level3_corner2 = new Wall(l3_c2);
                    level3_layer3 = new Wall(l3_l3);
                    level3_corner3 = new Wall(l3_c3);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level3_layer1.l1();
                    level3_corner1.l1();
                    level3_layer2.l1();
                    level3_corner2.l1();
                    level3_layer3.l1();
                    level3_corner3.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 4;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 4){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l4_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l4_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l4_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l4_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l4_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l4_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l4_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l4_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 3
                    l4_l3.push(createSprite(1920/2 - 75,1080/2,20,220));
                    l4_l3.push(createSprite(1920/2,1080/2 - 120,130,20));
                    l4_l3.push(createSprite(1920/2 + 75,1080/2,20,220));
                    l4_l3.push(createSprite(1920/2,1080/2 + 120,130,20));
                    //layer 4
                    l4_l4.push(createSprite(1920/2 - 95,1080/2,20,260));
                    l4_l4.push(createSprite(1920/2,1080/2 - 140,170,20));
                    l4_l4.push(createSprite(1920/2 + 95,1080/2,20,260));
                    l4_l4.push(createSprite(1920/2,1080/2 + 140,170,20));
                    //layer 1 corners
                    l4_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l4_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l4_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l4_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l4_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l4_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l4_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l4_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l4_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l4_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l4_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l4_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l4_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l4_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l4_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l4_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    level4_layer1 = new Wall(l4_l1);
                    level4_corner1 = new Wall(l4_c1);
                    level4_layer2 = new Wall(l4_l2);
                    level4_corner2 = new Wall(l4_c2);
                    level4_layer3 = new Wall(l4_l3);
                    level4_corner3 = new Wall(l4_c3);
                    level4_layer4 = new Wall(l4_l4);
                    level4_corner4 = new Wall(l4_c4);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level4_layer1.l1();
                    level4_corner1.l1();
                    level4_layer2.l1();
                    level4_corner2.l1();
                    level4_layer3.l1();
                    level4_corner3.l1();
                    level4_layer4.l1();
                    level4_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 5;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 5){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l5_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l5_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l5_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l5_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l5_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l5_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l5_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l5_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 3
                    l5_l3.push(createSprite(1920/2 - 75,1080/2,20,220));
                    l5_l3.push(createSprite(1920/2,1080/2 - 120,130,20));
                    l5_l3.push(createSprite(1920/2 + 75,1080/2,20,220));
                    l5_l3.push(createSprite(1920/2,1080/2 + 120,130,20));
                    //layer 4
                    l5_l4.push(createSprite(1920/2 - 95,1080/2,20,260));
                    l5_l4.push(createSprite(1920/2,1080/2 - 140,170,20));
                    l5_l4.push(createSprite(1920/2 + 95,1080/2,20,260));
                    l5_l4.push(createSprite(1920/2,1080/2 + 140,170,20));
                    //layer 1 corners
                    l5_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l5_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l5_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l5_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l5_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l5_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l5_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l5_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l5_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l5_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l5_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l5_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l5_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l5_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l5_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l5_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    robot.push(createSprite(1890,30,10,10)); //robot[4]
                    rbt.push(new Rbt(4,0)); //rbt[4]
                    level5_layer1 = new Wall(l5_l1);
                    level5_corner1 = new Wall(l5_c1);
                    level5_layer2 = new Wall(l5_l2);
                    level5_corner2 = new Wall(l5_c2);
                    level5_layer3 = new Wall(l5_l3);
                    level5_corner3 = new Wall(l5_c3);
                    level5_layer4 = new Wall(l5_l4);
                    level5_corner4 = new Wall(l5_c4,1);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    rbt[4].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level5_layer1.l1();
                    level5_corner1.l1();
                    level5_layer2.l1();
                    level5_corner2.l1();
                    level5_layer3.l1();
                    level5_corner3.l1();
                    level5_layer4.l1();
                    level5_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 6;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 6){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l6_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l6_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l6_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l6_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l6_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l6_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l6_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l6_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 3
                    l6_l3.push(createSprite(1920/2 - 75,1080/2,20,220));
                    l6_l3.push(createSprite(1920/2,1080/2 - 120,130,20));
                    l6_l3.push(createSprite(1920/2 + 75,1080/2,20,220));
                    l6_l3.push(createSprite(1920/2,1080/2 + 120,130,20));
                    //layer 4
                    l6_l4.push(createSprite(1920/2 - 95,1080/2 + 65,20,260/2));
                    l6_l4.push(createSprite(1920/2 + 42.5,1080/2 - 140,170/2,20));
                    l6_l4.push(createSprite(1920/2 + 95,1080/2 + 65,20,260/2));
                    l6_l4.push(createSprite(1920/2 + 42.5,1080/2 + 140,170/2,20));
                    //second half
                    l6_l4.push(createSprite(1920/2 - 95,1080/2 - 65,20,260/2));
                    l6_l4.push(createSprite(1920/2 - 42.5,1080/2 - 140,170/2,20));
                    l6_l4.push(createSprite(1920/2 + 95,1080/2 - 65,20,260/2));
                    l6_l4.push(createSprite(1920/2 - 42.5,1080/2 + 140,170/2,20));
                    //layer 1 corners
                    l6_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l6_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l6_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l6_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l6_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l6_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l6_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l6_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l6_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l6_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l6_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l6_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l6_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l6_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l6_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l6_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    robot[4].x = 1890;
                    robot[4].y = 30;
                    level6_layer1 = new Wall(l6_l1);
                    level6_corner1 = new Wall(l6_c1);
                    level6_layer2 = new Wall(l6_l2);
                    level6_corner2 = new Wall(l6_c2);
                    level6_layer3 = new Wall(l6_l3);
                    level6_corner3 = new Wall(l6_c3,1);
                    level6_layer4 = new Wall(l6_l4);
                    level6_corner4 = new Wall(l6_c4,1);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    rbt[4].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level6_layer1.l1();
                    level6_corner1.l1();
                    level6_layer2.l1();
                    level6_corner2.l1();
                    level6_layer3.l1();
                    level6_corner3.l1();
                    level6_layer4.l1();
                    level6_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 7;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 7){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l7_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l7_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l7_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l7_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l7_l2.push(createSprite(1920/2 - 55,1080/2,20,180));
                    l7_l2.push(createSprite(1920/2,1080/2 - 100,90,20));
                    l7_l2.push(createSprite(1920/2 + 55,1080/2,20,180));
                    l7_l2.push(createSprite(1920/2,1080/2 + 100,90,20));
                    //layer 3
                    l7_l3.push(createSprite(1920/2 - 75,1080/2 + 55,20,220/2));
                    l7_l3.push(createSprite(1920/2 + 32.5,1080/2 - 120,130/2,20));
                    l7_l3.push(createSprite(1920/2 + 75,1080/2 + 55,20,220/2));
                    l7_l3.push(createSprite(1920/2 + 32.5,1080/2 + 120,130/2,20));
                    //second half
                    l7_l3.push(createSprite(1920/2 - 75,1080/2 - 55,20,220/2));
                    l7_l3.push(createSprite(1920/2 - 32.5,1080/2 - 120,130/2,20));
                    l7_l3.push(createSprite(1920/2 + 75,1080/2 - 55,20,220/2));
                    l7_l3.push(createSprite(1920/2 - 32.5,1080/2 + 120,130/2,20));
                    //layer 4
                    l7_l4.push(createSprite(1920/2 - 95,1080/2 + 65,20,260/2));
                    l7_l4.push(createSprite(1920/2 + 42.5,1080/2 - 140,170/2,20));
                    l7_l4.push(createSprite(1920/2 + 95,1080/2 + 65,20,260/2));
                    l7_l4.push(createSprite(1920/2 + 42.5,1080/2 + 140,170/2,20));
                    //second half
                    l7_l4.push(createSprite(1920/2 - 95,1080/2 - 65,20,260/2));
                    l7_l4.push(createSprite(1920/2 - 42.5,1080/2 - 140,170/2,20));
                    l7_l4.push(createSprite(1920/2 + 95,1080/2 - 65,20,260/2));
                    l7_l4.push(createSprite(1920/2 - 42.5,1080/2 + 140,170/2,20));
                    //layer 1 corners
                    l7_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l7_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l7_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l7_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l7_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l7_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l7_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l7_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l7_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l7_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l7_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l7_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l7_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l7_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l7_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l7_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    robot[4].x = 1890;
                    robot[4].y = 30;
                    level7_layer1 = new Wall(l7_l1);
                    level7_corner1 = new Wall(l7_c1);
                    level7_layer2 = new Wall(l7_l2);
                    level7_corner2 = new Wall(l7_c2,1);
                    level7_layer3 = new Wall(l7_l3);
                    level7_corner3 = new Wall(l7_c3,1);
                    level7_layer4 = new Wall(l7_l4);
                    level7_corner4 = new Wall(l7_c4,1);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    rbt[4].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level7_layer1.l1();
                    level7_corner1.l1();
                    level7_layer2.l1();
                    level7_corner2.l1();
                    level7_layer3.l1();
                    level7_corner3.l1();
                    level7_layer4.l1();
                    level7_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){

                            lvl = 8;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 8){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l8_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l8_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l8_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l8_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l8_l2.push(createSprite(1920/2 - 55,1080/2 + 45,20,180/2));
                    l8_l2.push(createSprite(1920/2 + 22.5,1080/2 - 100,90/2,20));
                    l8_l2.push(createSprite(1920/2 + 55,1080/2 + 45,20,180/2));
                    l8_l2.push(createSprite(1920/2 + 22.5,1080/2 + 100,90/2,20));
                    //second half
                    l8_l2.push(createSprite(1920/2 - 55,1080/2 - 45,20,180/2));
                    l8_l2.push(createSprite(1920/2 - 22.5,1080/2 - 100,90/2,20));
                    l8_l2.push(createSprite(1920/2 + 55,1080/2 - 45,20,180/2));
                    l8_l2.push(createSprite(1920/2 - 22.5,1080/2 + 100,90/2,20));
                    //layer 3
                    l8_l3.push(createSprite(1920/2 - 75,1080/2 + 55,20,220/2));
                    l8_l3.push(createSprite(1920/2 + 32.5,1080/2 - 120,130/2,20));
                    l8_l3.push(createSprite(1920/2 + 75,1080/2 + 55,20,220/2));
                    l8_l3.push(createSprite(1920/2 + 32.5,1080/2 + 120,130/2,20));
                    //second half
                    l8_l3.push(createSprite(1920/2 - 75,1080/2 - 55,20,220/2));
                    l8_l3.push(createSprite(1920/2 - 32.5,1080/2 - 120,130/2,20));
                    l8_l3.push(createSprite(1920/2 + 75,1080/2 - 55,20,220/2));
                    l8_l3.push(createSprite(1920/2 - 32.5,1080/2 + 120,130/2,20));
                    //layer 4
                    l8_l4.push(createSprite(1920/2 - 95,1080/2 + 65,20,260/2));
                    l8_l4.push(createSprite(1920/2 + 42.5,1080/2 - 140,170/2,20));
                    l8_l4.push(createSprite(1920/2 + 95,1080/2 + 65,20,260/2));
                    l8_l4.push(createSprite(1920/2 + 42.5,1080/2 + 140,170/2,20));
                    //second half
                    l8_l4.push(createSprite(1920/2 - 95,1080/2 - 65,20,260/2));
                    l8_l4.push(createSprite(1920/2 - 42.5,1080/2 - 140,170/2,20));
                    l8_l4.push(createSprite(1920/2 + 95,1080/2 - 65,20,260/2));
                    l8_l4.push(createSprite(1920/2 - 42.5,1080/2 + 140,170/2,20));
                    //layer 1 corners
                    l8_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l8_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l8_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l8_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l8_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l8_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l8_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l8_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l8_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l8_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l8_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l8_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l8_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l8_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l8_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l8_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    robot[4].x = 1890;
                    robot[4].y = 30;
                    level8_layer1 = new Wall(l8_l1);
                    level8_corner1 = new Wall(l8_c1);
                    level8_layer2 = new Wall(l8_l2);
                    level8_corner2 = new Wall(l8_c2,1);
                    level8_layer3 = new Wall(l8_l3);
                    level8_corner3 = new Wall(l8_c3,1);
                    level8_layer4 = new Wall(l8_l4);
                    level8_corner4 = new Wall(l8_c4,1);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    rbt[4].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level8_layer1.l1();
                    level8_corner1.l1();
                    level8_layer2.l1();
                    level8_corner2.l1();
                    level8_layer3.l1();
                    level8_corner3.l1();
                    level8_layer4.l1();
                    level8_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                            if(!go && mouseIsPressed || flag === 1){
                            lvl = 9;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10)
                    }
                }
            }else if(lvl === 9){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    /*gem1 = createSprite(1920/2,1080/2 - 45,30,30);
                    gem2 = createSprite(1920/2,1080/2,30,30);
                    gem3 = createSprite(1920/2,1080/2 + 45,30,30);*/
                    g1 = 255; g2 = 255; g3 = 255;
                    //layer 1
                    l9_l1.push(createSprite(1920/2 - 35,1080/2,20,140));
                    l9_l1.push(createSprite(1920/2,1080/2 - 80,50,20));
                    l9_l1.push(createSprite(1920/2 + 35,1080/2,20,140));
                    l9_l1.push(createSprite(1920/2,1080/2 + 80,50,20));
                    //layer2
                    l9_l2.push(createSprite(1920/2 - 55,1080/2 + 45,20,180/2));
                    l9_l2.push(createSprite(1920/2 + 22.5,1080/2 - 100,90/2,20));
                    l9_l2.push(createSprite(1920/2 + 55,1080/2 + 45,20,180/2));
                    l9_l2.push(createSprite(1920/2 + 22.5,1080/2 + 100,90/2,20));
                    //second half
                    l9_l2.push(createSprite(1920/2 - 55,1080/2 - 45,20,180/2));
                    l9_l2.push(createSprite(1920/2 - 22.5,1080/2 - 100,90/2,20));
                    l9_l2.push(createSprite(1920/2 + 55,1080/2 - 45,20,180/2));
                    l9_l2.push(createSprite(1920/2 - 22.5,1080/2 + 100,90/2,20));
                    //layer 3
                    l9_l3.push(createSprite(1920/2 - 75,1080/2 + 55,20,220/2));
                    l9_l3.push(createSprite(1920/2 + 32.5,1080/2 - 120,130/2,20));
                    l9_l3.push(createSprite(1920/2 + 75,1080/2 + 55,20,220/2));
                    l9_l3.push(createSprite(1920/2 + 32.5,1080/2 + 120,130/2,20));
                    //second half
                    l9_l3.push(createSprite(1920/2 - 75,1080/2 - 55,20,220/2));
                    l9_l3.push(createSprite(1920/2 - 32.5,1080/2 - 120,130/2,20));
                    l9_l3.push(createSprite(1920/2 + 75,1080/2 - 55,20,220/2));
                    l9_l3.push(createSprite(1920/2 - 32.5,1080/2 + 120,130/2,20));
                    //layer 4
                    l9_l4.push(createSprite(1920/2 - 95,1080/2 + 260/3,20,260/3));
                    l9_l4.push(createSprite(1920/2 + 170/3,1080/2 - 140,170/3,20));
                    l9_l4.push(createSprite(1920/2 + 95,1080/2 + 260/3,20,260/3));
                    l9_l4.push(createSprite(1920/2 + 170/3,1080/2 + 140,170/3,20));
                    //second half
                    l9_l4.push(createSprite(1920/2 - 95,1080/2,20,260/3));
                    l9_l4.push(createSprite(1920/2,1080/2 - 140,170/3,20));
                    l9_l4.push(createSprite(1920/2 + 95,1080/2,20,260/3));
                    l9_l4.push(createSprite(1920/2,1080/2 + 140,170/3,20));
                    //third half
                    l9_l4.push(createSprite(1920/2 - 95,1080/2 - 260/3,20,260/3));
                    l9_l4.push(createSprite(1920/2 - 170/3,1080/2 - 140,170/3,20));
                    l9_l4.push(createSprite(1920/2 + 95,1080/2 - 260/3,20,260/3));
                    l9_l4.push(createSprite(1920/2 - 170/3,1080/2 + 140,170/3,20));
                    //layer 1 corners
                    l9_c1.push(createSprite(1920/2 - 35,1080/2 - 80,20,20));
                    l9_c1.push(createSprite(1920/2 + 35,1080/2 - 80,20,20));
                    l9_c1.push(createSprite(1920/2 + 35,1080/2 + 80,20,20));
                    l9_c1.push(createSprite(1920/2 - 35,1080/2 + 80,20,20));
                    //layer 2 corners
                    l9_c2.push(createSprite(1920/2 - 55,1080/2 - 100,20,20));
                    l9_c2.push(createSprite(1920/2 + 55,1080/2 - 100,20,20));
                    l9_c2.push(createSprite(1920/2 + 55,1080/2 + 100,20,20));
                    l9_c2.push(createSprite(1920/2 - 55,1080/2 + 100,20,20));
                    //layer 3 corners
                    l9_c3.push(createSprite(1920/2 - 75,1080/2 - 120,20,20));
                    l9_c3.push(createSprite(1920/2 + 75,1080/2 - 120,20,20));
                    l9_c3.push(createSprite(1920/2 + 75,1080/2 + 120,20,20));
                    l9_c3.push(createSprite(1920/2 - 75,1080/2 + 120,20,20));
                    //layer 4 corners
                    l9_c4.push(createSprite(1920/2 - 95,1080/2 - 140,20,20));
                    l9_c4.push(createSprite(1920/2 + 95,1080/2 - 140,20,20));
                    l9_c4.push(createSprite(1920/2 + 95,1080/2 + 140,20,20));
                    l9_c4.push(createSprite(1920/2 - 95,1080/2 + 140,20,20));
                    //
                    robot[0].x = 30;
                    robot[0].y = 30;
                    robot[1].x = 980;
                    robot[1].y = 540;
                    robot[2].x = 30;
                    robot[2].y = 1050;
                    robot[3].x = 1890;
                    robot[3].y = 1050;
                    robot[4].x = 1890;
                    robot[4].y = 30;
                    level9_layer1 = new Wall(l9_l1);
                    level9_corner1 = new Wall(l9_c1,1);
                    level9_layer2 = new Wall(l9_l2);
                    level9_corner2 = new Wall(l9_c2,2);
                    level9_layer3 = new Wall(l9_l3);
                    level9_corner3 = new Wall(l9_c3,2);
                    level9_layer4 = new Wall(l9_l4);
                    level9_corner4 = new Wall(l9_c4,1);
                    for(var i = 0; i < rbt.length; i++){
                        rbt[i].k = true;
                        rbt[i].m = true;
                        rbt[i].over = 256;
                    }
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    player.speed = 5;
                    create = false;
                }
                if(start === 0){
                    if(player.t > 0 && player.x !== 160 && player.y !== 90){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 160;
                        player.y = 90;
                    }
                    if(player.t <= 221 && player.x === 160 && player.y === 90){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 160 && player.y === 90 && mouseIsPressed || flag === 1){
                        start = 1;
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    rbt[1].move();
                    rbt[2].move();
                    rbt[3].move();
                    rbt[4].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(g1 + g2 + g3 > 3 && !go){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                            mainMusic.playMode('untilDone');
                            mainMusic.play();
                            mainMusic.setVolume(1,2);
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                            amplitude.setInput(mainMusic);
                            mainMusic.setVolume(0,0.7);
                            completionMusic.playMode('untilDone');
                            completionMusic.play();
                            completionMusic.setVolume(1.7,0.5);
                        }
                        player.speed = 0.5;
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                        };
                        //player.m = false;
                    }
                    level9_layer1.l1();
                    level9_corner1.l1();
                    level9_layer2.l1();
                    level9_corner2.l1();
                    level9_layer3.l1();
                    level9_corner3.l1();
                    level9_layer4.l1();
                    level9_corner4.l1();
                    for(var j = 0; j < robot.length; j++){
                        if(robot[j] !== undefined){
                            if(rbt[j].type !== 1){
                                rbt[j].collideGems();
                            }
                        }
                    }
                    if(rbt[0].over + rbt[1].over > 5 && rbt[0].over + rbt[1].over < 20){
                        flag = 0;
                    }
                    if(rbt[0].over + rbt[1].over < 2){
                        if(!go && mouseIsPressed || flag === 1){

                            lvl = 10;
                            create = true;
                        }
                    }
                    gem.gem1();
                    gem.gem2();
                    gem.gem3();
                    player.collide(gem1);
                    player.collide(gem2);
                    player.collide(gem3);
                    if(textx !== 0 && texty !== 0){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        text("LEVEL "+lvl+" COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10);
                    }
                }
            }else if(lvl === 10){
                if(create){
                    del();
                    completionMusic.setVolume(0,0.5);
                    bossMusic.stop();
                    mouseIsPressed = false;
                    flag = 0;
                    start = 0;
                    var temp = rbt.length;
                    for(var i = 0; i < temp; i++){
                        robot.pop();
                        rbt.pop();
                    }
                    robot.push(createSprite(1920/2 + 4,1080/2 + 2.5,10,10)); //robot[1] FINAL BOSS
                    rbt.push(new Rbt(0,2)); //rbt[1] FINAL BOSS
                    while(l10_gc.length !== 4){
                        l10_gc.push(createSprite(-10,-10,20,20));
                    }
                    while(l10_rc.length !== 32){
                        l10_rc.push(createSprite(-10,-10,20,20));
                    }
                    l10_ec.push(createSprite(-10,-10,15,15));
                    //this.stunrange.visible = false;
                    //stunrange.setCollider();
                    //stunrange.debug = true;
                    level10_gcorner = new Wall(l10_gc,1);
                    level10_rcorner = new Wall(l10_rc,2);
                    level10_ecorner = new Wall(l10_ec,3);
                    levelTiming = 0;
                    levelTime = 0;
                    wallbreaks = 0;
                    textx = 0;
                    texty = 0;
                    endbreaks = 0;
                    player.speed = 5;
                    opaquefactor = 0;
                    winplaying = false;
                    endTime = 0;
                    appearin = 15;
                    create = false;
                }
                if(start === 0){
                    rbt[0].m = false;    
                    if(player.t > 0 && player.x !== 1920/2 - 20 && player.y !== 1080/2 - 11.25){
                        player.t -= 34;
                    }
                    if(player.t <= 0){
                        player.x = 1920/2 - 20;
                        player.y = 1080/2 - 11.25;
                    }
                    if(player.t <= 221 && player.x === 1920/2 - 20 && player.y === 1080/2 - 11.25){
                        player.t += 34;
                    }
                    if(player.t >= 255 && player.x === 1920/2 - 20 && player.y === 1080/2 - 11.25 && mouseIsPressed || flag === 1){
                        start = 1;
                        rbt[0].m = true;
                    }
                    if(player.x === 1920/2 - 20 && player.y === 1080/2 - 11.25){
                        rbt[0].move();
                    }
                }
                if(start === 1){
                    rbt[0].move();
                    for(var i = 0; i < rbt.length; i++){
                        for(var j = 0; j < rbt.length; j++){
                            if(i !== j){
                                rbt[i].collide(robot[j]);
                            }
                        }
                        rbt[i].collide(player);
                    }
                    if(endbreaks < 5 && !go && !won){
                        for(var j = 0; j < robot.length; j++){
                            if(robot[j] !== undefined){
                                rbt[j].kill();
                                rbt[j].turn();
                            }
                        }
                    }else{
                        for(var i = 0; i < rbt.length; i++){
                            rbt[i].k = false;
                            rbt[i].m = false;
                            if(rbt[i].over > 250){
                                rbt[i].over -= 8.5
                            }
                        }
                        player.speed = 0.5;
                        
                        //player.m = false;
                    }
                    //console.log(opaque+"\n"+opaquefactor+"\n"+appearin);
                    if(appearin !== -1){
                        appearin -= 0.05; 
                    }else{
                        //console.log(1);
                        if(opaquefactor < 255){
                            opaquefactor += 25;
                            //console.log(2);
                        }else{
                            for(var i = 0; i < l10_gc.length; i++){
                                if(l10_gc[i]){
                                    l10_gc[i].x = -10;
                                    l10_gc[i].y = -10;
                                }else{
                                    l10_gc[i] = createSprite(-10,-10,20,20);
                                    level10_gcorner = delete [];
                                    level10_gcorner = new Wall(l10_gc,1);
                                }
                            }
                            for(var i = 0; i < l10_rc.length; i++){
                                if(l10_rc[i] && l10_rc[i].strength2 >= 250){
                                    l10_rc[i].x = -10;
                                    l10_rc[i].y = -10;
                                }else if(l10_rc[i] && l10_rc[i].strength2 < 250){
                                    delete l10_rc[i];
                                    l10_rc[i] = createSprite(-10,-10,20,20);
                                    level10_rcorner = delete [];
                                    level10_rcorner = new Wall(l10_rc,2);
                                }else{
                                    l10_rc[i] = createSprite(-10,-10,20,20);
                                    level10_rcorner = delete [];
                                    level10_rcorner = new Wall(l10_rc,2);
                                }
                            }
                            if(l10_ec[0] && l10_ec[0].strength >= 253){
                                l10_ec[0].x = -10;
                                l10_ec[0].y = -10;
                            }else if(l10_ec[0] && l10_ec[0].strength < 253){
                                delete l10_ec[0];
                                l10_ec[0] = createSprite(-10,-10,20,20);
                                level10_ecorner = delete [];
                                level10_ecorner = new Wall(l10_ec,3);
                            }else{
                                l10_ec[0] = createSprite(-10,-10,20,20);
                                level10_ecorner = delete [];
                                level10_ecorner = new Wall(l10_ec,3);
                            }
                            appearin = 15;
                            opaquefactor = 255;
                        }
                    }
                    if(appearin > 10 - endbreaks){

                        opaque = false;
                    }else if(appearin > 0 && appearin <= 10 - endbreaks){
                        if(opaque){
                            if(opaquefactor > 0){
                                opaquefactor -= 25;
                            }else{
                                opaquefactor = 0;
                            }
                        }else{
                            if(player.x - 230 < 0){
                                var x = "-";
                            }else if(player.x + 230 > 1920){
                                var x = "+";
                            }else{
                                var temp = Math.round(Math.random());
                                if(temp){
                                    var x = "-";
                                }else{
                                    var x = "+";
                                }
                            }
                            if(player.y - 230 < 0){
                                var y = "-";
                            }else if(player.y + 230 > 1080){
                                var y = "+";
                            }else{
                                var temp1 = Math.round(Math.random());
                                if(temp1){
                                    var y = "-";
                                }else{
                                    var y = "+";
                                }
                            }
                            for(var w = 1; w <= 6; w++){
                                for(var h = 1; h <= 6; h++){
                                    if((w === 1 || w === 6) && (h === 1 || h === 6)){
                                        for(var i = 0; i < l10_gc.length; i++){
                                            if(!l10_gc[i]){
                                                let tempx = eval(player.x+invert(x)+(200+v3(w)*30)+x+(w*30));
                                                let tempy = eval(player.y+invert(y)+(200+v3(h)*30)+y+(h*30));
                                                l10_gc[i] = createSprite(tempx,tempy,20,20);
                                                level10_gcorner = delete [];
                                                level10_gcorner = new Wall(l10_gc,1);

                                            }else if(l10_gc[i].x === -10 && l10_gc[i].y === -10){
                                                if(l10_gc[i]){
                                                    l10_gc[i].x = eval(player.x+invert(x)+(200+v3(w)*30)+x+(w*30));
                                                    l10_gc[i].y = eval(player.y+invert(y)+(200+v3(h)*30)+y+(h*30));
                                                }
                                                break;
                                            }
                                        }
                                    }else{
                                        for(var i = 0; i < l10_rc.length; i++){
                                            if(!l10_rc[i]){
                                                    let tempx = eval(player.x+invert(x)+(200+v3(w)*30)+x+(w*30));
                                                    let tempy = eval(player.y+invert(y)+(200+v3(h)*30)+y+(h*30));
                                                    l10_rc[i] = createSprite(tempx,tempy,20,20);
                                                    level10_rcorner = delete [];
                                                    level10_rcorner = new Wall(l10_rc,1);
                                            }else if(l10_rc[i].x === -10 && l10_rc[i].y === -10){
                                                if(l10_rc[i]){
                                                    l10_rc[i].x = eval(player.x+invert(x)+(200+v3(w)*30)+x+(w*30));
                                                    l10_rc[i].y = eval(player.y+invert(y)+(200+v3(h)*30)+y+(h*30));
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if(!l10_ec[0]){
                                let tempx = eval(player.x+invert(x)+(200+15)+x+(3*30));
                                let tempy = eval(player.y+invert(y)+(200+15)+y+(3*30));
                                l10_ec[0] = createSprite(tempx,tempy,20,20);
                                level10_ecorner = delete [];
                                level10_ecorner = new Wall(l10_ec,3);
                            }else if(l10_ec[0].x === -10 && l10_ec[0].y === -10){
                                if(l10_ec[0]){
                                    l10_ec[0].x = eval(player.x+invert(x)+(200)+x+(3*30));
                                    l10_ec[0].y = eval(player.y+invert(y)+(200)+y+(3*30));
                                }
                            }
                            opaque = true;
                        }
                    }else{
                        opaque = false;
                        appearin = -1;
                    }
                    level10_gcorner.l1();
                    level10_rcorner.l1();
                    level10_ecorner.l1();
                    if(!won && !go){
                        if(opaque){
                            textAlign(CENTER);
                            textStyle(BOLD);
                            textFont(ocra);
                            textSize(13);
                            strokeWeight(1);
                            fill("purple");
                            stroke(255,255,255,200);
                            text("DISAPPEAR IN: " + roundoff(appearin,1), camera.position.x+2.5, camera.position.y - windowHeight/(camera.zoom * 2) + 18); 
                        }else{
                            textAlign(CENTER);
                            textStyle(BOLD);
                            textFont(ocra);
                            textSize(13);
                            strokeWeight(1);
                            fill("purple");
                            stroke(255,255,255,200);
                            text("APPEAR IN: " + roundoff(appearin-10+endbreaks,1), camera.position.x+2.5, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
                        }
                    }
                    if(endbreaks === 5){
                        flag = 0;
                        endbreaks += 1;
                    }else if(endbreaks > 5){
                        won = true;
                        bossMusic.setVolume(0,0.25);
                        bossMusic2.setVolume(0,0.25);
                    }else{
                        mainMusic.setVolume(0,0.5);
                        bossMusic.playMode('untilDone');
                        bossMusic2.playMode('untilDone');
                        bossMusic.play();
                        bossMusic2.play();
                        if(opaque){
                            bossMusic.setVolume(0,1);
                            bossMusic2.setVolume(1.3,0.5);
                        }else{
                            bossMusic.setVolume(1.3,1);
                            bossMusic2.setVolume(0,0.5);
                        }
                        //winMusic.setVolume(1,0.5);
                    }
                    if(won === true){
                        rbt[0].m = false;
                        rbt[0].k = false;
                        rbt[0].dashin = -3;
                        rbt[0].dash = false;
                        player.m = false;
                        opaque = false;
                        if(robot[0].isTouching(player)){
                            robot[0].velocityX = 0.1;
                            robot[0].velocityY = 0.1;
                            robot[0].bounceOff(player);
                        }
                        if(rbt[0].t3 > 0){
                            rbt[0].t3 -= 17;
                        }else{
                            if(rbt[0].over > 0){
                                rbt[0].t1 -= 12.75;
                                rbt[0].t2 -= 12.75;
                                rbt[0].over -= 8.5;
                            }else{
                                if(rbt[0].t1 > 0){
                                    rbt[0].t1 -= 12.75;
                                }
                            }
                        }
                        if(textx === 0 && texty === 0 && !go){
                            textx = player.x - 120;
                            texty = player.y - 40;
                        }
                        if(levelTiming === 0){
                            levelTiming += 1;
                            var storemillis = round(millis(),3);
                            levelTime = storemillis/1000 - startTime;
                            totalTime += levelTime;
                            totalWallbreaks += wallbreaks;
                            ltwbRatio = levelTime/wallbreaks;
                            endTime = round(millis());
                        }
                        winMusic.playMode('untilDone');
                        winMusic.play();
                        if((endTime - 3000) + winMusic.duration()*1000 > millis()){
                            winMusic.setVolume(0.4,0.5);
                        }else{
                            winMusic.setVolume(0,1);
                        }
                        //winMusic.setVolume(1,0.4);
                        /*if(millis() > levelTime*0.75){
                            winMusic.setVolume(winMsic.currentTime()*5/winMusic.duration(),0.7);
                        }*/
                        if(mouseIsPressed || flag === 1){
                            change = true;
                            changeto = "menu";
                            changetime = round(millis());
                            mainMusic.setVolume(0,0.9);
                            bossMusic.setVolume(0,0.9);
                            winMusic.setVolume(0,0.9);
                        }
                    }
                    if(rbt[0].over > 0 && rbt[0].over < 10){
                        flag = 0;
                    }
                    if(rbt[0].over < 1){
                        if(!go && mouseIsPressed || flag === 1){
                            won = true;
                        }
                    }
                    if(textx !== 0 && texty !== 0 && won){
                        textFont(agencyfb);
                        textSize(40);
                        stroke(100,100,0,50);
                        strokeWeight(5);
                        fill(0, 102, 153);
                        textStyle(BOLD);
                        textAlign(LEFT);
                        text("GAME COMPLETE!",textx,texty);
                        textFont('Arial');
                        textSize(10);
                        stroke(0,0,0,180);
                        strokeWeight(1);
                        textStyle(BOLDITALIC);
                        text("\nTime: "+roundoff(levelTime,3)+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx,texty+10);
                    }
                    if(rbt[0].dashin >= -0.5 && !go){
                        textAlign(CENTER);
                        textStyle(BOLD);
                        textFont(ocra);
                        textSize(13);
                        strokeWeight(1);
                        if(rbt[0].dashin > 0.1){
                            fill("purple");
                            stroke(255,255,255,200);
                            text("\nDASH IN: " + roundoff(rbt[0].dashin,1), camera.position.x+2.5, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
                        }else{
                            fill("#B80F0A");
                            stroke(255,255,255,200);
                            text("\nDASH!", camera.position.x+2.5, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
                        }
                    }
                    if(rbt[0].dashin <= 0 && rbt[0].dashin !== -1 && rbt[0].dashin !== -2){
                        player.speed = 2;
                    }else{
                        player.speed = 5;
                    }
                    //console.log(player.speed);
                }
            }
            if(lives === 0 && !won){
                flag = 0;
                /*for(var i = 0; i < rbt.length; i++){
                    rbt[i].m = false;
                    rbt[i].k = false;
                }*/
                go = true;
                lives = -1;
                player.m = false;
                textx1 = player.x - 105;
                texty1 = player.y - 42.5;
                mainMusic.setVolume(0,0.9);
                bossMusic.setVolume(0,0.9);
                bossMusic2.setVolume(0,0.9);
                flag = 0;
            }
            if(lives === -1){
                mainMusic.setVolume(0.2,0.7);
                bossMusic.setVolume(0.2,0.7);
                bossMusic2.setVolume(0,0.9);
                completionMusic.setVolume(0,0);
                winMusic.setVolume(0,0);
                opaque = false;
                textFont(agencyfb);
                textSize(50);
                stroke(255,0,0,50);
                strokeWeight(15);
                fill(191, 40, 40);
                textStyle(BOLD);
                textAlign(LEFT);
                text("GAME. OVER.",textx1,texty1);
                textFont('Arial');
                textSize(10);
                stroke(0,0,0,180);
                strokeWeight(1);
                textStyle(BOLDITALIC);
                text("\nTime: "+levelTime+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx1,texty1+10);
                if(mouseIsPressed || flag === 1){
                    change = true;
                    changeto = "menu";
                    changetime = round(millis());
                    mainMusic.setVolume(0,0.9);
                    bossMusic.setVolume(0,0.9);
                    bossMusic2.setVolume(0,0.9);
                    completionMusic.setVolume(0,0);
                    winMusic.setVolume(0,0);
                    lives = -2;
                    flag = 0;
                }
            }
            textAlign(LEFT);
            textStyle(BOLD);
            textFont(ocra);
            textSize(13);
            fill("purple");
            stroke(255,255,255,200);
            strokeWeight(1);
            if(lives > 0){
                text("lives: "+lives+"\nlevel: "+lvl, camera.position.x-windowWidth/(camera.zoom*2) + 7, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
                textAlign(RIGHT);
                text("FPS: "+round(frameRate()), camera.position.x+windowWidth/(camera.zoom*2) - 7, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
            }else{
                text("lives: none :(\nlevel: "+lvl, camera.position.x-windowWidth/(camera.zoom*2) + 7, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
                textAlign(RIGHT);
                text("FPS: "+round(frameRate()), camera.position.x+windowWidth/(camera.zoom*2) - 7, camera.position.y - windowHeight/(camera.zoom * 2) + 18);
            }
            if(lives <= -2){
                flag = 0;
                opaque = false;
                textFont(agencyfb);
                textSize(50);
                stroke(255,0,0,50);
                strokeWeight(15);
                fill(191, 40, 40);
                textStyle(BOLD);
                textAlign(LEFT);
                text("GAME. OVER.",textx1,texty1);
                textFont('Arial');
                textSize(10);
                stroke(0,0,0,180);
                strokeWeight(1);
                textStyle(BOLDITALIC);
                text("\nTime: "+levelTime+"s\nTotal Time: "+roundoff(totalTime,3)+"s\nWall Breaks: "+wallbreaks+"\nTotal Wall Breaks: "+totalWallbreaks+"\nTime/Wall Breaks: "+roundoff(ltwbRatio,3)+"\nTotal Time/Total Wall Breaks: "+roundoff(totalTime/totalWallbreaks,3),textx1,texty1+10);
                mainMusic.setVolume(0,0.9);
                bossMusic.setVolume(0,0.9);
                bossMusic2.setVolume(0,0.9);
                completionMusic.setVolume(0,0);
                winMusic.setVolume(0,0);
            }
        }
    }
}
