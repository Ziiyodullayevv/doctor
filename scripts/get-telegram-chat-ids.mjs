import fs from "node:fs";
import https from "node:https";
import path from "node:path";

const cwd = process.cwd();

const loadEnvFile = () => {
	const envPath = path.join(cwd, ".env");
	if (!fs.existsSync(envPath)) {
		return {};
	}

	const content = fs.readFileSync(envPath, "utf8");
	const env = {};
	content.split(/\r?\n/).forEach((line) => {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) {
			return;
		}
		const eqIndex = trimmed.indexOf("=");
		if (eqIndex === -1) {
			return;
		}
		const key = trimmed.slice(0, eqIndex).trim();
		let value = trimmed.slice(eqIndex + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		env[key] = value;
	});
	return env;
};

const envFromFile = loadEnvFile();

const token =
	process.env.BOT_TOKEN ||
	process.env.VITE_BOT_TOKEN ||
	envFromFile.BOT_TOKEN ||
	envFromFile.VITE_BOT_TOKEN;

if (!token) {
	console.error(
		"BOT_TOKEN topilmadi. .env ga BOT_TOKEN yozing yoki BOT_TOKEN=... bilan ishga tushiring.",
	);
	process.exit(1);
}

const url = `https://api.telegram.org/bot${token}/getUpdates?limit=100`;

https
	.get(url, (res) => {
		let data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			try {
				const payload = JSON.parse(data);
				if (!payload.ok) {
					console.error(payload.description || "getUpdates xatosi.");
					process.exit(1);
				}

				const chats = new Map();
				for (const update of payload.result || []) {
					const chat =
						update?.message?.chat ||
						update?.edited_message?.chat ||
						update?.channel_post?.chat ||
						update?.callback_query?.message?.chat ||
						update?.my_chat_member?.chat;
					if (!chat?.id) {
						continue;
					}
					if (!chats.has(chat.id)) {
						chats.set(chat.id, {
							id: chat.id,
							type: chat.type,
							username: chat.username,
							first_name: chat.first_name,
							last_name: chat.last_name,
							title: chat.title,
						});
					}
				}

				if (chats.size === 0) {
					console.log(
						"Chat ID topilmadi. Botga /start yuboring, keyin qayta urinib ko'ring.",
					);
					return;
				}

				console.log("Chat IDs:");
				for (const chat of chats.values()) {
					const name =
						chat.title ||
						[chat.first_name, chat.last_name].filter(Boolean).join(" ") ||
						"-";
					console.log(
						`${chat.id} | ${chat.type || "-"} | ${chat.username || "-"} | ${name}`,
					);
				}
			} catch (error) {
				console.error("JSON parse xatosi:", error?.message || error);
				process.exit(1);
			}
		});
	})
	.on("error", (error) => {
		console.error("Tarmoq xatosi:", error?.message || error);
		process.exit(1);
	});
