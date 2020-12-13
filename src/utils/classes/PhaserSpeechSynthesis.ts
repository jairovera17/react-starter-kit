export default class VoiceManager {
  private speech: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  private voice: any;
  constructor() {
    this.speech = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.pitch = 1;
    this.utterance.rate = 1;
    this.utterance.volume = 1;
  }

  setVoices() {
    const voices = this.speech.getVoices();
    const appleVoice = "Paulina";
    const googleVoice = "Google español de Estados Unidos";
    this.voice = this.findVoiceByName(voices, appleVoice);
    if (!this.voice) this.voice = this.findVoiceByName(voices, googleVoice);
    this.utterance.voice = this.voice;
  }

  findVoiceByName(voices: any[], voiceName: string) {
    return voices.find((voice) => voice.name === voiceName);
  }

  speak(text: string) {
    this.utterance.text = text;
    if (this.speech.speaking) this.speech.cancel();
    this.speech.speak(this.utterance);
  }

  cancel() {
    this.speech.cancel();
  }

  speakHelpText(text: string) {
    if (this.speech.speaking) this.speech.cancel();
    else {
      this.utterance.text = text;
      this.speech.speak(this.utterance);
    }
  }
}
