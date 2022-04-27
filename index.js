const tmi = require("tmi.js");
const dotenv = require("dotenv").config();

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "supaabot",
    password: process.env.SUPAABOT_TWITCH_OAUTH_TOKEN,
  },
  channels: ["LUSTWOLF"],
});

client.connect().catch(console.error);
client.on("connected", onConnectedHandler);

let hydrationCount = 0;
let davidFlashCount = 0;

client.on("message", (channel, tags, message, self) => {
  if (self) return; //Cannot work if sender is the bot itself

  channel = channel.slice(1).toUpperCase();

  switch (message.toLowerCase()) {
    case "!hydrate":
      hydrationCount++;
      client.say(
        channel,
        `@${tags.username} ${channel} has hydrated ${hydrationCount} times!`
      );
      break;

    case "!flash":
      davidFlashCount++;
      client.say(
        channel,
        `David has flashed his teammates ${davidFlashCount} times!`
      );
      break;

    case "!mad":
      client.say(channel, "Chap is mad LMAO");
      break;
  }
});

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
