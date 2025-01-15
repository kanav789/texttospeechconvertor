let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceselect = document.querySelector("select");

//  for changing voices

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach(
    (voice, i) => (voiceselect.options[i] = new Option(voice.name, i))
  );
};

voiceselect.addEventListener("change", () => {
  speech.voice = voices[voiceselect.value];
});

//  for speaking
document.querySelector("#button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
const randomvvoice = () => {
  console.log("hii");
  speech.text =
    "Hey, How are You, This is a text to speech converter, You can change the voice also, Have a nice day";
  window.speechSynthesis.speak(speech);
};
randomvvoice();
 


// Add download button functionality
document.querySelector("#download-button").addEventListener("click", () => {
  // Ensure there is text to synthesize
  if (!speech.text) {
    alert("Please enter text to synthesize.");
    return;
  }

  // Synthesize the speech and create an audio blob
  let audioBlob = new Blob([speech.text], { type: "audio/mp3" });

  // Create a download link
  let downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(audioBlob);
  downloadLink.download = "speech.mp3";
  downloadLink.style.display = "none";

  // Add the download link to the document and trigger a click event
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Clean up by removing the download link
  document.body.removeChild(downloadLink);
});
