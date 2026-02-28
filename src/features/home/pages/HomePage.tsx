import DocInfo from "../components/DocInfo";
import Hero from "../components/Hero";
import Napravleniya from "../components/Napravleniya";
import { useTranslation } from "react-i18next";
import {
	lazy,
	Suspense,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

const ReviewsCarousel = lazy(() => import("../components/Carusel"));
const ImageGroup = lazy(() => import("../components/ImageGroup"));

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
			<DeferredSection minHeight={520}>
				<Suspense fallback={<div className="h-[520px]" aria-hidden="true" />}>
					<ImageGroup />
				</Suspense>
			</DeferredSection>
			<DeferredSection minHeight={680}>
				<Suspense fallback={<div className="h-[680px]" aria-hidden="true" />}>
					<ReviewsCarousel />
				</Suspense>
			</DeferredSection>
		</>
	);
}

function DeferredSection({
	children,
	minHeight = 0,
	rootMargin = "300px 0px",
}: {
	children: ReactNode;
	minHeight?: number;
	rootMargin?: string;
}) {
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isVisible) {
			return;
		}

		const node = triggerRef.current;
		if (!node) {
			return;
		}

		if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.some((entry) => entry.isIntersecting);
				if (visible) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [isVisible, rootMargin]);

	return (
		<div ref={triggerRef}>
			{isVisible ? (
				children
			) : (
				<div style={minHeight > 0 ? { minHeight: `${minHeight}px` } : undefined} />
			)}
		</div>
	);
}
