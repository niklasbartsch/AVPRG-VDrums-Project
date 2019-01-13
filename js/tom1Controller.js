let tempScale;
let tempPosition;

function createTom(posX, posY, posZ){
    let geometry = new THREE.CylinderGeometry( 2.5, 2.5, 0.2, 128 );
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.05, 0 ) );
    let material = new THREE.PointsMaterial( {
        color: 0x00AAff,
        transparent: true,
        opacity: 0,
        size: 0.2
    } );

    let tomCylinder = new THREE.Points( geometry, material );

    tomCylinder.position.x = posX;
    tomCylinder.position.y = posY;
    tomCylinder.position.z = posZ;
    tomCylinder.rotation.z = 0; // Math.PI/6 --> Particles rotation has to be changed

    tempScale = tomCylinder.scale.y;
    tempPosition = tomCylinder.position.y;

    return tomCylinder;
}


function createTomParticles(xp, yp, zp) {
    let particleCount = 400,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            color: 0x00AAff,
            size: 0.1,
            transparent: true
        });


    for (var p = 0; p < particleCount; p++) {
        // N Gesamtanzahl der Elemente, n Laufindex, R Radius
        var R = 2.5;
        var a = Math.random() * 2 * Math.PI;
        var r = R * Math.sqrt(Math.random());

        var pX = 2.5 + r * Math.cos(a),
            pY = Math.random() * 5 - 2.5,
            pZ = r * Math.sin(a),
            particle = new THREE.Vector3(xp + pX - 2.5 , yp + -0.5, zp + pZ + 0.25);  // y -2.5
        // console.log(pX, pY);
        // add it to the geometry
        particles.vertices.push(particle);
    }
    var tomParticleSystem = new THREE.Points(particles, pMaterial);
    return tomParticleSystem;
}



//
//      /-\
//       |
//       |   y
//       |
//
// x <---- .z
//


// wenn aufgerufen vergrößert die Funktion "increaseTom" die Tom
function increaseTom(tom, velocity) {
    if(tom.scale.y < tempScale * 10)
    {

        tom.scale.y += (velocity / 12);
        //tom.position.y += velocity;
        //console.log(velocity);
    }
    if(tom.position.y < tempPosition){
        tom.translateOnAxis(new THREE.Vector3( 0, 1, 0 ), 1.1);
    }
    tom.material.opacity = 1;


}



// verkleinert den Tom die ganze Zeit auf den Ursprünglichen Startwert
function decreaseTom(tom) {

    if(tom.position.y > tempPosition){
        tom.position.y -= 0.1;
    }
    if(tom.scale.y > tempScale){
        tom.scale.y /=1.1;
    }
    if(tom.opacity != 0){
        tom.material.opacity -= 0.05;
    }


}

// bringt die Partikel beim Tom dazu in unterschiedlichen Geschwindigkeiten nach oben zu gehen
function updateTomParticles(tomParticles){
    tomParticles.geometry.verticesNeedUpdate = true;

    for (var i = 0; i < tomParticles.geometry.vertices.length; i++) {
        tomParticles.geometry.vertices[i].y += Math.random() * 0.1;
        //tomParticles[i].scale += 0.1;
    }
    tomParticles.material.opacity -= 0.05;
}


function forEachTomParticleArray(particleArray){
    particleArray.forEach(element => {
        element.position.y += 0.3;
        element.material.opacity -= 0.05;
        scene.add(element)
    });
}


