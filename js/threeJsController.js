let scene, camera, crash, tom, crashParticles, tom2, floorTom, tomParticleArray, tomParticleArray2,
    floorTomParticleArray, floorTomHit, tom1Hit, tom2Hit;


function init(){
    // Three basic elements for three.js: Scene, renderer and camera
    // Scene //
    scene = new THREE.Scene();

    // Camera //
    camera = new THREE.PerspectiveCamera(45, // Angle of aperture
        window.innerWidth / window.innerHeight, // Aspect Ratio
        0.1, // Near plane
        1000 /* Far plane */);
    camera.position.z = -30;
    camera.position.y = 10;
    let lookAtTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(lookAtTarget);

    // SCENE OBJECTS //
    crash = createCrash();
    crashParticles = new Array();
    scene.add(crash);

    bass = createBass();
    scene.add(bass);

    tom = createTom(2.7,0,1);
    tom2 = createTom(-2.7,0,1);
    floorTom = createFloor(-12, -5, 0);

    scene.add(tom);
    scene.add(tom2);
    scene.add(floorTom);

    tomParticleArray = new Array();
    tomParticleArray2 = new Array();
    floorTomParticleArray = new Array();


    snare = createSnare();
    scene.add(snare);
    snareInitialVertices = snare.geometry.vertices;

    ride = createRide();
    ridePolygons = new Array();
    scene.add(ride);

    hiHat = createHiHat();
    hiHatParticles = new Array();
    scene.add(hiHat);

    // LIGHTS //
    // Light
    let ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.y = 120;
    scene.add(ambientLight);


    // RENDERER //
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    document.getElementById("3d_content").appendChild(renderer.domElement);
    clock = new THREE.Clock();


    tom2Hit = false;
    floorTomHit = false;



    //Images
    var map = new THREE.TextureLoader().load( "assets/connected.png" );
    var map2 = new THREE.TextureLoader().load( "assets/disconnected.png" );
    material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
    material2 = new THREE.SpriteMaterial( { map: map2, color: 0xffffff } );
    sprite = new THREE.Sprite( material2 );
    sprite.scale.set(8.5, 1.42, 1);
    sprite.position.set(5, 11, 0);
    sprite.material = material;
    scene.add( sprite );





    // Scene rendering 60fps
    function renderScene(){
        let delta = clock.getDelta();
        renderer.render(scene, camera);

        // Crash Update
        decreaseCrash();
        if(crashHit){
            temp = crashParticlesFunction();
            crashParticles.push(temp);
            crashHit = false;
        }

        crashParticles.forEach(element => {
            updateCrashParticles(element);
            scene.add(element)
        });


        // Snare update
        decreaseSnareBars();

        // Ride update
        rotateRideParticles(ride);
        if(rideHit){
            temp = ridePolygonsFunction();
            ridePolygons.push(temp);
            rideHit = false;
        }
        ridePolygons.forEach(element => {
            updateRidePolygons(element);
            scene.add(element)
        });

        changeBassBack();


        //////////////
        //Tom Update//
        //////////////

        decreaseTom(tom);
        decreaseTom(tom2);
        decreaseFloorTom(floorTom);


        //updateTomParticles(tomParticles);
        if (tom1Hit){
            tomParticleArray.push(createTomParticles(tom.position.x, tom.position.y, tom.position.z));
            tom1Hit = false;
        }
        if (tom2Hit){
            tomParticleArray2.push(createTomParticles(tom2.position.x, tom2.position.y, tom2.position.z));
            tom2Hit = false;
        }
        if(floorTomHit){
            floorTomParticleArray.push(createParticleMeshObject(floorTom, floorTom.position.x, floorTom.position.y, floorTom.position.z));
            floorTomHit = false;
        }
        forEachTomParticleArray(tomParticleArray);
        forEachTomParticleArray(tomParticleArray2);
        forEachFloorTomParticleArray(floorTomParticleArray);

        /////////////////////////
        ////// HIHAT UPDATE ////
        ////////////////////////
        updateHiHat(hiHat);
        if(hiHatHit){
            temp = createHiHatParticles();
            hiHatParticles.push(temp);
            hiHatHit = false;
        }
        hiHatParticles.forEach(element => {
            updateHiHatParticles(element);
            scene.add(element)
        });
        requestAnimationFrame(renderScene);
        changeBassBack();

    }

    renderScene();
    console.log("Scene loaded");
}
function changeSprite() {
    if (sprite.material == material){
        sprite.material = material2;
    } else sprite.material = material;
}

window.onload = init();
