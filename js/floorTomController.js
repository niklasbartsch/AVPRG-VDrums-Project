
var startScaleX;
var startScaleY;
var tempFloorPosition;

function createFloor(posX, posY, posZ){
    let geometry = new THREE.CylinderGeometry( 5, 5, 2, 256);
    let material = new THREE.PointsMaterial( {
        color: 0x00FFFF,
        size: 0.2,
        transparent: true,
        opacity: 0
    } );

    let floorTomCylinder = new THREE.Points( geometry, material );

    floorTomCylinder.position.x = posX;
    floorTomCylinder.position.y = posY;
    floorTomCylinder.position.z = posZ;


    startScaleX = floorTomCylinder.scale.x;
    startScaleY = floorTomCylinder.scale.y;

    tempFloorPosition = floorTomCylinder.position.y;

    return floorTomCylinder;
}


function createParticleMeshObject(value, xp, yp, zp) {
    let particleCount = 700;
    let particleGeometry = new THREE.Geometry();
    let particleMaterial = new THREE.PointsMaterial( {
        //    color: 0x00ff00,
        color: 0x00FFFF,
        size: 0.2,
        transparent: true
    } );

    for (var p = 0; p < particleCount; p++) {
        // N Gesamtanzahl der Elemente, n Laufindex, R Radius
        var R = 5;
        var a = Math.random() * 2 * Math.PI;
        r = 5;
        var pX = 2.5 + r * Math.cos(a),
            pY = Math.random() * 5 - 2.5,
            pZ = r * Math.sin(a),
            particle = new THREE.Vector3(xp + pX - 2.5 , yp - 1 + 1.5, zp + pZ + 0.25);  // y -2.5

        particleGeometry.vertices.push(particle);
    }


    let floorTomParticles = new THREE.Points(particleGeometry, particleMaterial);
    return floorTomParticles;
}


function increaseFloorTom(floorTomValue, velocity) {
    if(floorTomValue.scale.y < startScaleY * 2)
    {

        floorTomValue.scale.y += (velocity / 24);
    }
    if(floorTomValue.scale.x < startScaleX * 2)
    {
        floorTomValue.scale.x += (velocity / 48);
    }


    if(floorTomValue.position.y < tempFloorPosition){
        floorTomValue.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), 1.1);
    }
    floorTomValue.material.opacity = 1;


}

function decreaseFloorTom(floorTomValue) {

    if(floorTomValue.position.y > tempFloorPosition){
        floorTomValue.position.y -= 0.1;
    }
    if(floorTomValue.scale.y > startScaleY){
        floorTomValue.scale.y /=1.1;
    }

    if(floorTomValue.scale.x > startScaleX){
        floorTomValue.scale.x /= 1.1;
    }


    if(floorTomValue.opacity != 0){
        floorTomValue.material.opacity -= 0.05;
    }


}
function forEachFloorTomParticleArray(particleArray){
    particleArray.forEach(element => {
        element.position.y += 100 * 0.001 + Math.random() * 0.05;
        element.material.opacity -= 0.025;
        scene.add(element)
    });
}