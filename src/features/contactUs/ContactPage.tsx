import SubHeader from "@/components/SubHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CONFIG } from "../../../global-config";
import { useTranslation } from "react-i18next";
import { useState, type ChangeEvent, type FormEvent } from "react";

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
					"Telegram chat ID topilmadi (getUpdates xatosi).",
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
		throw (
			updatesError ??
			new Error(
				"Chat ID topilmadi. Botga avval Telegram ichida kamida bitta xabar yuboring yoki .env ga BOT_CHAT_ID yozing.",
			)
		);
	}

	storeChatIds(Array.from(ids));

	return Array.from(ids);
};

export default function ContactPage() {
	const { t, i18n } = useTranslation(["contacts", "navigation"]);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isAgreed, setIsAgreed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const metaData = {
		title: `${t("navigation:menu.contacts")} - ${CONFIG.appName}`,
	};

	const handleChange =
		(field: "name" | "email" | "phone" | "message") =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const validateForm = () => {
		if (
			!formData.name.trim() ||
			!formData.phone.trim() ||
			!formData.message.trim()
		) {
			toast({
				title: t("toast.validation.title"),
				description: t("toast.validation.description"),
				variant: "destructive",
			});
			return false;
		}

		if (formData.email.trim()) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email.trim())) {
				toast({
					title: t("toast.validation.title"),
					description: t("toast.validation.email"),
					variant: "destructive",
				});
				return false;
			}
		}

		if (!isAgreed) {
			toast({
				title: t("toast.validation.title"),
				description: t("toast.validation.privacy"),
				variant: "destructive",
			});
			return false;
		}

		return true;
	};

	const buildTelegramMessage = () => {
		const locale =
			i18n.resolvedLanguage === "ru"
				? "ru-RU"
				: i18n.resolvedLanguage === "uz"
					? "uz-UZ"
					: "en-US";

		const formattedDate = new Date().toLocaleString(locale, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});

		return [
			"🩺 <b>Yangi murojaat (Website)</b>",
			"",
			`<b>${escapeHtml(t("form_name"))}:</b> ${escapeHtml(formData.name.trim())}`,
			`<b>${escapeHtml(t("form_email"))}:</b> ${escapeHtml(formData.email.trim() || "-")}`,
			`<b>${escapeHtml(t("form_phone"))}:</b> ${escapeHtml(formData.phone.trim())}`,
			`<b>${escapeHtml(t("form_message"))}:</b>`,
			`${escapeHtml(formData.message.trim())}`,
			"",
			`<b>Language:</b> ${escapeHtml(i18n.resolvedLanguage || "unknown")}`,
			`<b>Time:</b> ${escapeHtml(formattedDate)}`,
		].join("\n");
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validateForm() || isSubmitting) {
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

		setIsSubmitting(true);

		try {
			const chatIds = await resolveTelegramChatIds(botToken, explicitChatId);
			const message = buildTelegramMessage();

			const sendToChatId = async (chatId: string) => {
				const response = await fetch(
					`https://api.telegram.org/bot${botToken}/sendMessage`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
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
					(
						result,
					): result is PromiseRejectedResult => result.status === "rejected",
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

			setFormData({
				name: "",
				email: "",
				phone: "",
				message: "",
			});
			setIsAgreed(false);
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
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<title>{metaData.title}</title>
			<BreadcrumbJsonLd
				pagePath="/contact"
				pageName={t("navigation:menu.contacts")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("navigation:menu.home"), path: "/" },
					{ name: t("navigation:menu.contacts"), path: "/contact" },
				]}
			/>

			<div>
				<SubHeader
					title={t("navigation:menu.contacts")}
					data={[
						{ label: t("navigation:menu.home"), path: "/" },
						{ label: t("navigation:menu.contacts"), path: "/contact" },
					]}
				/>

				<div className="container mx-auto px-5 md:px-10">
					{/* --- Konsultatsiya bo‘limi --- */}
					<div className="flex flex-col lg:flex-row items-start my-10 gap-10">
						{/* Left */}
						<div className="flex flex-col gap-5 text-foreground/70 flex-1">
							<h2 className="text-xl md:text-2xl font-medium leading-snug">
								{t("consultation_note")}
							</h2>

							<p>{t("clinic_title")}</p>

							<p>{t("clinic_address")}</p>

							{/* <p>
							Для записи через WhatsApp нажмите{" "}
							<strong className="font-normal ">СЮДА!!!</strong>
						</p> */}

							{/* <p>
							<strong className="font-normal">Пластическая хирургия</strong> в
							Морозовской больнице, записаться просто! Нажмите сюда.
						</p> */}
						</div>

						{/* Right */}
						<div className="text-foreground/70 flex-1 w-full">
							<ul className="list-disc flex flex-col gap-3">
								<li>
									<a href="https://wa.me/message/H7D2WIZWC3H7N1">
										WhatsApp:{" "}
										<span className="text-foreground">(95) 004 77 77</span>
									</a>
								</li>

								<li>
									Telegram (детская урология):{" "}
									<a
										className="text-foreground"
										href="https://t.me/Pediatric_urology"
									>
										Pediatric Urology
									</a>
								</li>
								<li>
									Instagram:{" "}
									<a
										className="text-foreground"
										href="https://www.instagram.com/doc.abdullaevzafar?igsh=MTE4OG9kNHhycDF2bw=="
									>
										@doc.abdullaevzafar
									</a>
								</li>
							</ul>

							<div className="flex flex-wrap gap-5 mt-7">
								<img
									className="w-28 md:w-32"
									src="/contacts/qr-whatsapp.png"
									alt=""
									loading="lazy"
									decoding="async"
								/>
								<img
									className="w-28 md:w-32"
									src="/contacts/qr-instagram.png"
									alt=""
									loading="lazy"
									decoding="async"
								/>
								<img
									className="w-28 md:w-32"
									src="/contacts/qr-telegram.png"
									alt=""
									loading="lazy"
									decoding="async"
								/>
							</div>
						</div>
					</div>

					{/* --- Savol berish bo‘limi --- */}
					<div className="flex relative flex-col lg:flex-row items-start my-10 gap-10">
						{/* Map */}
						<div className="flex-1 rounded-2xl overflow-hidden w-full">
							<iframe
								src="https://yandex.uz/map-widget/v1/?ll=69.339825%2C41.304195&mode=search&oid=158209277121&ol=biz&sctx=ZAAAAAgBEAAaKAoSCcueBDbnUVFAERGPxMvTp0RAEhIJWyIXnMHf1D8R%2Fz7jwoGQxj8iBgABAgMEBSgKOABApZ8GSAFqAnV6nQHNzMw9oAEAqAEAvQHmqEUBwgEGwfmHsM0EggIiTmF0aW9uYWwgQ2hpbGRyZW4ncyBNZWRpY2FsIENlbnRlcooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=69.339825%2C41.304195&sspn=0.007846%2C0.006199&text=National%20Children%27s%20Medical%20Center&z=16.83"
								width="100%"
								height="400"
							></iframe>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="flex-1 flex flex-col items-start gap-5 w-full"
						>
							<h2 className="text-xl md:text-2xl">{t("ask_doctor")}</h2>

							<Input
								value={formData.name}
								onChange={handleChange("name")}
								className="p-5 border rounded-full"
								placeholder={t("form_name")}
								name="name"
								autoComplete="name"
							/>

							<div className="flex flex-col md:flex-row w-full gap-4">
								<Input
									value={formData.email}
									onChange={handleChange("email")}
									type="email"
									name="email"
									autoComplete="email"
									className="p-5 border rounded-full md:flex-1"
									placeholder={t("form_email")}
								/>
								<Input
									value={formData.phone}
									onChange={handleChange("phone")}
									type="tel"
									name="phone"
									autoComplete="tel"
									className="p-5 border rounded-full md:flex-1"
									placeholder={t("form_phone")}
								/>
							</div>

							<Textarea
								value={formData.message}
								onChange={handleChange("message")}
								name="message"
								className="min-h-[180px] rounded-[20px]"
								placeholder={t("form_message")}
							/>

							<div className="flex items-center gap-3">
								<Checkbox
									id="terms"
									checked={isAgreed}
									onCheckedChange={(checked) => setIsAgreed(checked === true)}
								/>
								<Label htmlFor="terms">{t("form_privacy")}</Label>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="rounded-full px-10 py-5 disabled:opacity-70"
							>
								{isSubmitting ? t("toast.sending") : t("form_submit")}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
