/* HiHat is represented by two cubes, one on top of the other*/ 
hiHatPosX = 13;
hiHatPosY = 0;
hiHatPosZ = -5;
hiHatState = 1;     // ----> States: 0 = Closed; 1 = Opened; 2 = Closing

function createHiHat(){
    var hiHat = new THREE.Group();
    // Partile Cubes
    var segments = 16;
    dimensions = 4;
    var cubeGeometry = new THREE.BoxGeometry(dimensions,dimensions,dimensions, segments, segments, segments/2);
    var cubeMaterial = new THREE.PointsMaterial({color: 0x00ff00, transparent: true, opacity: 1, size: 0.1});
    var highCube = new THREE.Points(cubeGeometry, cubeMaterial);
    var lowCube = new THREE.Points(cubeGeometry, cubeMaterial);

    // Cubes' position
    highCube.position.x = hiHatPosX;  
    highCube.position.y = hiHatPosY;
    highCube.position.z = hiHatPosZ;

    lowCube.position.x = hiHatPosX;  
    lowCube.position.y = hiHatPosY - dimensions;
    lowCube.position.z = hiHatPosZ;

    hiHat.add(highCube);
    hiHat.add(lowCube);
   
    return hiHat;
}


// Should be called when MIDI signal of the ride is detected
function changeHiHat(hiHat, velocity, state){
    hiHatState = state;
    divider = 3;
    newYPos = velocity/32;
    hiHat.children.forEach(element => {
        element.material.opacity = 1;
    });
    
    if(hiHatState == 0){ // Closed HiHat
        hiHat.children[0].rotation.y =  Math.PI/divider;
        hiHat.children[1].rotation.y = -Math.PI/divider;
    }
    else if(hiHatState == 1){ // Opened HiHat
        
        hiHat.children[0].position.y = hiHatPosY + newYPos;
        hiHat.children[1].position.y = (hiHatPosY - dimensions) - newYPos;
        // Rotation
        hiHat.children[0].rotation.x = Math.PI/divider;
        hiHat.children[1].rotation.x = Math.PI/divider;

        hiHat.children[0].rotation.y =  Math.PI/divider;
        hiHat.children[1].rotation.y = -Math.PI/divider;

       // hiHat.children[0].rotation.z =  Math.PI/divider;
        hiHat.children[1].rotation.z = -Math.PI/divider;
    }
    else if(hiHatState == 2){ // Closing HiHat

    }
}

function createHiHatParticles(){
    // Create meshes
    particlesGeometry = new THREE.CircleGeometry(1, 128),
    particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.2,
    transparent: true,
    opacity: 1
    });
    particlesGeometry.verticesNeedUpdate = true;
    particlesGeometry.dynamic = true;
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    // Change position and rotation
    particleSystem.rotation.x = -Math.PI/2;

    particleSystem.position.x = hiHatPosX;
    particleSystem.position.y = hiHatPosY - dimensions/2;
    particleSystem.position.z = hiHatPosZ;
    return particleSystem;
}

// UPDATES //

function updateHiHat(hiHat){
    hiHat.children.forEach(element => {
        element.material.opacity -= 0.01;
    }); 
    // Higher Cymbal
    if (hiHat.children[0].position.y > hiHatPosY){
        hiHat.children[0].position.y -= 0.1;
    }
    // Lower Cymbal
    if (hiHat.children[1].position.y < hiHatPosY - dimensions){
        hiHat.children[1].position.y += 0.1 ;     
    }
    if(hiHatState == 0){ // Closed HiHat
        hiHat.children[0].position.y = hiHatPosY
        hiHat.children[1].position.y = hiHatPosY - dimensions;

        hiHat.children[0].rotation.x = 0;
        hiHat.children[0].rotation.z = 0;
        hiHat.children[1].rotation.x = 0;
        hiHat.children[1].rotation.z = 0;

        if(hiHat.children[0].rotation.y > 0){hiHat.children[0].rotation.y -= 0.1;}
        if(hiHat.children[1].rotation.y < 0){hiHat.children[1].rotation.y += 0.1;}
    }
    else if(hiHatState == 1){ // Opened HiHat
        // Higher Cymbal
        if(hiHat.children[0].rotation.x > 0){hiHat.children[0].rotation.x -= 0.1;}
        if(hiHat.children[0].rotation.y > 0){hiHat.children[0].rotation.y -= 0.1;}
       // if(hiHat.children[0].rotation.z > 0){ hiHat.children[0].rotation.z -= 0.1;}
        

        // Lower Cymbal
        if (hiHat.children[1].rotation.x > 0){
            hiHat.children[1].rotation.x -= 0.1;          
        }
        if(hiHat.children[1].rotation.y < 0){hiHat.children[1].rotation.y += 0.1;}
        if(hiHat.children[1].rotation.z < 0){ hiHat.children[1].rotation.z += 0.1;}

    }
    else if(hiHatState == 2){ // Closing HiHat
        hiHat.children[0].rotation.x = 0;
        hiHat.children[0].rotation.z = 0;
        hiHat.children[1].rotation.x = 0;
        hiHat.children[1].rotation.z = 0;
    }
}

function updateHiHatParticles(particles){
    particles.material.opacity -= 0.01;
    particles.geometry.verticesNeedUpdate = true;
    particles.scale.x ++;
    particles.scale.y ++;
    particles.scale.z ++;
    	if(hiHatState == 1){ // Opened HiHat
        var index = 0;
        particles.geometry.vertices.forEach(element =>{
            element.y = Math.sin(index);
            index++;
        });
    }
}
