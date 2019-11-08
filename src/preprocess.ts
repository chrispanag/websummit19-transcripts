import { promises as fs } from "fs";
import { ISpeaker, ISpeechDataDetails, ISpeechData } from "./interfaces";

async function readData(path: string = "./plain-texts/data.json") {
  const data = await fs.readFile(path, "utf-8");
  const parsed = JSON.parse(data);

  return parsed as ISpeechData[];
}

function extractSpeakerNames(speech: ISpeechDataDetails) {
  const speakersRaw: ISpeaker[] = speech.speakers;
  const speakers: { [key: string]: string } = {};
  speakersRaw.forEach(speaker => (speakers[speaker.id] = speaker.speaker_name));

  return speakers;
}

function createDialogue(
  speakers: { [key: string]: string },
  transcripts: any[]
): string {
  return transcripts.reduce(
    (a: string, v: any) =>
      a +
      "\n" +
      `${v.speaker_id ? speakers[v.speaker_id] : "Someone"}: ` +
      v.transcript,
    ""
  );
}

(async () => {
  const data = await readData();
  data.forEach((s: ISpeechData) => {
    const speakers: { [key: string]: string } = extractSpeakerNames(s.speech);
    const speechTranscript = createDialogue(speakers, s.speech.transcripts);

    try {
      fs.writeFile(`./plain-texts/${s.speech.speech_id}.txt`, speechTranscript);
    } catch (err) {
      throw err;
    }
  });
})();
