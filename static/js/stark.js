/*
a single operator (wrapper for an oscillator)
*/
function Operator(context){
	this.oscillator = context.createOscillator();
	this.velocity = context.createGain();
	this.oscillator.connect(this.velocity);

	this.velocity.gain.value = 0;
}

Operator.prototype.connect = function(node){
	this.velocity.connect(node);
}

/*
a monophonic, multi-oscillator instrument

context (AudioContext): the AudioContext to place the instrument in
numOperators (int): number of operators (oscillators)
masterVolume (float, default=0.5): the starting volume (0.0 - 1.0)
*/
function Stark(context, numOperators, masterVolume){

	// connections:
	// [operators->velocities] -> [amps] -> master amp -> destination

	this.context = context;
	this.operators = [];
	this.amps = [];
//	this.velocity = context.createGain();
	this.masterAmp = context.createGain();

	for (var i=0; i<numOperators; i++){
		//var op = context.createOscillator();
		//var amp = context.createGain();
		var op = new Operator(context);
		var amp = context.createGain();

		op.connect(amp);
		amp.connect(this.masterAmp);

		op.oscillator.frequency.value = 440;

		this.operators.push(op);
		this.amps.push(amp);

		op.oscillator.start(0);
	}

	//this.velocity.connect(this.masterAmp);
	//this.velocity.gain.value = 0;
	this.masterAmp.connect(context.destination);
	// allow 0 volume, but not false or null
	this.masterAmp.gain.value = (masterVolume === 0) ? 0 : masterVolume || 0.2;

	this.pitchClassesSorted = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
	this.pitchClassFreqs = {
		"C": 8.17580,
		"C#": 8.66196,
		"D": 9.17702,
		"D#": 9.72272,
		"E": 10.30086,
		"F": 10.91338,
		"F#": 11.56233,
		"G": 12.24986,
		"G#": 12.97827,
		"A": 13.75000,
		"A#": 14.56762,
		"B": 15.43385,
	};
}

/*
return associated frequency of a pitch class

pitch (int/string): absolute pitch index (int) or pitch class name (string)
octave (int, default=0): octave if pitch is string
*/
Stark.prototype.pitchToFrequency = function(pitch, octave){

	var pitchClass;
	if (typeof pitch == "string"){
		pitchClass = pitchClassFreqs[pitch];
		octave = octave || 0;
	}
	else {
		pitchClass = this.pitchClassesSorted[pitch % this.pitchClassesSorted.length];
		octave = Math.floor(pitch / this.pitchClassesSorted.length);
	}

	return this.pitchClassFreqs[pitchClass] * Math.pow(2, octave);
}

/*
begin a note event

pitch (int): absolute pitch index (including octave)
velocity (float, default=1.0): 0.0 - 1.0
*/
Stark.prototype.noteOn = function(pitch, velocity){
	this.noteOnHz(this.pitchToFrequency(pitch), velocity);
}

/*
begin a note event

frequency (float): frequency in Hertz
velocity (float, default=1.0): 0.0 - 1.0
*/
Stark.prototype.noteOnHz = function(freq, velocity){
	for (var i=0; i<this.operators.length; i++){
		if (freq){
			this.operators[i].oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
		}
		this.operators[i].velocity.gain.value = velocity;
	}
	//this.velocity.gain.value = velocity;
}

/*
stop a note event
*/
Stark.prototype.noteOff = function(){
	this.noteOnHz(null, 0);
}