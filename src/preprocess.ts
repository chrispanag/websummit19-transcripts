import { promises as fs } from "fs";
import { ISpeaker, ISpeechDataDetails, ISpeechData } from "./interfaces";

type SpeakerNames = { [key: string]: string };

async function readData(path: string = "./plain-texts/data.json") {
  const data = await fs.readFile(path, "utf-8");
  const parsed = JSON.parse(data);

  return parsed as ISpeechData[];
}

function extractSpeakerNames(speech: ISpeechDataDetails): SpeakerNames {
  const speakersRaw = speech.speakers;
  const speakers: SpeakerNames = {};
  speakersRaw.forEach(s => (speakers[s.id] = s.speaker_name));

  return speakers;
}

function createDialogue(speakers: SpeakerNames, transcripts: any[]): string {
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
    const speakers = extractSpeakerNames(s.speech);
    const speechTranscript = createDialogue(speakers, s.speech.transcripts);

    try {
      fs.writeFile(`./plain-texts/${s.speech.speech_id}.txt`, speechTranscript);
    } catch (err) {
      throw err;
    }
  });
})();
