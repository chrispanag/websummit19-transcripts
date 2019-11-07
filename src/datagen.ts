import fetch from "node-fetch";
import { promises as fs } from "fs";
import { IGroupData } from "./interfaces";

const PUBLIC_NAME1 = "ws19-centre";
const PUBLIC_NAME2 = "websummit";

async function fetchPlaylist(public_name: string) {
  const res = await fetch(
    `https://otter.ai/forward/api/v1/public_group?public_name=${public_name}`
  );

  const data = (await res.json()) as IGroupData;
  return data;
}

async function fetchTalk(talkId: string) {
  const res = await fetch(
    `https://otter.ai/forward/api/v1/public_group_message?message_id=${talkId}`
  );
  const data = await res.json();
  return data;
}

(async () => {
  const data = await fetchPlaylist(PUBLIC_NAME2);
  const talks = data.group.messages;
  const promises = talks.map(t => fetchTalk(t.id));

  const speeches = await Promise.all(promises);
  try {
    try {
      fs.mkdir("./plain-texts");
    } catch (err) {
      console.log(err);
    }
    fs.writeFile("./plain-texts/data.json", JSON.stringify(speeches));
  } catch (err) {
    throw err;
  }
})();
