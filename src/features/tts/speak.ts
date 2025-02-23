export default function speak(text: string, language: string = "en-US") {
	const utterance = new SpeechSynthesisUtterance(text);

	utterance.lang = language;

	speechSynthesis.speak(utterance);
}