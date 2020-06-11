class Player{
    constructor(){
        player.m = true;
        player.visible = false;
        player.t = 255;
        //player.debug = true;
    }

    show(){
        push();
        translate(player.x, player.y);
        tint(255, player.t);
        if(Math.round(millis()) - lasthit < 500){
            tint(255,50);
        }
        rotate(player.rotation);
        imageMode(CENTER);
        image(playerIMG,0,0,player.width + (player.width/100 * 5),player.height);
        pop();
    }

    move(){
        /*
        The mouse position in local/screen space
        This is a position between (0, 0) and (window width, window height)
        The mouse position in world space
        This is a position between
        (0, 0) and (mouseX + camera.position.x, mouseY + camera.position.y)
        */
        //PLAYER
        if(player.m){
            var mouseXWorld = mouseX + camera.position.x - windowWidth/2;
            var mouseYWorld = mouseY + camera.position.y - windowHeight/2;

            //var run = mouseX - player.x;
            //var rise = mouseY - player.y;

            var run     = mouseXWorld - player.x;
            var rise    = mouseYWorld - player.y;
            var length  = sqrt((rise * rise) + (run * run));
            var unitX   = run   / length;
            var unitY   = rise  / length;

            player.x += unitX * player.speed;
            player.y += unitY * player.speed;
            
            //player.rotateToDirection = true;
            
            player.rotation = Math.atan2(mouseYWorld-player.y, mouseXWorld-player.x)*180/PI + 90;
            //player.visible = false;
        }
        player.collide(edge);
    }
}