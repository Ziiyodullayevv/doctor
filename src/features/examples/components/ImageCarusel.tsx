import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface CaruselDataProps {
	caruselData: {
		id: string;
		title: string;
		urlList: string[];
	};
}

export default function ImageCarousel({ caruselData }: CaruselDataProps) {
	const images = useMemo(
		() => (Array.isArray(caruselData.urlList) ? caruselData.urlList : []),
		[caruselData.urlList],
	);
	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);
	const hasManySlides = images.length > 1;
	const isFirstSlide = activeSlide === 0;
	const isLastSlide = activeSlide === images.length - 1;

	const arrowBaseClass =
		"absolute top-1/2 z-20 -translate-y-1/2 rounded-full border p-1.5 md:p-2 shadow-lg backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80";
	const arrowEnabledClass =
		"border-white/40 bg-slate-900/35 text-white hover:-translate-y-1/2 hover:scale-105 hover:border-white hover:bg-white hover:text-slate-900";
	const arrowDisabledClass =
		"border-white/15 bg-slate-900/20 text-white/45 opacity-35 cursor-not-allowed";

	if (images.length === 0) {
		return null;
	}

	return (
		<section className="relative h-full overflow-visible">
			<div className="relative z-10 w-full">
				<div className="relative mx-auto w-full max-w-4xl">
					<Swiper
						modules={[Keyboard, A11y]}
						slidesPerView={1}
						spaceBetween={12}
						loop={false}
						allowTouchMove={hasManySlides}
						grabCursor={hasManySlides}
						touchStartPreventDefault={false}
						touchReleaseOnEdges
						keyboard={{ enabled: true }}
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
							setActiveSlide(swiper.realIndex);
						}}
						onSlideChange={(swiper) => {
							setActiveSlide(swiper.realIndex);
						}}
						className="w-full rounded-xl"
					>
						{images.map((src, index) => (
							<SwiperSlide key={`${caruselData.id}-${index}`}>
								<div className="relative h-[220px] w-full overflow-hidden rounded-xl sm:h-[280px] md:h-[360px] lg:h-[400px]">
									<img
										src={src}
										alt=""
										aria-hidden="true"
										loading={index === 0 ? "eager" : "lazy"}
										decoding="async"
										fetchPriority={index === 0 ? "high" : "low"}
										className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
									/>
									<div className="absolute inset-0 bg-black/25" />
									<img
										src={src}
										alt={`slide-${index}`}
										loading={index === 0 ? "eager" : "lazy"}
										decoding="async"
										fetchPriority={index === 0 ? "high" : "low"}
										className="relative z-10 h-full w-full rounded-xl object-contain p-2 sm:p-3"
									/>
								</div>
							</SwiperSlide>
						))}

						{hasManySlides && (
							<div className="absolute flex justify-center items-center bottom-2 left-2 right-2 z-20">
								<div className="flex justify-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-md">
									{images.map((_, index) => (
										<button
											key={`${caruselData.id}-dot-${index}`}
											type="button"
											onClick={() => swiperRef.current?.slideTo(index)}
											aria-label={`Go to image ${index + 1}`}
											className={`h-2 rounded-full transition-all duration-300 ${
												activeSlide === index
													? "w-7 bg-white shadow-sm md:w-8"
													: "w-2 bg-white/45 hover:bg-white/70"
											}`}
										/>
									))}
								</div>
							</div>
						)}
					</Swiper>

					{hasManySlides && (
						<>
							<button
								type="button"
								onClick={() => swiperRef.current?.slidePrev()}
								disabled={isFirstSlide}
								className={`${arrowBaseClass} left-2 hidden sm:block ${
									isFirstSlide ? arrowDisabledClass : arrowEnabledClass
								}`}
								aria-label="Previous image"
							>
								<ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
							</button>

							<button
								type="button"
								onClick={() => swiperRef.current?.slideNext()}
								disabled={isLastSlide}
								className={`${arrowBaseClass} right-2 hidden sm:block ${
									isLastSlide ? arrowDisabledClass : arrowEnabledClass
								}`}
								aria-label="Next image"
							>
								<ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
							</button>
						</>
					)}
				</div>
			</div>

			<h2 className="text-lg my-3">{caruselData.title}</h2>
		</section>
	);
}
