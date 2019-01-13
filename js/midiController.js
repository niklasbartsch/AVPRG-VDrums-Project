// Open source code: https://github.com/jakobsudau/AVPRG/tree/gh-pages/Aufgabe14b
// Reads the external MIDI inputs
crashHit = false;
tom1Hit = false;
tom2Hit = false;
rideHit = false;
hiHatHit = false;

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);
function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}


for (let i = 0; i < 127; i++) {
    velocityVolumes[i] = context.createGain();
    velocityVolumes[i].connect(context.destination);
}
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: false}).then(function(midiAccess) {
        midi = midiAccess;
        var inputs = midi.inputs.values();
        // loop through all inputs
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage;
        }
    });
} else {
    alert("No MIDI support in your browser.");
}
// Sounds
// Snare
var snareSound  = new Audio();
var snareSrc  = document.createElement("source");
snareSrc.src  = "Sounds/snare.wav";
snareSound.appendChild(snareSrc);  
// Kick
var kickSound  = new Audio();
var kickSrc  = document.createElement("source");
kickSrc.src  = "Sounds/kick.wav";
kickSound.appendChild(kickSrc); 
// Closed Hihat
var closedHiHatSound  = new Audio();
var closedHiHatSrc  = document.createElement("source");
closedHiHatSrc.src  = "Sounds/closedHiHat.wav";
closedHiHatSound.appendChild(closedHiHatSrc); 
// Opened Hihat
var openedHiHatSound  = new Audio();
var openedHiHatSrc  = document.createElement("source");
openedHiHatSrc.src  = "Sounds/openedHiHat.wav";
openedHiHatSound.appendChild(openedHiHatSrc); 
// Ride
var rideSound  = new Audio();
var rideSrc  = document.createElement("source");
rideSrc.src  = "Sounds/ride.wav";
rideSound.appendChild(rideSrc);  
// Tom1
var tom1Sound  = new Audio();
var tom1Src  = document.createElement("source");
tom1Src.src  = "Sounds/tom1.wav";
tom1Sound.appendChild(tom1Src); 
// Tom2
var tom2Sound  = new Audio();
var tom2Src  = document.createElement("source");
tom2Src.src  = "Sounds/tom2.wav";
tom2Sound.appendChild(tom2Src); 
// Tom3
var tom3Sound  = new Audio();
var tom3Src  = document.createElement("source");
tom3Src.src  = "Sounds/tom3.wav";
tom3Sound.appendChild(tom3Src);
// Crash
var crashSound  = new Audio();
var crashSrc  = document.createElement("source");
crashSrc.src  = "Sounds/crash.wav";
crashSound.appendChild(crashSrc);

function onMIDIMessage(event) {
    /* For the Alesis Nitro Kit (And most E - Drumsets):
     Channel 10 ----> 153 (on)
     This kit functions with a note off and on difference
     only in the velocity. The same signal is sent for the first byte,
     but the velocity is either zero, or bigger. The signal should be
     identified as note off when velocity is zero.
     Note on: 153 (event.data[0]), velocity: != 0 (event.data[2])
     Note off: 153 (event.data[0]), velocity == 0 (event.data[2])
    */
  //console.log(event.data); 
  if(event.data[0] == 153){
    if(event.data[2] != 0){
        //startNote(event.data[1], event.data[2]); 
        if(event.data[1] == 49){ // 49 Is the note for the Crash   
            crashSound.pause();
            crashSound.currentTime = 0;                  
            crashSound.play();
            increaseCrash(crash, event.data[2]/4); 
            crashHit = true;    
        }else if(event.data[1] == 36)// 36 == bass
        {
            kickSound.pause();
            kickSound.currentTime = 0;                  
            kickSound.play();

            changeBass(bass, event.data[2]);

        }else if(event.data[1] == 51)// ride
        {
            rideSound.pause();
            rideSound.currentTime = 0;                  
            rideSound.play();
            rideHit = true;
            changeRide(ride, event.data[2]);
        }else if(event.data[1] == 43)// tom floor
        {
            tom3Sound.pause();
            tom3Sound.currentTime = 0;                  
            tom3Sound.play();
            increaseFloorTom(floorTom, event.data[2]);
            floorTomHit = true;
        }else if(event.data[1] == 48)// tom1
        {
            tom1Sound.pause();
            tom1Sound.currentTime = 0;                  
            tom1Sound.play();
            tom1Hit = true;
            increaseTom(tom, event.data[2]);

        }else if(event.data[1] == 45)// tom2
        {
            tom2Sound.pause();
            tom2Sound.currentTime = 0;                  
            tom2Sound.play();
            tom2Hit = true;
            increaseTom(tom2, event.data[2]);
        }else if(event.data[1] == 38)// snare
        {
            snareSound.pause();
            snareSound.currentTime = 0;                     
            snareSound.play();

            increaseSnareBars(snare, event.data[2]/127);
        }else if(event.data[1] == 46 || event.data[1] == 21)// opened hihat 
        {
            openedHiHatSound.pause();
            openedHiHatSound.currentTime = 0;                      
            openedHiHatSound.play();
            changeHiHat(hiHat, event.data[2], 1);
            hiHatHit = true;
        }else if(event.data[1] == 42)// closed hihat 
        {
            closedHiHatSound.pause();
            closedHiHatSound.currentTime = 0;                      
            closedHiHatSound.play();
            
            changeHiHat(hiHat, event.data[2], 0);
            hiHatHit = true;
        }else if(event.data[1] == 44)// closing hihat
        {
            closedHiHatSound.pause();
            closedHiHatSound.currentTime = 0;                      
            closedHiHatSound.play();

            changeHiHat(hiHat, event.data[2], 2);
            hiHatHit = true;
        }
       //console.log(event.data);
    }
    //  console.log(event.data);
  }    
}