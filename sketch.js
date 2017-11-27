let button;
let user_input;
let output;
let input;
let reply;

let bot = new RiveScript();
bot.loadFile("brain.rive", brainReady, brainError);

//////////////////////////
let speech = new p5.Speech();
speech.onLoad = voiceReady;
function voiceReady(){
	speech.setVoice("Alice");
	speech.setPitch(0.5);
	speech.setRate(0.8);
	speech.speak("I am your virtual English teacher.");	
}
///////////////////////////


///////////////////////////
let lang = navigator.language || 'en-US';
let speechRec = new p5.SpeechRec(lang, gotSpeech);
let continuous = true;
let interim = false;
speechRec.start(continuous, interim);

function gotSpeech(){
	if (speechRec.resultValue){
		let input = speechRec.resultString;
		console.log(input);
		user_input.value(input);
		reply = bot.reply("local-user", input);
		output.html(reply);
		
	}
	// console.log(speechRec);
}
//////////////////////////

function brainReady() {
	console.log('Chatbot ready!');
	bot.sortReplies();
}

function brainError() {
	console.log('Chatbot error!')
}

function setup() {
	noCanvas();
	button = select('#button');
	user_input = select('#user_input');
	output = select('#output');

	button.mousePressed(startSpeech);
}

function keyPressed(){
	if(keyCode == ENTER){
		console.log("Key pressed")
		input = user_input.value();
		reply = bot.reply("local-user", input);
		output.html(reply);
	}	
}

function startSpeech(){
	speech.interrupt = true;
	speech.setPitch(0.5);
	speech.setRate(0.8);
	speech.speak(reply);
}