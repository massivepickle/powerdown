class Wall{
    constructor(n,t){
        this.count = n.length;
        this.n = n;
        this.type = t;
        //this.layer = l;
        this.horizontal = loadImage("horizontal.png");
        this.vertical = loadImage("vertical.png");
        this.corner = loadImage("corner.png");
        this.goldcorner = loadImage("goldcorner.png");
        this.redcorner = loadImage("redcorner.png");
        this.redcornerglow = loadImage("redcornerglow.png");
        this.emeraldcorner = loadImage("emeraldcorner.png");
        this.emeraldcornerglow = loadImage("emeraldcornerglow.png");
        for(var i = 0; i < n.length; i++){
            n[i].strength = 255;
            if(t > 2){
                n[i].strength2 = 100; 
            }else{
                n[i].strength2 = 255;
            }
            n[i].s = 1;
            n[i].visible = false;
        }
    }

    l1(){
        for(var i = 0; i < this.count; i++){
            if(this.n[i] !== undefined){
                push();
                translate(this.n[i].x,this.n[i].y);
                if(this.n[i].strength <= 1 && this.type !== 3){
                    delete this.n[i];
                    wallbreaks += 1;
                    wallbreakSound.play();
                    break;
                }
                if(this.n[i].strength2 <= 1 && this.type === 3){
                    delete this.n[i];
                    //wallbreaks += 1;
                    endbreaks += 1;
                    powerdownsound.setVolume(3,0);
                    if(this.n[i]){
                        powerdownsound.play();
                    }
                    //console.log(this.n[i]);
                    //wallbreakSound.play();
                    break;
                }
                for(var j = 0; j < robot.length; j++){
                    if(robot[j] !== undefined){
                        if(rbt[j].type !== 1 && this.type !== 1 && opaque){
                            if(robot[j].isTouching(this.n[i])){
                                this.n[i].strength -= 8.5;
                            }
                        }
                        rbt[j].collide(this.n[i]);
                    }
                }
                if(this.type){
                    imageMode(CENTER);
                    switch(this.type){
                        case 1: 
                            tint(255,this.n[i].strength-opaquefactor);
                            image(this.goldcorner,0,0,this.n[i].width,this.n[i].height);
                            break;
                        case 2:
                            tint(255,this.n[i].strength-opaquefactor);
                            image(this.redcorner,0,0,this.n[i].width,this.n[i].height);
                            if(this.n[i].s === 1){
                                this.n[i].strength = 255;
                                if(player.isTouching(this.n[i]) && opaque){
                                    this.n[i].s = 0;
                                    lives -= 1;
                                }
                            }else{
                                if(this.n[i].strength2 > 0){
                                    this.n[i].strength2 -= 17;
                                }
                            }
                            tint(255,this.n[i].strength2-opaquefactor);
                            image(this.redcornerglow,0,0,this.n[i].width,this.n[i].height);
                            break;
                        case 3:
                            tint(255,this.n[i].strength-opaquefactor);
                            image(this.emeraldcorner,0,0,this.n[i].width,this.n[i].height);
                            if(this.n[i].s === 1){
                                this.n[i].strength = 255;
                                if(this.n[i].isTouching(robot[0]) && opaque){
                                    this.n[i].s = 0;
                                    if(lifechance === 75){
                                        let arr = ["yes","yes","yes","no"];
                                        var yrn = random(arr);
                                        if(yrn === "yes"){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 50){
                                        let arr = ["yes","no"];
                                        var yrn = random(arr);
                                        if(yrn === "yes"){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 33){
                                        let arr = ["yes","no"];
                                        var yrn = random(arr);
                                        if(yrn === "yes"){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 25){
                                        let arr = ["yes","no","no","no"];
                                        var yrn = random(arr);
                                        if(yrn === "yes"){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 10){
                                        let arr = ["yes","no","no","no","no","no","no","no","no","no"];
                                        var yrn = random(arr);
                                        if(yrn === "yes"){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 5){
                                        var yrn = Math.floor(Math.random() * 100);
                                        if(yrn >= 69 && yrn < 74){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 1){
                                        var yrn = Math.floor(Math.random() * 100);
                                        if(yrn === 69){
                                            lives += 1;
                                            /*

                                            PLAY SOUND

                                            */
                                        }
                                    }else if(lifechance === 0.1){
                                        var yrn = Math.floor(Math.random() * 1000);
                                        if(yrn === 420){
                                            lives += 1;
                                        }
                                    }else if(lifechance === 100){
                                        lives += 1;
                                    }
                                    powerdownsound.setVolume(3,0);
                                    powerdownsound.play();
                                }
                            }else{
                                if(this.n[i].strength2 > 0){
                                    this.n[i].strength2 -= 2;
                                    this.n[i].strength -= 15;
                                }
                            }
                            tint(255,this.n[i].strength2-opaquefactor);
                            image(this.emeraldcornerglow,0,0,this.n[i].width*2,this.n[i].height*2);
                            break;
                        default:
                            break;
                    }
                }else{
                    tint(255,this.n[i].strength-opaquefactor);
                    imageMode(CENTER);
                    if(this.n[i].width > this.n[i].height){
                        image(this.horizontal,0,0,this.n[i].width,this.n[i].height);
                    }else if(this.n[i].width < this.n[i].height){
                        image(this.vertical,0,0,this.n[i].width,this.n[i].height);
                    }else if(this.n[i].width === this.n[i].height){
                        image(this.horizontal,0,0,this.n[i].width,this.n[i].height);
                    }
                }
                pop();
                player.collide(this.n[i]);
            }
        }
    }
}