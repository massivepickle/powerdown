class Gems{
    constructor(){}

    gem1(){
        push();
        translate(gem1.x,gem1.y);
        imageMode(CENTER);
        tint(255,255);
        image(gi,0,0,gem1.width,gem1.height);
        if(g1 > 0){
            tint(255,g1);
            image(gg,0,0,gem1.width,gem1.height);
        }
        pop();
        if(player.isTouching(gem1)){
            if(g1 > 250){
                powerdownsound.setVolume(1,0);
                powerdownsound.play();
                g1 -= 8.5;
            }
        }
        if(g1 < 255 && g1 > 0){
            g1 -= 8.5;
        }
    }

    gem2(){
        push();
        translate(gem2.x,gem2.y);
        imageMode(CENTER);
        tint(255,255);
        image(gi,0,0,gem2.width,gem2.height);
        if(g2 > 0){
            tint(255,g2);
            image(gg,0,0,gem2.width,gem2.height);
        }
        pop();
        if(player.isTouching(gem2)){
            if(g2 > 250){
                powerdownsound.setVolume(1,0);
                powerdownsound.play();
                g2 -= 8.5;
            }
        }
        if(g2 < 255 && g2 > 0){
            g2 -= 8.5;
        }
    }

    gem3(){
        push();
        translate(gem3.x,gem3.y);
        imageMode(CENTER);
        tint(255,255);
        image(gi,0,0,gem3.width,gem3.height);
        if(g3 > 0){
            tint(255,g3);
            image(gg,0,0,gem3.width,gem3.height);
        }
        pop();
        if(player.isTouching(gem3)){
            if(g3 > 250){
                setBPM(9000,20)
                powerdownsound.setVolume(1,0);
                powerdownsound.play();
                
                g3 -= 8.5;
            }
        }
        if(g3 < 255 && g3 > 0){
            g3 -= 8.5;
        }
    }
}