import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Reviews {
	fullName: string;
	date: string;
	description: string;
}

export default function ReviewsCarousel() {
	const [activeSlide, setActiveSlide] = useState(0);
	const { t } = useTranslation();
	const reviews = t("reviews.data", { returnObjects: true }) as Reviews[];

	const nextSlide = () => {
		setActiveSlide((prev) => (prev + 1) % reviews.length);
	};

	const prevSlide = () => {
		setActiveSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
	};

	const goToSlide = (index: number) => {
		setActiveSlide(index);
	};

	return (
		<section className="relative py-12 md:py-20 overflow-hidden">
			{/* Background Image with Overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80')",
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-teal-900/95 via-cyan-900/90 to-blue-900/95"></div>
			</div>

			<div className="container mx-auto px-4 md:px-10 relative z-10">
				{/* Header */}
				<div className="text-center mb-8 md:mb-12">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
						{t("reviews.title")}
					</h2>
					<div className="w-16 md:w-20 h-1 bg-white mx-auto mb-3 md:mb-4"></div>
				</div>

				{/* Carousel */}
				<div className="relative max-w-5xl mx-auto px-8 md:px-0">
					<div className="relative min-h-[450px] md:min-h-[400px] flex items-center">
						{reviews.map((review, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-500 ${
									index === activeSlide ? "opacity-100" : "opacity-0"
								}`}
							>
								<div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-12 border border-white/20 shadow-2xl">
									{/* Quote Icon */}
									<Quote className="w-8 h-8 md:w-12 md:h-12 text-white/40 mb-4 md:mb-6" />

									{/* Review Text */}
									<p className="text-white text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 max-h-[240px] md:max-h-none overflow-y-auto">
										{review.description}
									</p>

									{/* Author Info */}
									<div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
										<div>
											<p className="text-white font-semibold text-base md:text-lg">
												{review.fullName}
											</p>
											<p className="text-white/70 text-xs md:text-sm">
												{review.date}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group z-20"
					>
						<ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-primary transition-colors" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group z-20"
					>
						<ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-primary transition-colors" />
					</button>
				</div>

				{/* Pagination Dots */}
				<div className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12">
					{reviews.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className="group relative"
						>
							<div
								className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
									index === activeSlide
										? "w-8 md:w-12 bg-white shadow-lg"
										: "w-1.5 md:w-2 bg-white/50 hover:bg-white/80"
								}`}
							></div>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
