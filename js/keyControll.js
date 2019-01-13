document.addEventListener('keydown', function(event) {
    if(event.keyCode == 74) {       //j
        tom1Hit = true;
        increaseTom(tom, 0.5);
        console.log("J");
    }
    else if(event.keyCode == 75) {      //k
        tom2Hit = true;
        increaseTom(tom2, 0.5);
        console.log("k")
    }else if(event.keyCode == 76) {      //l
        floorTomHit = true;
        increaseFloorTom(floorTom, 1);
        console.log("l")
    }if(event.keyCode == 77) {      //m
        console.log("m");
        changeSprite();
    }if(event.keyCode == 78) {      //n
        sprite.opacity = 1;
        console.log("n");
    }
});