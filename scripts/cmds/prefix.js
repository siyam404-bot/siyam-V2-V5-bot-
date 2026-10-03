const moment = require("moment-timezone");
const axios = require("axios");

const mediaList = [
  "https://i.imgur.com/8pT5G8g.gif",
  "https://i.imgur.com/7iqtimo.gif"
];

function toBoldFont(text) {
  if (text === undefined || text === null) return "";
  const str = String(text);
  const boldMap = {
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈',
    'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑',
    'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢',
    'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫',
    's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  };
  return str.split('').map(char => boldMap[char] || char).join('');
}

async function getImgurStream(url) {
  try {
    const response = await axios.get(url, {
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

module.exports = {
  config: {
    name: "prefix",
    version: "3.2",
    author: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    countDown: 5,
    role: 0,
    description: "Change & show bot prefix",
    category: "config"
  },

  langs: {
    en: {
      usage: "❌ 𝐔𝐬𝐚𝐠𝐞: 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> | 𝐩𝐫𝐞𝐟𝐢𝐱 𝐫𝐞𝐬𝐞𝐭 | 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> -𝐠",
      reset: "✅ 𝐏𝐫𝐞𝐟𝐢𝐱 𝐑𝐞𝐬𝐞𝐭 𝐒𝐮𝐜𝐜𝐞𝐬𝐬!\n🔰 𝐒𝐲𝐬𝐭𝐞𝐦: %1",
      onlyAdmin: "⛔ 𝐎𝐧𝐥𝐲 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 𝐂𝐚𝐧 𝐂𝐡𝐚𝐧𝐠𝐞 𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐫𝐞𝐟𝐢𝐱.",
      confirmGlobal: "⚠️ 𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐫𝐞𝐟𝐢𝐱 𝐂𝐡𝐚𝐧𝐠𝐞?\n👉 𝐑𝐞𝐚𝐜𝐭 𝐓𝐨 𝐂𝐨𝐧𝐟𝐢𝐫𝐦",
      confirmThisThread: "⚠️ 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐞𝐟𝐢𝐱 𝐂𝐡𝐚𝐧𝐠𝐞?\n👉 𝐑𝐞𝐚𝐜𝐭 𝐓𝐨 𝐂𝐨𝐧𝐟𝐢𝐫𝐦",
      successGlobal: "✅ 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1",
      successThisThread: "✅ 𝐆𝐑𝐎𝐔𝐏 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    try {
      if (!args[0]) return message.reply(getLang("usage"));

      const threadID = event.threadID;

      if (args[0] === "reset") {
        await threadsData.set(threadID, null, "data.prefix");
        return message.reply(getLang("reset", global.GoatBot.config.prefix));
      }

      const newPrefix = args[0];
      const setGlobal = args[1] === "-g";

      if (setGlobal && role < 2)
        return message.reply(getLang("onlyAdmin"));

      const confirmMsg = setGlobal
        ? getLang("confirmGlobal")
        : getLang("confirmThisThread");

      message.reply(confirmMsg, (err, info) => {
        if (err) return;

        global.GoatBot.onReaction.set(info.messageID, {
          commandName,
          author: event.senderID,
          newPrefix,
          setGlobal
        });
      });
    } catch (error) {
      return message.reply(`❌ Error: ${error.message}`);
    }
  },

  onReaction: async function ({ event, message, threadsData, Reaction, getLang }) {
    try {
      if (event.userID !== Reaction.author) return;

      global.GoatBot.onReaction.delete(event.messageID);

      if (Reaction.setGlobal) {
        global.GoatBot.config.prefix = Reaction.newPrefix;
        return message.reply(getLang("successGlobal", Reaction.newPrefix));
      }

      await threadsData.set(
        event.threadID,
        Reaction.newPrefix,
        "data.prefix"
      );

      return message.reply(getLang("successThisThread", Reaction.newPrefix));
    } catch (error) {
      return message.reply(`❌ Reaction Error: ${error.message}`);
    }
  },

  onChat: async function ({ event, message }) {
    try {
      if (!event.body || event.body.trim().toLowerCase() !== "prefix") return;

      const threadID = event.threadID;

      const systemPrefix = global.GoatBot.config.prefix || "/";
      const groupPrefix = (global.utils && typeof global.utils.getPrefix === "function") 
        ? global.utils.getPrefix(threadID) 
        : systemPrefix;

      const timeRaw = moment().tz("Asia/Dhaka").format("hh:mm A");
      const dateRaw = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

      const sysPrefixBold = toBoldFont(systemPrefix);
      const grpPrefixBold = toBoldFont(groupPrefix);
      const timeBold = toBoldFont(timeRaw);
      const dateBold = toBoldFont(dateRaw);
      const ownerBold = "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
      const totalCmdsBold = toBoldFont(global.GoatBot.commands ? global.GoatBot.commands.size : 0);

      const design1 = `» 👑 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
───────────────
⚙️ 𝐏𝐑𝐄𝐅𝐈𝐗
╰─➤ ${sysPrefixBold}
💬 𝐆𝐑𝐎𝐔𝐏
╰─➤ ${grpPrefixBold}
» 🕐 𝐓𝐈𝐌𝐄  › ${timeBold}
» 📆 𝐃𝐀𝐓𝐄  › ${dateBold}
» 👑 𝐎𝐖𝐍𝐄𝐑 › 
⚛️ ${ownerBold}
» ⚡ 𝐂𝐌𝐃𝐒  › ${totalCmdsBold}
» ⚛️ 𝐕𝐄𝐑   › 𝐕𝟐 • 𝐕𝟑 • 𝐕𝟓
» ✅ 𝐒𝐓𝐀𝐓𝐔𝐒 › 𝐀𝐂𝐓𝐈𝐕𝐄
───────────────
╭─ 🔗 𝐆𝐈𝐓𝐇𝐔𝐁 ─╮
╰➤ [ https://github.com/siyam404-bot/siyam-V2-V5-bot-.git ]
───────────────
🧚‍♀️𝗡𝗜𝗝𝗛𝗨𝗠 𝗖𝗛𝗔𝗧𝗕𝗢𝗧`;

      const design2 = `❖ ─ [ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎 ] ─ ❖

⚡ 𝐏𝐑𝐄𝐅𝐈𝐗 : ➜ [ ${sysPrefixBold} ]
💬 𝐆𝐑𝐎𝐔𝐏 : ── ❖ ${grpPrefixBold} ❖── 
⏰ 𝐓𝐈𝐌𝐄 : ${timeBold}
📅 𝐃𝐀𝐓𝐄 : ${dateBold}
👑 𝐎𝐖𝐍𝐄𝐑 : 
⚛️ ${ownerBold}
📊 𝐓𝐎𝐓𝐀𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 : ${totalCmdsBold}
⚛️ 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 : 𝐕𝟐 • 𝐕𝟑 • 𝐕𝟓
✅ 𝐒𝐓𝐀𝐓𝐔𝐒 : 𝐀𝐂𝐓𝐈𝐕𝐄
───────────────
╭─ 🔗 𝐆𝐈𝐓𝐇𝐔𝐁 ─╮
╰➤ [ https://github.com/siyam404-bot/siyam-V2-V5-bot-.git ]
───────────────────
⚛️ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐂𝐇𝐀𝐓𝐁𝐎𝐓`;

      const designs = [design1, design2];
      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const randomMediaURL = mediaList[Math.floor(Math.random() * mediaList.length)];

      let mediaStream = await getImgurStream(randomMediaURL);

      if (!mediaStream && global.utils && typeof global.utils.getStreamFromURL === "function") {
        try {
          mediaStream = await global.utils.getStreamFromURL(randomMediaURL);
        } catch (e) {
          mediaStream = null;
        }
      }

      const msgPayload = {
        body: randomDesign
      };

      if (mediaStream) msgPayload.attachment = mediaStream;

      return message.reply(msgPayload);
    } catch (err) {
      return message.reply(`❌ Prefix Error: ${err.message}`);
    }
  }
};
