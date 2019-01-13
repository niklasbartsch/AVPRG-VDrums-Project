// Global Variables
var context = new AudioContext();
var velocityVolumes = [];
var oscillators = [];

// Fill the array with gain values
for(let i = 0; i < 127; i++){
    velocityVolumes[i] = context.createGain;
}

// Envelope on and off are in charge to change the gain values:
// On: Degrades the gain until nothing more can be heard
// Off: Resets value for new oscillator
function envelopeOn(gainNode, velocity){
    gainNode.gain.linearRampToValueAtTime(7 + (0.33 * (velocity/127)), context.currentTime);
}

function envelopeOff(gainNode, velocity, note){
  //  kickGainNode.gain.cancelScheduledValues(0);
    gainNode.gain.linearRampToValueAtTime(0 , context.currentTime + 1);

    setTimeout(function () {
        oscillators[note].stop();
    }, 1000)
}

// Plays an oscillator according to the velocity and the note
function startNote(note, velocity) {
    var oscillator = context.createOscillator();

    oscillator.frequency.value = allFrequencies[note];

    velocityVolumes[note].gain.cancelScheduledValues(0);
    velocityVolumes[note].gain.setValueAtTime(0 , context.currentTime);

    oscillator.connect(velocityVolumes[note]);
    oscillator.start(context.currentTime);
    envelopeOn(velocityVolumes[note], velocity);
    
    oscillators[note] = oscillator;

   // velocityVolumes[note].gain.exponentialRampToValueAtTime(velocity / 127, context.currentTime + 0.03);
   // setTimeout(function() {oscillator.stop();}, 100);
}

function stopNote(note, velocity) {
        envelopeOff(velocityVolumes[note], velocity, note);
        //oscillators[note].stop();
        //oscillators[note] = null;

}




