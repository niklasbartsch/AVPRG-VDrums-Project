// The world coordinates for the snare
snareInitPosX = 10;
snareInitPosY = -8;
snareInitPosZ = 10;

function createSnare(){
    // Create the geometry for the snare pad
    var segments = 128;
    var padGeometry =  new THREE.CircleGeometry(5,segments);
    var padMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var padMesh = new THREE.Mesh(padGeometry, padMaterial);
    padMesh.position.x = -25;
    padMesh.position.y = 5;
    padMesh.position.z = 20;

   // Place bars in each of the vertices of the circle
    snareBarsGeometry= new THREE.Geometry();
    snareBarsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0
    });
    var trailGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    var trailMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, transparent: true, opacity: 0 });
    var trail = new THREE.Group();

    snareBarsGeometry.dynamic = true;
    // Create individual particles
     for(let i = 0; i < padMesh.geometry.vertices.length; i++){
        snareBarsGeometry.vertices.push(padMesh.geometry.vertices[i]); 
        tempMesh = new THREE.Mesh(trailGeometry, trailMaterial);
        tempMesh.position.x = padMesh.geometry.vertices[i].x;
        tempMesh.position.y = padMesh.geometry.vertices[i].y;
        tempMesh.position.z = padMesh.geometry.vertices[i].z;
        trail.add(tempMesh);
        
     }
    var snareBars = new THREE.Points(
        snareBarsGeometry, snareBarsMaterial
    );
    //Change position
    snareBars.position.x = snareInitPosX;
    snareBars.position.y = snareInitPosY;
    snareBars.position.z = snareInitPosZ;
    snareBars.rotation.x = Math.PI/2;

    // Add secondary objects as children of the main object
    snareBars.add(padMesh);
    snareBars.add(trail); 

    return snareBars;
}

function increaseSnareBars(snare, velocity){
    snare.geometry.verticesNeedUpdate = true;
    var velDivider = 10;
    for(let i = 1; i <= snare.geometry.vertices.length; i++){
        snare.material.opacity = 0.5;
        snare.children[1].children[i - 1].material.opacity = 0.5;
        if(i > snare.geometry.vertices.length/2){
            // Particles
            snare.geometry.vertices[i-1].add(new THREE.Vector3(0, 0,
                (-Math.sqrt(velocity*(i-snare.geometry.vertices.length/2)/velDivider))));
                // Bars
                snare.children[1].children[i - 1].scale.y = velocity*(i-snare.geometry.vertices.length/2);
        }
        else{
            snare.geometry.vertices[i-1].add(new THREE.Vector3(0, 0,
                (-Math.sqrt(velocity*i/velDivider))));
                snare.children[1].children[i - 1].scale.y = (velocity*i);
        }
        if(snare.geometry.vertices[i-1].z < -10){
            snare.geometry.vertices[i-1].z = -10;
        }
    }
}

function decreaseSnareBars(){
    scaleStrength = 0.4;
    snare.geometry.verticesNeedUpdate = true;
    for(let i = 1; i <= snare.geometry.vertices.length; i++){
    if(snare.geometry.vertices[i-1].getComponent(2)  >= 0){
        snare.geometry.vertices[i-1].z = 0;
      
        snare.children[1].children[i - 1].scale.y = 0.2;
        //snare.children[1].children[i - 1].position.y = 0;
        if(i == snare.geometry.vertices.length){
            snare.material.opacity = 0;       
        }
    }
    else{
        snare.material.color.setHex( 0x0055ff ); 
        // Particles
        snare.geometry.vertices[i-1].add(new THREE.Vector3(0, 0, scaleStrength));
        snare.material.opacity -= 0.0005; 
      
    }
      // Bars
      snare.children[1].children[i - 1].material.color.setHex(0x0055ff);
      snare.children[1].children[i - 1].scale.y -= scaleStrength / 0.1;
    snare.children[1].children[i - 1].material.opacity -= 0.0001;
}
}

