import { ArrowLeft, Clock3, Home, MapPin, PhoneCall, ShieldPlus } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { CONFIG } from "../../global-config";

type LocaleCode = "uz" | "ru" | "en";

const copy: Record<
	LocaleCode,
	{
		label: string;
		title: string;
		description: string;
		cardTitle: string;
		cardDescription: string;
		backLabel: string;
	}
> = {
	uz: {
		label: "Doctor Clinic",
		title: "Sahifa topilmadi",
		description:
			"Qidirayotgan sahifa ko'chirilgan yoki vaqtincha mavjud emas. Kerakli ma'lumotga asosiy sahifa yoki kontakt bo'limi orqali o'tishingiz mumkin.",
		cardTitle: "Tezkor yo'nalish",
		cardDescription: "Aloqa va qabul bo'yicha asosiy ma'lumotlar",
		backLabel: "Asosiy sahifaga qaytish",
	},
	ru: {
		label: "Doctor Clinic",
		title: "Страница не найдена",
		description:
			"Возможно, адрес изменился или страница временно недоступна. Перейдите на главную или в раздел контактов, чтобы быстро найти нужную информацию.",
		cardTitle: "Быстрый переход",
		cardDescription: "Основная информация для связи и записи",
		backLabel: "Вернуться на главную",
	},
	en: {
		label: "Doctor Clinic",
		title: "Page not found",
		description:
			"The page you requested may have moved or is temporarily unavailable. Use the home page or contacts section to find the right information quickly.",
		cardTitle: "Quick access",
		cardDescription: "Core details for contact and appointments",
		backLabel: "Back to home page",
	},
};

function getLocaleCopy(locale: string | undefined) {
	const language = locale?.slice(0, 2) as LocaleCode | undefined;
	return copy[language ?? "en"] ?? copy.en;
}

export default function NotFoundPage() {
	const { i18n, t } = useTranslation("navigation");
	const localized = getLocaleCopy(i18n.resolvedLanguage);

	const metaData = {
		title: `404 - ${CONFIG.appName}`,
	};

	return (
		<>
			<title>{metaData.title}</title>

			<section className="relative overflow-hidden min-h-[78vh] pt-28 md:pt-32 pb-16 md:pb-20">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
				<div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/25" />
				<div className="pointer-events-none absolute -right-12 bottom-8 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-600/30" />

				<div className="relative container mx-auto px-4 md:px-10">
					<div className="grid items-center gap-8 lg:grid-cols-2">
						<div className="space-y-6">
							<p className="inline-flex items-center rounded-full border border-blue-300/60 bg-blue-50/80 px-3 py-1 text-xs font-semibold tracking-wider text-blue-800 uppercase dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-200">
								{localized.label}
							</p>

							<h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent dark:from-cyan-200 dark:to-blue-400">
								404
							</h1>

							<div className="space-y-3">
								<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
									{localized.title}
								</h2>
								<p className="max-w-xl text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
									{localized.description}
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<Button asChild size="lg" className="rounded-full px-6">
									<Link to="/">
										<Home />
										{t("menu.home")}
									</Link>
								</Button>

								<Button
									asChild
									size="lg"
									variant="outline"
									className="rounded-full px-6 border-slate-300/70 bg-white/70 dark:border-slate-600 dark:bg-slate-900/40"
								>
									<Link to="/contact">{t("menu.contacts")}</Link>
								</Button>
							</div>
						</div>

						<div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-md md:p-8 dark:border-slate-700/80 dark:bg-slate-900/65">
							<div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/20" />

							<div className="relative flex items-center gap-4">
								<div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600/15 dark:bg-blue-500/20">
									<ShieldPlus className="h-7 w-7 text-blue-700 dark:text-blue-300" />
								</div>
								<div>
									<p className="text-lg font-semibold text-slate-900 dark:text-white">
										{localized.cardTitle}
									</p>
									<p className="text-sm text-slate-600 dark:text-slate-300">
										{localized.cardDescription}
									</p>
								</div>
							</div>

							<div className="relative mt-6 space-y-3">
								<div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/75 p-3 dark:border-slate-700 dark:bg-slate-900/60">
									<Clock3 className="h-5 w-5 text-blue-700 dark:text-blue-300" />
									<p className="text-sm text-slate-700 dark:text-slate-300">
										09:00 - 19:00, Dushanba - Shanba
									</p>
								</div>

								<div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/75 p-3 dark:border-slate-700 dark:bg-slate-900/60">
									<MapPin className="h-5 w-5 text-blue-700 dark:text-blue-300" />
									<p className="text-sm text-slate-700 dark:text-slate-300">
										Toshkent, mutaxassislik konsultatsiyasi
									</p>
								</div>

								<a
									href="tel:+998950047777"
									className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/75 p-3 text-sm font-medium text-slate-800 transition-colors hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-blue-500/10"
								>
									<PhoneCall className="h-5 w-5 text-blue-700 dark:text-blue-300" />
									+998 (95) 004-77-77
								</a>
							</div>

							<Button
								asChild
								variant="ghost"
								className="relative mt-5 px-0 text-blue-700 hover:bg-transparent hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
							>
								<Link to="/">
									<ArrowLeft />
									{localized.backLabel}
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
