import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Slide {
	name: string;
	description: string;
	imgUrl: string;
}

export default function Hero() {
	const [activeSlide, setActiveSlide] = useState(0);

	const { t } = useTranslation();

	const slides = t("hero.carusel", { returnObjects: true }) as Slide[];

	const nextSlide = () => {
		setActiveSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToSlide = (index: number) => {
		setActiveSlide(index);
	};

	// Auto-slide effect
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(interval); // Cleanup on unmount
	}, [activeSlide]); // Reset timer when slide changes manually

	return (
		<div className="w-full md:container md:mx-auto md:mt-25 md:px-3">
			<div className="relative h-[100vh] md:h-[620px] md:rounded-2xl overflow-hidden">
				{/* Slides */}
				<div className="relative h-full">
					{slides.map((item, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-500 ${
								index === activeSlide ? "opacity-100" : "opacity-0"
							}`}
						>
							<img
								className="w-full h-full object-cover"
								src={item.imgUrl}
								alt="Slide"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

							{/* Content */}
							<div className="absolute bottom-20 md:bottom-24 lg:bottom-28 left-0 right-0 p-4 md:p-8 lg:p-20 text-white">
								<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
									{item.name}
								</h1>
								<p className="text-sm md:text-lg lg:text-xl max-w-xl my-3 md:my-6 lg:my-8 text-gray-200">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/30 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
				>
					<ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white transition-colors" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/30 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
				>
					<ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white transition-colors" />
				</button>

				{/* Custom Pagination Dots */}
				<div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 md:gap-2">
					{slides.map((_, index) => (
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
		</div>
	);
}

// const slides = [
// 	{
// 		name: "Абдуллаев Зафар Бобирович",
// 		description:
// 			"Пластический хирург, детский уролог, детский хирург. Реконструктивная и пластическая хирургия для всей семьи.",
// 		imgUrl: "/home/hero1.webp",
// 	},
// 	{
// 		name: "Абдуллаев Зафар Бобирович",
// 		description:
// 			"Пластический и реконструктивный хирург. Индивидуальный подход к лечению детей и взрослых.",
// 		imgUrl: "/home/hero2.webp",
// 	},
// 	{
// 		name: "Абдуллаев Зафар Бобирович",
// 		description:
// 			"Детский уролог-хирург и пластический хирург. Современные методы восстановления и коррекции.",
// 		imgUrl:
// 			"https://47lokb.ru/upload/medialibrary/85a/l5v1qk60igxr3tpjzxqsx8iek4yr7ja8/hirurg_1.jpg",
// 	},
// ];
