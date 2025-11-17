import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface CaruselDataProps {
	caruselData: {
		id: string;
		title: string;
		description: string;
		urlList: string[];
	};
}

export default function ImageCarousel({ caruselData }: CaruselDataProps) {
	const [activeSlide, setActiveSlide] = useState(0);

	const nextSlide = () => {
		setActiveSlide((prev) => (prev + 1) % caruselData.urlList.length);
	};

	const prevSlide = () => {
		setActiveSlide(
			(prev) =>
				(prev - 1 + caruselData.urlList.length) % caruselData.urlList.length
		);
	};

	const goToSlide = (index: number) => {
		setActiveSlide(index);
	};

	return (
		<section className="relative h-full  overflow-hidden">
			{/* Wrapper */}
			<div className="relative z-10">
				<div className="relative max-w-4xl mx-auto">
					<div className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
						{caruselData.urlList.map((src, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-500 flex justify-center items-center ${
									index === activeSlide ? "opacity-100" : "opacity-0"
								}`}
							>
								<img
									src={src}
									alt={`slide-${index}`}
									className="w-full h-full object-cover rounded-xl"
								/>
							</div>
						))}
					</div>

					{/* Arrows */}
					<button
						onClick={prevSlide}
						className="absolute left-2 p-2  top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-white/10 hover:bg-white/50  rounded-full shadow-lg transition-all"
					>
						<ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-2 p-2  top-1/2 -translate-y-1/2 backdrop-blur-2xl bg-white/10 hover:bg-white/50  rounded-full shadow-lg transition-all"
					>
						<ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</button>
				</div>

				{/* Dots */}
				<div className="flex justify-center gap-2 -mt-2 -translate-y-[20px] relative z-20">
					{caruselData.urlList.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`h-2 rounded-full transition-all ${
								activeSlide === index
									? "w-6 bg-gray-900"
									: "w-2 bg-gray-400 hover:bg-gray-600"
							}`}
						></button>
					))}
				</div>
			</div>

			<Accordion collapsible type="single">
				<AccordionItem value="item-1">
					<AccordionTrigger>{caruselData.title}</AccordionTrigger>
					<AccordionContent>{caruselData.description}</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
