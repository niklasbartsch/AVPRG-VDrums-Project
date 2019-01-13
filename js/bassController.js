var scaleValue = 100;

function createBass(){
    var bassGeometry = new THREE.PlaneGeometry( 100, 500, 32,64 );
    var bassMaterial = new THREE.PointsMaterial( {color: "#FFFFFF", transparent: true, opacity: 0, size: 0.5} );
    var cube = new THREE.Points( bassGeometry, bassMaterial );
    // Position
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;

    cube.rotation.x = 5;


    scaleValue = cube.scale.x;

    cube.position.y = -30;
    cube.position.z = 20;

    return cube;
}

function changeBass(bass, velocity){
    var tempGeometry = bass.geometry;
    let factor = 5;
    bass.scale.x += (0.5 * velocity/100);
    bass.scale.y += (0.5 * velocity/100);
    bass.material.opacity = 0.5;
    //bass.scale.z += 0.5;



/*    bass.scale.x = velocity/128 + 5;
    bass.scale.y = velocity/128 + 2;
    bass.scale.z = velocity/128 + 1;
*/
    //bass.material.color = new THREE.color("");
}
function changeBassBack() {

    if(bass.scale.x > 1)
    {
        bass.scale.x -= 0.1;
        bass.scale.y -= 0.1;
        //bass.scale.z -= 0.1;

    }
    if( bass.material.opacity > 0){
        bass.material.opacity -= 0.01;
    }
   // bass.material.color --;

}