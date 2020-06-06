class Rbt{
    constructor(n,t){
        this.serial = n;
        this.type = t;
        this.m = true;
        this.k = true;
        this.over = 255;
        robot[n].speed = 4.8;
        robot[n].visible = false;
        this.dash = false;
        this.dashin = -2;
        if(t === 2){
            this.stunrange = createSprite(robot[0].x,robot[0].y,150,150);
            this.stunrange.setCollider("circle");
            this.stunrange.debug = true;
            this.stunrange.visible = false;
            this.t1 = 255;
            this.t2 = 169;
            this.t3 = 255;
        }
    }

    turn(){
        robot[this.serial].rotation = Math.atan2(player.y-robot[this.serial].y, player.x-robot[this.serial].x) * 180/PI;
        /*push();
        translate(robot[this.serial].x, robot[this.serial].y);
        tint(0, 153, 204, 126);
        rotate(robot[this.serial].rotation);
        image(ximg,0-robot[this.serial].width/2,0-robot[this.serial].height/2,30,30);
        pop();*/
    }

    move(){
        push();
        translate(robot[this.serial].x, robot[this.serial].y);
        rotate(robot[this.serial].rotation + 90);
        imageMode(CENTER);
        tint(255, 255);
        image(rbt_img,0,0,robot[this.serial].width,robot[this.serial].height);
        switch(this.type){
            case 0:
                tint(255,this.over);
                image(redd,0,0,robot[this.serial].width,robot[this.serial].height);
                pop();
                break;
            case 1:
                tint(255,this.over);
                image(neon,0,0,robot[this.serial].width,robot[this.serial].height);
                pop();
                break;
            case 2:
                tint(255,this.over);
                image(gold,0,0,robot[this.serial].width,robot[this.serial].height);
                tint(255,255,255,this.t1);
                image(ring,0,0,42,42);
                tint(255,69,69,this.t2);
                image(ring,0,0,85,85);
                tint(255,this.t3);
                image(ring,0,0,167,167);
                if(this.dashin <= 0){
                    translate(robot[this.serial].previousPosition.x, robot[this.serial].previousPosition.y);
                    tint(255,this.over/2);
                    image(gold,0,0,robot[this.serial].width,robot[this.serial].height);
                }
                pop();
                break;
            default:
                break;
        }
        if(this.over < 255){
            this.k = false;
            if(this.over > 0){
                this.over -= 4;
            }
        }
        var run1 = player.x - robot[this.serial].x;
        var rise1 = player.y - robot[this.serial].y;
        var length1 = sqrt((rise1 * rise1) + (run1 * run1));
        if(this.m){
            var run = player.previousPosition.x - robot[this.serial].x;
            var rise = player.previousPosition.y - robot[this.serial].y;

            var length  = sqrt((rise * rise) + (run * run));
            var unitX   = run   / length;
            var unitY   = rise  / length;

            robot[this.serial].x += unitX * robot[this.serial].speed;
            robot[this.serial].y += unitY * robot[this.serial].speed;

           // robot[this.serial].collide(edge);             
        }
        if(this.type === 2 && !go && !won){
            //console.log(dashToX, dashToY, " \n", robot[this.serial].x,1, robot[this.serial].y,1);
            if(length1 >= 28  && length1 < 48.5){
                /*if(dashToX === 0 && dashToY === 0 && !this.dash){
                    this.m = true;
                }*/
                //console.log(this.dash, this.dashin, dashToX);
                if(dashToX === 0 && dashToY === 0 && (this.dashin > 0 || this.dashin === -1 || this.dashin === -2)){
                    this.m = true;
                    //console.log("did");
                }
                if(this.dashin === -2 || this.dashin === -1){
                    this.dashin = 10.00;
                }else{
                    if(this.dashin > 0){
                        this.dashin -= 0.05 + Math.round((48.5-length1))/1000;
                    }
                }
            }else if(length1 >= 48.5){
                this.m = false;
                this.dash = true;
                if(this.dashin === -1 && this.dashin !== -2){
                    this.dashin = 6.20;
                }else{
                    if(this.dashin === -2){
                        this.dashin = 6.90;
                    }    
                    if(this.dashin > 0){
                        this.dashin -= 0.05;
                    }
                }
            }else{
                if(this.dashin === -2){
                    this.dashin = -2;
                }else if(this.dashin > 0 && this.dashin <= 3/* || this.dashin === -1 */){
                    this.dashin = -1;
                }else if(this.dashin > 3){
                    this.dashin -= 0.05;
                }
                if(Math.round(millis()) - lasthit < 400 && this.dash){
                    this.dash = false;
                    this.m = true;
                    this.dashin = -1;
                }
            }
            if(/*roundoff(*/this.dashin/*,1)*/ <= 0 && this.dashin !== -1 && this.dashin !== -2 && this.dashin !== -3){
                this.m = false;
                if(dashToX === 0 && dashToY === 0){
                    dashToX = /*Math.round(*/player.x//);
                    dashToY = /*Math.round(*/player.y//);
                    //console.log("new set");
                    this.dash = true;
                    dashSpeed = Math.abs(Math.round(length1-48.5))/100;
                    player.speed = 3.5;
                    //console.log(dashSpeed);
                }//else if(Math.round(robot[this.serial].x) !== dashToX && Math.round(robot[this.serial].y) !== dashToY){
                if(roundoff(robot[this.serial].x,2) !== roundoff(dashToX,2) && roundoff(robot[this.serial].y,2) !== roundoff(dashToY,2) && dashToX !== 0 && dashToY !== 0){
                    var run2 = dashToX - robot[this.serial].x;
                    var rise2 = dashToY - robot[this.serial].y;
                    var length2 = sqrt((rise2 * rise2) + (run2 * run2));
                    var unitX1   = run2   / length2;
                    var unitY1   = rise2  / length2;

                    if(robot[this.serial].x === dashToX && robot[this.serial].y === dashToY){
                        robot[this.serial].x = dashToX;
                        robot[this.serial].y = dashToY;
                    }
                    if(robot[this.serial].x !== dashToX){
                        if(dashSpeed > 1){
                            if(dashSpeed > 2){
                                robot[this.serial].x += unitX1 * 20*2*length2/frameRate();
                            }else{
                                robot[this.serial].x += unitX1 * 20*dashSpeed*length2/frameRate();
                            }
                            //robot[this.serial].y += unitY1 * 10*length2/frameRate();
                            //console.log("not yet x");
                        }else{
                            robot[this.serial].x += unitX1 * 20*length2/frameRate();
                            //robot[this.serial].y += unitY1 * 10*length2/frameRate();
                            //console.log("not yet x");
                        }
                    }else{
                        robot[this.serial].x = dashToX;
                    }
                    if(Math.round(robot[this.serial].y) !== dashToY){
                        if(dashSpeed > 1){
                            //robot[this.serial].x += unitX1 * 10*length2/frameRate();
                            if(dashSpeed > 2){
                                robot[this.serial].y += unitY1 * 20*2*length2/frameRate();
                            }else{
                                robot[this.serial].y += unitY1 * 20*dashSpeed*length2/frameRate();
                            }
                            //console.log("not yet y");
                        }else{
                            //robot[this.serial].x += unitX1 * 10*length2/frameRate();
                            robot[this.serial].y += unitY1 * 20*length2/frameRate();
                            //console.log("not yet y");
                        }
                    }else{
                        robot[this.serial].y = dashToY;
                    }
                }
                //if(Math.round(robot[this.serial].x) === dashToX && Math.round(robot[this.serial].y) === dashToY/* && dashToX !== 0 && dashToY !== 0*/){
                if(roundoff(robot[this.serial].x,0) < roundoff(dashToX,0)+2 && roundoff(robot[this.serial].x,0) > roundoff(dashToX,0)-2 && roundoff(robot[this.serial].y,0) > roundoff(dashToY,0)-2 && roundoff(robot[this.serial].y,0) < roundoff(dashToY,0)+2 && dashToX !== 0 && dashToY !== 0){
                    this.dash = false;
                    this.dashin = -1;
                    dashToX = 0;
                    dashToY = 0;
                    //console.log("Reseted");
                    this.m = true;
                    player.speed = 5;
                }
            }
            this.stunrange.x = robot[0].x;
            this.stunrange.y = robot[0].y;
            push();
            translate(this.stunrange.x,this.stunrange.y);
            imageMode(CENTER);
            
            pop();
        }
    }

    kill(){
        if(this.k && robot[this.serial].isTouching(player)){
            if(Math.round(millis()) - lasthit > 400){
                if(dashToX !== 0 && dashToY !== 0){
                    this.dash = false;
                    this.dashin = -1;
                    dashToX = 0;
                    dashToY = 0;
                    //console.log("Reseted");
                    hitsound.play();
                    lives -= 1;
                    this.m = true;
                }else{
                    hitsound.play();
                    lives -= 1;
                }
            }
            lasthit = Math.round(millis());
            this.teleport();
        }
    }

    teleportLimitations(){
        if(robot[this.serial].x < edge[0].x+200 || robot[this.serial].x > edge[2].x-200 ||
           robot[this.serial].y < edge[1].y+200 || robot[this.serial].y > edge[3].y-200 ||
           robot[this.serial].isTouching(player) || 
           robot[this.serial].isTouching(gem1) ||
           robot[this.serial].isTouching(gem2) ||
           robot[this.serial].isTouching(gem3) ||
           robot[this.serial].isTouching(edge) ){   
                        
            return true;
        }else{
            
            return false;
        }
    }

    async teleport(){
        //robot[this.serial].rotation = player.rotation - 180;
        await randomSeed(millis()*second());
        var temp = Math.round(random());
        if(temp === 0)
            robot[this.serial].x = random(player.x-51,player.x-10);
        else
            robot[this.serial].x = random(player.x+10,player.x+51);
        await randomSeed(Math.round(0.5*millis()));
        var newTemp = Math.round(random());
        if(newTemp === 0)
            robot[this.serial].y = random(player.y-51,player.y-10);
        else
            robot[this.serial].y = random(player.y+10,player.y+51);
        if(this.teleportLimitations()){
            this.teleport();
        }/*else if(robot[this.serial].rotation + 180 > player.rotation + 180 + 45 && robot[this.serial].rotation + 180 < player.rotation + 180 + 315){
            randomSeed(69);
            robot[this.serial].rotation = player.rotation - 180;
            this.teleport();
            console.log(player.rotation + 180)
            console.log(robot[this.serial].rotation + 180)
        }else{

        }*/
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    collideGems(){
        robot[this.serial].collide(gem1);
        robot[this.serial].collide(gem2);
        robot[this.serial].collide(gem3);
    }

    collide(sprite){
        robot[this.serial].collide(sprite);
    }
}