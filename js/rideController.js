/* The Ride is represented by pentagons flying upwards when struck, and a tornado of particles all around*/ 
ridePosX = -15;
ridePosY = 5;
ridePosZ = 10;

numberOfTornadoParticles = 1000;
function createRide(){
    // Create Ride particles. Pivot for rotation in the middle
    var tornadoParticlesGeometry = new THREE.CylinderGeometry(4,2,3, 248, 8);
    var tornadoPivot = new THREE.Object3D();
    var tornadoParticlesMaterial = new THREE.PointsMaterial({
        color: 0xFF00FF,
        size: 0.15,
        transparent: true,
        opacity: 0
    }); 
    
    // COMENT: If cube needed
   /* var tornadoConstrains = 8;
    var tornadoYConstrains = 3;
    var tempDivider = 4;
  /*  for(let i = 0; i < numberOfTornadoParticles; i++){
        tornadoParticlesGeometry.vertices.push(new THREE.Vector3(
           ( Math.random() * tornadoConstrains *Math.PI - tornadoConstrains*Math.PI)/ tempDivider,
            Math.random() * tornadoYConstrains - tornadoYConstrains,
            ( Math.random() * tornadoConstrains *Math.PI - tornadoConstrains *Math.PI)/ tempDivider
        ));   
     }*/
     var tornado = new THREE.Points(tornadoParticlesGeometry, tornadoParticlesMaterial);
     tornadoPivot.add(tornado);
     /*tornado.position.x = tornadoConstrains;
     tornado.position.z = tornadoConstrains;*/

     tornadoPivot.position.x = ridePosX;
     tornadoPivot.position.y = ridePosY;
     tornadoPivot.position.z = ridePosZ;

     return tornadoPivot;
}

// Is always called in the update function
function rotateRideParticles(ride){
    // ride.children[0] = toradoParticles
    var rotationStrength = 0.1;
    upperLimit = 3;
    // Rotate the whole mesh around
    ride.rotation.y += rotationStrength;
    ride.children[0].geometry.verticesNeedUpdate = true;
    // Return to transparent
    if(ride.children[0].material.opacity > 0){
       ride.children[0].material.opacity -= 0.01;
    }
    // Make the particles go upwards
    for(let i = 0; i< ride.children[0].geometry.vertices.length; i++){
        var speed = Math.random() * 0.2 + 0.001;
        ride.children[0].geometry.vertices[i].y += speed;
        if( ride.children[0].geometry.vertices[i].y >= upperLimit){
            ride.children[0].geometry.vertices[i].y = ((Math.random() * upperLimit) - upperLimit*2) ;
        }
    }
}

// Should be called when MIDI signal of the ride is detected
function changeRide(ride, velocity){
    velDiv = 32;
   ride.children[0].material.opacity = 0.8;
   ride.scale.x = velocity/velDiv;
   ride.scale.z = velocity/velDiv;
}

// Create polygons
function ridePolygonsFunction(){
    // Polygons  
    var polygonGeometry = new THREE.CircleGeometry(4,5);
    var polygonMaterial = new THREE.MeshLambertMaterial({color: 0xAA00AA, transparent: true, opacity: 0.8});
    var polygon = new THREE.Mesh(polygonGeometry, polygonMaterial);

    polygon.rotation.x = -Math.PI / 2;
    polygon.position.x = ridePosX;
    polygon.position.y = ridePosY - upperLimit;
    polygon.position.z = ridePosZ;
    return polygon;
}

// Update polygons
function updateRidePolygons(polygon){
    polygon.position.y += 0.1;
    polygon.rotation.z += Math.random()* 0.1 + 0.5;
    polygon.material.opacity -= 0.03;
}