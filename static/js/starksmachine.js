function StarksMachine(){
	this.context = new AudioContext();
	this.instrument = new Stark(this.context, 2);
	this.instrument.operators[0].oscillator.type = "triangle";
	this.instrument.operators[1].oscillator.type = "sawtooth";
	this.instrument.operators[1].oscillator.detune.value = 10;

	this._currentNote = -1;
	this._currentInterval;
}

StarksMachine.prototype.play = function(x, y, width, height){
	var pitch = Math.floor((x / width) * 64) + 32;
	if (this._currentNote != pitch){
		this._currentNote = pitch;
		this.instrument.noteOn(pitch, 1);
	}
}

window.onload = function(){
	window.machine = new StarksMachine();
}
