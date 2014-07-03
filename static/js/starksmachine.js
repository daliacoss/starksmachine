function StarksMachine(){
	this.context = new AudioContext();
	this.instrument = new Stark(this.context, 2);
	this.instrument.operators[0].oscillator.type = "triangle";
	this.instrument.operators[0].envelope.attackTime = 0;
	this.instrument.operators[0].envelope.decayTime = .1;
	this.instrument.operators[0].envelope.sustainLevel = .6;
	this.instrument.operators[0].envelope.releaseTime = .4;

	this.instrument.operators[1].oscillator.type = "square";
	this.instrument.operators[1].envelope.attackTime = 0;
	this.instrument.operators[1].envelope.decayTime = .1;
	this.instrument.operators[1].envelope.releaseTime = .4;
	this.instrument.operators[1].envelope.sustainLevel = .6;
	this.instrument.operators[1].oscillator.detune.value = 10;

	this._currentNote = -1;
	this._currentInterval;
}

// StarksMachine.prototype.play = function(x, y, width, height){
// 	var pitch = Math.floor((x / width) * 64) + 32;
// 	if (this._currentNote != pitch){
// 		this._currentNote = pitch;
// 		this.instrument.noteOn(pitch, 1);
// 	}
// }

window.onload = function(){
	window.context = new AudioContext();
	window.instrument = new Stark(window.context, 2);
	window.instrument.operators[0].oscillator.type = "triangle";
	window.instrument.operators[0].envelope.attackTime = 0;
	window.instrument.operators[0].envelope.decayTime = .1;
	window.instrument.operators[0].envelope.sustainLevel = .6;
	window.instrument.operators[0].envelope.releaseTime = .4;

	window.instrument.operators[1].oscillator.type = "square";
	window.instrument.operators[1].envelope.attackTime = 0;
	window.instrument.operators[1].envelope.decayTime = .1;
	window.instrument.operators[1].envelope.releaseTime = .4;
	window.instrument.operators[1].envelope.sustainLevel = .6;
	window.instrument.operators[1].oscillator.detune.value = 10;

	window.vk = new VirtualKeyboard(window.instrument, $(window), 1);
}

// $(window).keydown(function(event){
// 	console.log(event);

// 	var machine = window.machine;
// 	window.instrument.noteOn(event.which, 1);
// });

// $(window).keyup(function(event){
// 	console.log(event);

// 	var machine = window.machine;
// 	window.instrument.noteOff();
// });
