import { Send, Share2, MessageCircle, Youtube, Instagram, Facebook } from "lucide-react";
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

const TELEGRAM_CHAT_ID_KEY = "telegramChatId";

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");

const extractChatIdsFromUpdates = (updates: TelegramUpdate[]) => {
	const ids = new Set<string>();

	for (const update of updates) {
		const chatId =
			update.message?.chat?.id ??
			update.edited_message?.chat?.id ??
			update.channel_post?.chat?.id ??
			update.callback_query?.message?.chat?.id ??
			update.my_chat_member?.chat?.id;

		if (chatId !== undefined && chatId !== null) {
			ids.add(String(chatId));
		}
	}

	return Array.from(ids);
};

const readStoredChatIds = () => {
	if (typeof window === "undefined") {
		return [];
	}
	const raw = window.localStorage.getItem(TELEGRAM_CHAT_ID_KEY);
	if (!raw) {
		return [];
	}
	try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			return parsed.map((value) => String(value)).filter(Boolean);
		}
	} catch {
		// fallback to comma-separated format
	}
	return raw
		.split(",")
		.map((value) => value.trim())
		.filter(Boolean);
};

const storeChatIds = (ids: string[]) => {
	if (typeof window === "undefined") {
		return;
	}
	window.localStorage.setItem(TELEGRAM_CHAT_ID_KEY, JSON.stringify(ids));
};

const resolveTelegramChatIds = async (
	token: string,
	explicitChatId?: string,
	messages?: ChatIdMessages,
) => {
	const ids = new Set<string>();

	if (explicitChatId && explicitChatId.trim().length > 0) {
		ids.add(explicitChatId.trim());
	}

	for (const storedId of readStoredChatIds()) {
		ids.add(storedId);
	}

	let updatesError: Error | null = null;
	try {
		const updatesResponse = await fetch(
			`https://api.telegram.org/bot${token}/getUpdates?limit=100`,
		);
		const updatesData = await updatesResponse.json();

		if (!updatesResponse.ok || !updatesData?.ok) {
			throw new Error(
				updatesData?.description ||
					messages?.getUpdatesError ||
					"Chat ID not found.",
			);
		}

		const detectedChatIds = extractChatIdsFromUpdates(
			(updatesData.result ?? []) as TelegramUpdate[],
		);
		for (const id of detectedChatIds) {
			ids.add(id);
		}
	} catch (error) {
		updatesError = error instanceof Error ? error : null;
	}

	if (ids.size === 0) {
		throw updatesError ?? new Error(messages?.noChatId || "Chat ID not found.");
	}

	storeChatIds(Array.from(ids));

	return Array.from(ids);
};

const TelegramIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
		<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
	</svg>
);

const WhatsAppIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
	</svg>
);

const socialLinks = [
	{
		label: "Telegram",
		href: "https://t.me/Pediatric_urology",
		icon: <TelegramIcon />,
	},
	{
		label: "YouTube",
		href: "https://youtube.com/@dr.zafarabdullayev?si=ostHlCpokE1Og3lP",
		icon: <Youtube className="h-4 w-4" />,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/doc.abdullaevzafar?igsh=MTE4OG9kNHhycDF2bw==",
		icon: <Instagram className="h-4 w-4" />,
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/share/1AdQQbDAHm/",
		icon: <Facebook className="h-4 w-4" />,
	},
	{
		label: "WhatsApp",
		href: "https://wa.me/message/H7D2WIZWC3H7N1",
		icon: <WhatsAppIcon />,
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
			const chatIds = await resolveTelegramChatIds(botToken, explicitChatId, {
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

			const sendToChatId = async (chatId: string) => {
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
			};

			const sendResults = await Promise.allSettled(
				chatIds.map((chatId) => sendToChatId(chatId)),
			);
			const successCount = sendResults.filter(
				(result) => result.status === "fulfilled",
			).length;

			if (successCount === 0) {
				const firstError = sendResults.find(
					(result): result is PromiseRejectedResult =>
						result.status === "rejected",
				);
				throw firstError?.reason instanceof Error
					? firstError.reason
					: new Error(t("toast.error.default_description"));
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

	const [isShareOpen, setIsShareOpen] = useState(false);

	return (
		<>
			{/* Chat button */}
			<button
				type="button"
				className="chat-float-button"
				onClick={() => setIsChatOpen(true)}
				title={t("share.chat_tooltip")}
				style={{ zIndex: 999999, right: 88, bottom: 24 }}
			>
				<MessageCircle className="h-5 w-5 text-white" />
			</button>

			{/* Share button group */}
			<div className="ai-button" style={{ zIndex: 9, right: 24, bottom: 24 }}>
				<button
					type="button"
					className="ai-button-trigger"
					onClick={() => setIsShareOpen(!isShareOpen)}
					aria-label="Share"
				>
					<Share2 className="h-5 w-5 text-white" />
				</button>

				{isShareOpen && (
					<div className="ai-button-menu">
						{socialLinks.map((item) => (
							<a
								key={item.label}
								href={item.href}
								target="_blank"
								rel="noreferrer"
								className="ai-button-item"
								title={item.label}
							>
								{item.icon}
							</a>
						))}
					</div>
				)}
			</div>

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
