import ReviewsCarousel from "../components/Carusel";
import DocInfo from "../components/DocInfo";
import Hero from "../components/Hero";
import ImageGroup from "../components/ImageGroup";
import Napravleniya from "../components/Napravleniya";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const upsertMeta = (
	query: string,
	attribute: "property" | "name",
	key: string,
	content: string,
) => {
	let meta = document.querySelector<HTMLMetaElement>(query);
	if (!meta) {
		meta = document.createElement("meta");
		meta.setAttribute(attribute, key);
		document.head.appendChild(meta);
	}
	meta.setAttribute("content", content);
};

export default function HomePage() {
	const { i18n } = useTranslation("home");
	const activeLang = i18n.language.slice(0, 2);
	const homeSeoByLang: Record<string, { title: string; description: string }> = {
		ru: {
			title: "Urokids - Детская урология в Ташкенте | Абдуллаев Зафар",
			description:
				"Urokids — детская урология в Ташкенте, Узбекистан: безопасная диагностика и эффективное лечение урологических заболеваний у детей.",
		},
		uz: {
			title: "Urokids - Toshkentda bolalar urologi | Abdullaev Zafar",
			description:
				"Urokids — Toshkentdagi bolalar urologiyasi markazi: xavfsiz diagnostika va bolalar urologik kasalliklarini samarali davolash.",
		},
		en: {
			title: "Urokids - Pediatric Urology in Tashkent | Dr. Zafar Abdullaev",
			description:
				"Urokids provides safe, evidence-based pediatric urology diagnostics and effective treatment in Tashkent, Uzbekistan.",
		},
	};
	const activeSeo = homeSeoByLang[activeLang] ?? homeSeoByLang.ru;
	const metaData = {
		title: activeSeo.title,
		description: activeSeo.description,
		keywords:
			"urokids, urokids.uz, pediatric urologist in tashkent, детский уролог ташкент, bolalar urologi toshkent, pediatric urology uzbekistan",
	};

	useEffect(() => {
		document.title = metaData.title;
		upsertMeta('meta[name="description"]', "name", "description", metaData.description);
		upsertMeta('meta[name="keywords"]', "name", "keywords", metaData.keywords);
		upsertMeta('meta[property="og:title"]', "property", "og:title", metaData.title);
		upsertMeta(
			'meta[property="og:description"]',
			"property",
			"og:description",
			metaData.description,
		);
		upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", metaData.title);
		upsertMeta(
			'meta[name="twitter:description"]',
			"name",
			"twitter:description",
			metaData.description,
		);
	}, [metaData.description, metaData.keywords, metaData.title]);

	return (
		<>
			<Hero />
			<Napravleniya />
			<DocInfo />
			<ImageGroup />
			<ReviewsCarousel />
		</>
	);
}
