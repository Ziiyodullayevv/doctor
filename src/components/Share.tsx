import {
	FacebookFilled,
	InstagramFilled,
	SendOutlined,
	ShareAltOutlined,
	WhatsAppOutlined,
	YoutubeFilled,
} from "@ant-design/icons";
import { Send } from "lucide-react";
import { FloatButton } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import "./Share.css";

type TelegramUpdate = {
	message?: { chat?: { id?: number | string } };
	edited_message?: { chat?: { id?: number | string } };
	channel_post?: { chat?: { id?: number | string } };
	callback_query?: { message?: { chat?: { id?: number | string } } };
	my_chat_member?: { chat?: { id?: number | string } };
};

type EnvWithBot = ImportMetaEnv & {
	BOT_TOKEN?: string;
	VITE_BOT_TOKEN?: string;
	BOT_CHAT_ID?: string;
	VITE_BOT_CHAT_ID?: string;
	CHAT_ID?: string;
	VITE_CHAT_ID?: string;
};

type ChatIdMessages = {
	getUpdatesError: string;
	noChatId: string;
};

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

const extractChatIdFromUpdates = (updates: TelegramUpdate[]) => {
	for (let idx = updates.length - 1; idx >= 0; idx -= 1) {
		const update = updates[idx];
		const chatId =
			update.message?.chat?.id ??
			update.edited_message?.chat?.id ??
			update.channel_post?.chat?.id ??
			update.callback_query?.message?.chat?.id ??
			update.my_chat_member?.chat?.id;

		if (chatId !== undefined && chatId !== null) {
			return chatId;
		}
	}
	return null;
};

const resolveTelegramChatId = async (
	token: string,
	explicitChatId?: string,
	messages?: ChatIdMessages,
) => {
	if (explicitChatId && explicitChatId.trim().length > 0) {
		return explicitChatId.trim();
	}

	const updatesResponse = await fetch(
		`https://api.telegram.org/bot${token}/getUpdates?limit=30`,
	);
	const updatesData = await updatesResponse.json();

	if (!updatesResponse.ok || !updatesData?.ok) {
		throw new Error(
			updatesData?.description ||
				messages?.getUpdatesError ||
				"Chat ID not found.",
		);
	}

	const detectedChatId = extractChatIdFromUpdates(
		(updatesData.result ?? []) as TelegramUpdate[],
	);
	if (detectedChatId === null) {
		throw new Error(messages?.noChatId || "Chat ID not found.");
	}

	return detectedChatId;
};

const socialLinks = [
	{
		label: "Telegram",
		href: "https://t.me/Pediatric_urology",
		icon: <SendOutlined />,
	},
	{
		label: "YouTube",
		href: "https://youtube.com/@dr.zafarabdullayev?si=ostHlCpokE1Og3lP",
		icon: <YoutubeFilled />,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/doc.abdullaevzafar?igsh=MTE4OG9kNHhycDF2bw==",
		icon: <InstagramFilled />,
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/share/1AdQQbDAHm/",
		icon: <FacebookFilled />,
	},
	{
		label: "WhatsApp",
		href: "https://wa.me/message/H7D2WIZWC3H7N1",
		icon: <WhatsAppOutlined />,
	},
];

export default function FloatingShareButton() {
	const { t, i18n } = useTranslation("contacts");
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		message: "",
	});
	const [isSending, setIsSending] = useState(false);

	const sendChatRequest = async () => {
		const trimmedName = formData.name.trim();
		const trimmedPhone = formData.phone.trim();
		const trimmedMessage = formData.message.trim();

		if (!trimmedName || !trimmedPhone || !trimmedMessage) {
			toast({
				title: t("toast.validation.title"),
				description: t("toast.validation.description"),
				variant: "destructive",
			});
			return;
		}

		const phoneRegex = /^[\d+\-()\s]{7,}$/;
		if (!phoneRegex.test(trimmedPhone)) {
			toast({
				title: t("toast.validation.title"),
				description: t("toast.validation.phone"),
				variant: "destructive",
			});
			return;
		}

		const env = import.meta.env as EnvWithBot;
		const botToken = env.BOT_TOKEN || env.VITE_BOT_TOKEN;
		const explicitChatId =
			env.BOT_CHAT_ID ||
			env.VITE_BOT_CHAT_ID ||
			env.CHAT_ID ||
			env.VITE_CHAT_ID;

		if (!botToken) {
			toast({
				title: t("toast.error.title"),
				description: t("toast.error.missing_bot"),
				variant: "destructive",
			});
			return;
		}

		setIsSending(true);
		try {
			const chatId = await resolveTelegramChatId(botToken, explicitChatId, {
				getUpdatesError: t("share.chat_id_error"),
				noChatId: t("share.chat_id_missing"),
			});
			const locale =
				i18n.resolvedLanguage === "ru"
					? "ru-RU"
					: i18n.resolvedLanguage === "uz"
						? "uz-UZ"
						: "en-US";
			const message = [
				`💬 <b>${escapeHtml(t("share.bot_header"))}</b>`,
				"",
				`<b>${escapeHtml(t("form_name"))}:</b> ${escapeHtml(trimmedName)}`,
				`<b>${escapeHtml(t("form_phone"))}:</b> ${escapeHtml(trimmedPhone)}`,
				`<b>${escapeHtml(t("form_message"))}:</b>`,
				`${escapeHtml(trimmedMessage)}`,
				"",
				`<b>${escapeHtml(t("share.bot_time"))}:</b> ${escapeHtml(
					new Date().toLocaleString(locale),
				)}`,
			].join("\n");

			const response = await fetch(
				`https://api.telegram.org/bot${botToken}/sendMessage`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chat_id: chatId,
						text: message,
						parse_mode: "HTML",
						disable_web_page_preview: true,
					}),
				},
			);

			const result = await response.json();
			if (!response.ok || !result?.ok) {
				throw new Error(
					result?.description || t("toast.error.default_description"),
				);
			}

			toast({
				title: t("toast.success.title"),
				description: t("toast.success.description"),
				variant: "success",
			});
			setFormData({ name: "", phone: "", message: "" });
			setIsChatOpen(false);
		} catch (error) {
			toast({
				title: t("toast.error.title"),
				description:
					error instanceof Error
						? error.message
						: t("toast.error.default_description"),
				variant: "destructive",
			});
		} finally {
			setIsSending(false);
		}
	};

	return (
		<>
			<FloatButton
				className="chat-float-button"
				icon={<SendOutlined />}
				tooltip={t("share.chat_tooltip")}
				onClick={() => setIsChatOpen(true)}
				style={{ zIndex: 999999, right: 88, bottom: 24 }}
			/>

			<FloatButton.Group
				className="ai-button"
				trigger="click"
				type="primary"
				icon={<ShareAltOutlined />}
				style={{ zIndex: 999999, right: 24, bottom: 24 }}
			>
				{socialLinks.map((item) => (
					<FloatButton
						key={item.label}
						icon={item.icon}
						href={item.href}
						target="_blank"
						tooltip={item.label}
					/>
				))}
			</FloatButton.Group>

			<Dialog
				open={isChatOpen}
				onOpenChange={(open) => {
					if (!isSending) setIsChatOpen(open);
				}}
			>
				<DialogContent className="max-w-md rounded-2xl border-border/60 bg-background/95 p-0 backdrop-blur-xl">
					<div className="rounded-t-2xl bg-gradient-to-rx p-5">
						<DialogHeader>
							<DialogTitle className="text-xl">
								{t("share.modal_title")}
							</DialogTitle>
							<DialogDescription>
								{t("share.modal_description")}
							</DialogDescription>
						</DialogHeader>
					</div>

					<div className="space-y-4 px-5 pb-5">
						<div className="space-y-2">
							<label htmlFor="chat-name" className="text-sm my-4 font-medium">
								{t("form_name")}
							</label>
							<Input
								id="chat-name"
								value={formData.name}
								onChange={(event) =>
									setFormData((prev) => ({ ...prev, name: event.target.value }))
								}
								placeholder={t("form_name")}
								className="h-11 rounded-xl mt-2"
								autoFocus
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="chat-phone" className="text-sm font-medium">
								{t("form_phone")}
							</label>
							<Input
								id="chat-phone"
								value={formData.phone}
								onChange={(event) =>
									setFormData((prev) => ({
										...prev,
										phone: event.target.value,
									}))
								}
								placeholder={t("share.phone_placeholder")}
								className="h-11 mt-2 rounded-xl"
								type="tel"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="chat-message" className="text-sm font-medium">
								{t("form_message")}
							</label>
							<Textarea
								id="chat-message"
								value={formData.message}
								onChange={(event) =>
									setFormData((prev) => ({
										...prev,
										message: event.target.value,
									}))
								}
								placeholder={t("form_message")}
								className="min-h-[120px] mt-2 rounded-xl"
							/>
						</div>

						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsChatOpen(false)}
								disabled={isSending}
								className="rounded-xl"
							>
								{t("share.cancel")}
							</Button>
							<Button
								onClick={sendChatRequest}
								disabled={isSending}
								className="rounded-xl bg-blue-500 text-white"
							>
								<Send className="h-4 w-4" />
								{isSending ? t("toast.sending") : t("form_submit")}
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
