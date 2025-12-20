import { ArrowRight, Mail } from "lucide-react";

export default function DocInfo() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4 md:px-10">
				<div className="flex h-[600px] flex-col lg:flex-row gap-8 lg:gap-12 items-center">
					{/* Left - Image */}
					<div>
						<div className="h-[380px] w-[380px] rounded-full overflow-hidden ">
							<img
								src="/home/me.jpg"
								alt="Доктор Суров Роман Викторович"
								className="w-140 h-auto"
							/>
						</div>
					</div>

					{/* Right - Content */}
					<div className="w-full space-y-5">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
								Абдуллаев Зафар Бобирович
							</h1>
							<span className="w-[40px] inline-block h-[2px] bg-primary mb-3"></span>
							<h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
								Уролог-андролог
							</h2>
						</div>

						<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
							Пластический хирург, детский уролог-андролог, лечение гипоспадии.
							Реконструктивная и пластическая хирургия. Врач высшей
							квалификационной категории. Кандидат медицинских наук. Член
							Европейского общества детских урологов (ESPU). Реконструктивная и
							пластическая хирургия у взрослых и детей.
						</p>

						<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
							<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
								Провожу операции в Bios clinic и Морозовской ДГКБ г. Москвы
							</h2>
						</div>

						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 pt-2">
							<button className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
								<span>Подробнее обо мне</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>

							<button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700">
								<Mail className="w-5 h-5" />
								<span>Задать вопрос</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
