function VirtualKeyboard(instrument, element, defaultVelocity, octave){

	this.instrument = instrument;
	this.element = element;

	defaultVelocity = (typeof defaultVelocity == "number") ? defaultVelocity : 1;
	this.defaultVelocity = defaultVelocity;
	octave = (typeof octave == "number") ? octave : 4;
	this.octave = octave;

	this.pitchMap = {
		90:0,
		83:1,
		88:2,
		68:3,
		67:4,
		86:5,
		71:6,
		66:7,
		72:8,
		78:9,
		74:10,
		77:11,
		188:12,
		81:12,
		76:13,
		50:13,
		46:14,
		87:14,
		51:15,
		59:15,
		69:16,
		47:16,
		82:17,
		53:18,
		84:19,
		54:20,
		89:21,
		55:22,
		85:23,
		73:24,
		57:25,
		79:26,
		48:27,
		80:28
	}
	this.currentNote = -1;

	var vk = this;

	this.element.keydown(function(event){

		var pitch = vk.pitchMap[event.which] + (vk.octave * 12);

		if (! isNaN(pitch) && vk.currentNote != pitch){
			vk.instrument.noteOn(pitch, vk.defaultVelocity);
			vk.currentNote = pitch;
		}
	});

	this.element.keyup(function(event){

		if (vk.currentNote === vk.pitchMap[event.which] + (vk.octave * 12)){
			vk.instrument.noteOff();

			//resetting currentNote allows us to retrigger the same note
			vk.currentNote = -1;
		}
	});
}
