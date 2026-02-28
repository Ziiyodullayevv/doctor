import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface Slide {
	name: string;
	description: string;
	imgUrl: string;
	alt?: string;
}

export interface HeroSlide extends Slide {
	srcSet?: string;
	sizes: string;
}

const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px";

const HERO_IMAGE_PRESETS: Record<
	string,
	{ mobile: string; desktop: string; full: string }
> = {
	"/banner/banner-1.jpeg": {
		mobile: "/banner/optimized/banner-1-768.jpg",
		desktop: "/banner/optimized/banner-1-1280.jpg",
		full: "/banner/banner-1.jpeg",
	},
	"/banner/banner-2.jpeg": {
		mobile: "/banner/optimized/banner-2-768.jpg",
		desktop: "/banner/optimized/banner-2-1280.jpg",
		full: "/banner/banner-2.jpeg",
	},
	"/banner/banner-3.jpeg": {
		mobile: "/banner/optimized/banner-3-768.jpg",
		desktop: "/banner/optimized/banner-3-1280.jpg",
		full: "/banner/banner-3.jpeg",
	},
	"/banner/optimized/banner-1-1280.jpg": {
		mobile: "/banner/optimized/banner-1-768.jpg",
		desktop: "/banner/optimized/banner-1-1280.jpg",
		full: "/banner/banner-1.jpeg",
	},
	"/banner/optimized/banner-2-1280.jpg": {
		mobile: "/banner/optimized/banner-2-768.jpg",
		desktop: "/banner/optimized/banner-2-1280.jpg",
		full: "/banner/banner-2.jpeg",
	},
	"/banner/optimized/banner-3-1280.jpg": {
		mobile: "/banner/optimized/banner-3-768.jpg",
		desktop: "/banner/optimized/banner-3-1280.jpg",
		full: "/banner/banner-3.jpeg",
	},
};

const DEFAULT_SLIDE_IMAGES = [
	"/banner/optimized/banner-1-1280.jpg",
	"/banner/optimized/banner-2-1280.jpg",
	"/banner/optimized/banner-3-1280.jpg",
];

const HeroSlider = lazy(() => import("./HeroSlider"));

const resolveSlideImage = (input: string | undefined, index: number) => {
	if (input && input.trim().length > 0) {
		return input;
	}
	return DEFAULT_SLIDE_IMAGES[index] ?? DEFAULT_SLIDE_IMAGES[0];
};

const toHeroSlide = (slide: Slide, index: number): HeroSlide => {
	const image = resolveSlideImage(slide.imgUrl, index);
	const preset = HERO_IMAGE_PRESETS[image];

	return {
		...slide,
		imgUrl: preset?.desktop ?? image,
		srcSet: preset
			? `${preset.mobile} 768w, ${preset.desktop} 1280w, ${preset.full} 1920w`
			: undefined,
		sizes: HERO_IMAGE_SIZES,
	};
};

export default function Hero() {
	const { t } = useTranslation();
	const rawSlides = t("hero.carusel", { returnObjects: true }) as Slide[];
	const cornerText = t("hero.cornerText");
	const [activateSlider, setActivateSlider] = useState(false);
	const slides = useMemo(() => {
		if (!Array.isArray(rawSlides)) {
			return [];
		}
		return rawSlides.map(toHeroSlide);
	}, [rawSlides]);

	useEffect(() => {
		const timerId = window.setTimeout(() => {
			setActivateSlider(true);
		}, 1200);
		return () => window.clearTimeout(timerId);
	}, []);

	useEffect(() => {
		if (slides.length === 0) {
			return;
		}

		const firstSlide = slides[0];
		const preloadLink = document.createElement("link");
		preloadLink.rel = "preload";
		preloadLink.as = "image";
		preloadLink.href = firstSlide.imgUrl;
		preloadLink.setAttribute("data-hero-preload", "true");
		if (firstSlide.srcSet) {
			preloadLink.setAttribute("imagesrcset", firstSlide.srcSet);
			preloadLink.setAttribute("imagesizes", firstSlide.sizes);
		}

		document.head.appendChild(preloadLink);
		return () => {
			preloadLink.remove();
		};
	}, [slides]);

	if (slides.length === 0) {
		return null;
	}

	const firstSlide = slides[0];

	return (
		<div className="w-full md:container md:mx-auto md:mt-25 md:px-3">
			<div className="relative h-[100vh] overflow-hidden md:h-[620px] md:rounded-2xl">
				{activateSlider ? (
					<Suspense
						fallback={<StaticHeroSlide slide={firstSlide} cornerText={cornerText} />}
					>
						<HeroSlider slides={slides} cornerText={cornerText} />
					</Suspense>
				) : (
					<StaticHeroSlide slide={firstSlide} cornerText={cornerText} />
				)}
			</div>
		</div>
	);
}

function StaticHeroSlide({
	slide,
	cornerText,
}: {
	slide: HeroSlide;
	cornerText: string;
}) {
	return (
		<div className="relative h-full">
			<img
				className="h-full w-full object-cover object-center"
				src={slide.imgUrl}
				srcSet={slide.srcSet}
				sizes={slide.sizes}
				alt={
					slide.alt || `${slide.name} | Urokids pediatric urologist in Tashkent`
				}
				loading="eager"
				decoding="async"
				fetchPriority="high"
				width={1920}
				height={1080}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

			<div className="absolute bottom-20 left-0 right-0 p-4 text-white md:bottom-24 md:p-8 lg:bottom-28 lg:p-20">
				<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-end">
					<div className="max-w-xl">
						<h2 className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
							{slide.name}
						</h2>
					</div>
					<h1 className="text-sm leading-relaxed text-gray-200 md:text-right md:text-sm md:translate-y-20">
						{cornerText}
					</h1>
				</div>
			</div>
		</div>
	);
}
