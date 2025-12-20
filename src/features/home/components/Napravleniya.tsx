import { Button } from "@/components/ui/button";
import { Stethoscope, Activity, Heart } from "lucide-react";

const directions = [
	{
		title: "Генитальная хирургия",
		description:
			"Гипоспадия любой сложности, эписпадия, стриктура уретры, искривление полового члена, скрытый половой член.",
		icon: Stethoscope,
	},
	{
		title: "Эндоскопическая хирургия",
		description:
			"Минимально инвазивные операции на органах малого таза и мочевыводящей системы.",
		icon: Activity,
	},
	{
		title: "Реконструктивная хирургия",
		description:
			"Коррекция врожденных и приобретенных деформаций половых органов.",
		icon: Heart,
	},
];

export default function Napravleniya() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4 md:px-10">
				<div className="text-center mb-16">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
						Направления
					</h1>
					<span className="w-16 inline-block h-1 bg-primary rounded-full mb-3"></span>
					<h2 className="text-lg text-gray-600 dark:text-gray-400">
						Основные направления моей деятельности
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-25 md:gap-8 lg:gap-10">
					{directions.map((dir, index) => {
						const Icon = dir.icon;
						return (
							<div
								key={index}
								className="group relative border-1  rounded-2xl p-8 pt-20 pb-16 md:pb-12 shadow-lg hover:shadow-2xl transition-all duration-300 border-gray-100 hover:border-primary/50 dark:hover:border-primary/50"
							>
								{/* Icon */}
								<div className="absolute -top-10 left-1/2 -translate-x-1/2">
									<div
										className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br shadow-xl border-1 bg-background group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
									>
										<Icon className="w-10 h-10" />
									</div>
								</div>

								{/* Content */}
								<div className="text-center space-y-4">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
										{dir.title}
									</h2>
									<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
										{dir.description}
									</p>
								</div>

								{/* Button */}
								<div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
									<Button className="group/btn relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
										<span className="relative z-10">Подробнее</span>
										<div className="absolute inset-0 bg-gradient-to-r from-transparentgroup-hover/btn:translate-x-full transition-transform duration-700"></div>
									</Button>
								</div>

								{/* Decorative corner */}
								<div
									className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}
								></div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
