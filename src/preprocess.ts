import { promises as fs, read } from "fs";

async function readData(path: string = "./plain-texts/data.json") {
  const data = await fs.readFile(path, "utf-8");
  const parsed = JSON.parse(data);

  return parsed;
}

(async () => {
  const data = await readData();
  data.forEach((s: any) => {
    const transcripts = s.speech.transcripts as any[];
    const string = transcripts.reduce((a: string, v: any) => a + "\n" + v.transcript, "");
    try {
        fs.writeFile(`./plain-texts/${s.speech.speech_id}.txt`, string);
    } catch (err) {
        throw err;
    }
  });
})();
