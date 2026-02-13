import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

interface Slide {
	name: string;
	description: string;
	imgUrl: string;
}

export default function Hero() {
	const { t } = useTranslation();
	const rawSlides = t("hero.carusel", { returnObjects: true }) as Slide[];
	const slides = useMemo(
		() => (Array.isArray(rawSlides) ? rawSlides : []),
		[rawSlides],
	);
	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);
	const hasManySlides = slides.length > 1;

	if (slides.length === 0) {
		return null;
	}

	return (
		<div className="w-full md:container md:mx-auto md:mt-25 md:px-3">
			<div className="relative h-[100vh] overflow-hidden md:h-[620px] md:rounded-2xl">
				<Swiper
					modules={[Autoplay, A11y, EffectFade]}
					slidesPerView={1}
					spaceBetween={0}
					effect="fade"
					fadeEffect={{ crossFade: true }}
					speed={500}
					loop={hasManySlides}
					allowTouchMove={hasManySlides}
					grabCursor={hasManySlides}
					touchStartPreventDefault={false}
					touchReleaseOnEdges
					autoplay={
						hasManySlides
							? {
									delay: 3000,
									disableOnInteraction: false,
									pauseOnMouseEnter: false,
									waitForTransition: true,
								}
							: false
					}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						setActiveSlide(swiper.realIndex);
						if (hasManySlides && swiper.autoplay && !swiper.autoplay.running) {
							swiper.autoplay.start();
						}
					}}
					onSlideChange={(swiper) => {
						setActiveSlide(swiper.realIndex);
					}}
					className="h-full"
				>
					{slides.map((item, index) => (
						<SwiperSlide key={`${item.name}-${index}`}>
							<div className="relative h-full">
								<img
									className={`h-full w-full object-cover ${
										index === 1
											? "object-left md:object-center"
											: "object-center"
									}`}
									src={heroImage[index]}
									alt={item.name}
									loading={index === 0 ? "eager" : "lazy"}
									decoding="async"
									fetchPriority={index === 0 ? "high" : "auto"}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

								<div className="absolute bottom-20 left-0 right-0 p-4 text-white md:bottom-24 md:p-8 lg:bottom-28 lg:p-20">
									<h1 className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
										{item.name}
									</h1>
									<p className="my-3 max-w-xl text-sm text-gray-200 md:my-6 md:text-lg lg:my-8 lg:text-xl">
										{item.description}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{hasManySlides && (
					<>
						<button
							type="button"
							onClick={() => {
								swiperRef.current?.slidePrev();
								swiperRef.current?.autoplay?.start();
							}}
							className="group absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/30 md:left-4 md:p-3"
							aria-label="Previous hero slide"
						>
							<ChevronLeft className="h-5 w-5 text-white transition-colors md:h-6 md:w-6" />
						</button>
						<button
							type="button"
							onClick={() => {
								swiperRef.current?.slideNext();
								swiperRef.current?.autoplay?.start();
							}}
							className="group absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/30 md:right-4 md:p-3"
							aria-label="Next hero slide"
						>
							<ChevronRight className="h-5 w-5 text-white transition-colors md:h-6 md:w-6" />
						</button>

						<div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-6">
							{slides.map((_, index) => (
								<button
									key={`hero-dot-${index}`}
									type="button"
									onClick={() => {
										swiperRef.current?.slideToLoop(index);
										swiperRef.current?.autoplay?.start();
									}}
									aria-label={`Go to slide ${index + 1}`}
									className={`h-2 rounded-full transition-all duration-300 ${
										activeSlide === index
											? "w-10 bg-white shadow-lg md:w-12"
											: "w-2 bg-white/55 hover:bg-white/85"
									}`}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

const heroImage = [
	"/banner/banner-1.jpeg",
	"/banner/banner-2.jpeg",
	"/banner/banner-3.jpeg",
];
