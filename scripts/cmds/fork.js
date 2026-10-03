module.exports = {
	config: {
		name: "fork",
		aliases: ["github", "গিটহাব"],
		version: "4.0",
		author: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
		countDown: 0,
		role: 0,
		shortDescription: {
			bn: "বটের ফোর্ক লিঙ্ক ও আপডেট দেখাবে"
		},
		longDescription: {
			bn: "বটের আপডেট ফোর্ক গিটহাব লিঙ্ক সবাইকে মেনশন দিয়ে নোটিফিকেশন পাঠাবে"
		},
		category: "info",
		guide: {
			bn: ""
		}
	},

	onStart: async function ({ api, event, Threads }) {
		return await module.exports.sendForkUpdate({ api, event, Threads });
	},

	onChat: async function ({ api, event, Threads }) {
		const { body } = event;
		if (!body) return;

		const text = body.toLowerCase();

		// যেকোনো লেখার শুরুতে, মাঝে বা শেষে থাকলে এবং বড়/ছোট হাতের বা বাংলা/ইংরেজি যেকোনো ফরম্যাটে থাকলেও ট্রিগার হবে
		const triggerRegex = /(fork|ফোর্ক|Fork|github|গিটহাব)/i;

		if (triggerRegex.test(text)) {
			return await module.exports.sendForkUpdate({ api, event, Threads });
		}
	},

	sendForkUpdate: async function ({ api, event, Threads }) {
		const { threadID, messageID } = event;

		try {
			let threadInfo;
			if (Threads && typeof Threads.getInfo === "function") {
				threadInfo = await Threads.getInfo(threadID);
			} else if (api && typeof api.getThreadInfo === "function") {
				threadInfo = await api.getThreadInfo(threadID);
			}

			let participantIDs = [];
			if (threadInfo) {
				if (Array.isArray(threadInfo.participantIDs) && threadInfo.participantIDs.length > 0) {
					participantIDs = threadInfo.participantIDs;
				} else if (Array.isArray(threadInfo.userInfo) && threadInfo.userInfo.length > 0) {
					participantIDs = threadInfo.userInfo.map(u => u.id || u.facebookID);
				}
			}

			const mentionTag = "🚨 𝐍𝐄𝐖 𝐅𝐎𝐑𝐊 𝐔𝐏𝐃𝐀𝐓𝐄";

			const mentions = participantIDs.map(id => ({
				id: id,
				tag: mentionTag
			}));

			const messageBody = 
`${mentionTag}
➤ 𝐍𝐞𝐰 𝐅𝐮𝐧 & 𝐔𝐬𝐞𝐟𝐮𝐥 𝐂𝐌𝐃𝐒 
😼 𝐔𝐒𝐄 𝐈𝐓
😁 𝐓𝐇𝐄𝐍 𝐊𝐍𝐎𝐖! 

🔗 𝐆𝐢𝐭𝐇𝐮𝐛
https://github.com/siyam404-bot/siyam-V2-V5-bot-.git`;

			return api.sendMessage({
				body: messageBody,
				mentions: mentions.length > 0 ? mentions : []
			}, threadID, messageID);

		} catch (error) {
			console.error("Fork Command Error:", error);

			const fallbackBody = 
`🚨 𝐍𝐄𝐖 𝐅𝐎𝐑𝐊 𝐔𝐏𝐃𝐀𝐓𝐄
➤ 𝐍𝐞𝐰 𝐅𝐮𝐧 & 𝐔𝐬𝐞𝐟𝐮𝐥 𝐂𝐌𝐃𝐒 
😼 𝐔𝐒𝐄 𝐈𝐓
🤮 𝐓𝐇𝐄𝐍 𝐊𝐍𝐎𝐖! 

🔗 𝐆𝐢𝐭𝐇𝐮𝐛
https://github.com/siyam404-bot/siyam-V2-V5-bot-.git`;

			return api.sendMessage(fallbackBody, threadID, messageID);
		}
	}
};
