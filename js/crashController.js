crashInitPosX = 25;
crashInitPosY = 5;
crashInitPosZ = 20;

// Creates the initial createCrash sphere, with the initial position
var crashVertices = 100;
function createCrash(){
    particlesGeometry = new THREE.SphereGeometry(3, 100, 100);
    particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1
    });
    particlesGeometry.verticesNeedUpdate = true;
    particlesGeometry.dynamic = true;
    var particleSystem = new THREE.Points(
        particlesGeometry, particlesMaterial
    );
    // Set particle position to crash position
    particleSystem.position.x = crashInitPosX;
    particleSystem.position.y = crashInitPosY;
    particleSystem.position.z = crashInitPosZ;
    return particleSystem;
}


var particleCount = 1000;
var particleSpread = 1 ;
function crashParticlesFunction(){
    // Create meshes
    particlesGeometry = new THREE.Geometry(),
    particlesMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.3
    });
    particlesGeometry.verticesNeedUpdate = true;
    particlesGeometry.dynamic = true;

    // Create individual particles
    for(let i = 0; i<particleCount; i++){
        var pposX = Math.random() * 2 - 1;
        var pposY = Math.random() * 2 - 1;
        var pposZ = Math.random() * 2 -1;
        particlesGeometry.vertices.push(new THREE.Vector3(pposX, pposY, pposZ));
    
    }
    var particleSystem = new THREE.Points(
        particlesGeometry, particlesMaterial
    );
    // Set particle position to createCrash position
    particleSystem.position.x = crashInitPosX;
    particleSystem.position.y = crashInitPosY;
    particleSystem.position.z = crashInitPosZ;
    return particleSystem;
}



// Increases the sphere size when being hit, depending on the velocity
function increaseCrash(crash, velocity){

   // console.log("Crash changed");
    scaleStrength = velocity / 2;
    crash.scale.x = scaleStrength;
    crash.scale.y = scaleStrength;
    crash.scale.z = scaleStrength;
    crash.material.color.setHex( 0xffffff );
    
}

// Slowly returns crash to original state
var actualColor = 0xFD159A;
function decreaseCrash(){
        scaleStrength = 0.2;
        rotationStrenght = 0.1 ;
        if(crash.scale.x <= 1){
            crash.material.color.setHex( 0x000000 );
        }
        else{
            actualColor -- ;
            crash.material.color.setHex( actualColor );
            crash.scale.x -= scaleStrength;
            crash.scale.y -= scaleStrength;
            crash.scale.z -= scaleStrength;
            crash.rotation.x += rotationStrenght;
            crash.rotation.y += rotationStrenght;
            crash.rotation.z -= rotationStrenght;

            scaleStrength -= 0.01;
        }
}

// Changes the posisition of the crash particles
function updateCrashParticles(particles){
    particles.material.color.setHex(actualColor);
    particles.material.transparent = true;
    particles.material.opacity -= 0.01;
    particles.scale.x +=2;
    particles.scale.y +=2;
    particles.scale.z +=2;
    
}