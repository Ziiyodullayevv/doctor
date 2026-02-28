import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { HeroSlide } from "./Hero";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSliderProps {
	slides: HeroSlide[];
	cornerText: string;
}

export default function HeroSlider({ slides, cornerText }: HeroSliderProps) {
	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);
	const hasManySlides = slides.length > 1;

	return (
		<>
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
								delay: 3500,
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
									index === 1 ? "object-left md:object-center" : "object-center"
								}`}
								src={item.imgUrl}
								srcSet={item.srcSet}
								sizes={item.sizes}
								alt={
									item.alt || `${item.name} | Urokids pediatric urologist in Tashkent`
								}
								loading={index === 0 ? "eager" : "lazy"}
								decoding="async"
								fetchPriority={index === 0 ? "high" : "low"}
								width={1920}
								height={1080}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

							<div className="absolute bottom-20 left-0 right-0 p-4 text-white md:bottom-24 md:p-8 lg:bottom-28 lg:p-20">
								<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-end">
									<div className="max-w-xl">
										<h2 className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
											{item.name}
										</h2>
									</div>
									<h1 className="text-sm leading-relaxed text-gray-200 md:text-right md:text-sm md:translate-y-20">
										{cornerText}
									</h1>
								</div>
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
		</>
	);
}
