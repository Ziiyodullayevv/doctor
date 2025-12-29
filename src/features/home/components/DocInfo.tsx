import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DocInfo() {
	const { t } = useTranslation();
	return (
		<section className="py-8">
			<div className="container mx-auto px-4 md:px-10">
				<div className="flex flex-col text-center sm:text-left lg:flex-row gap-8 lg:gap-12 items-center">
					{/* Left - Image */}
					<div>
						<div className="h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full overflow-hidden ">
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
								{t("docInfo.fullName")}
							</h1>
							<span className="w-[40px] inline-block h-[2px] bg-primary mb-3"></span>
							<h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
								{t("docInfo.job")}
							</h2>
						</div>

						<p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
							{t("docInfo.description")}
						</p>

						{/* Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 pt-2">
							<button className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
								<span>{t("docInfo.btn1")}</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>

							<button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700">
								<Mail className="w-5 h-5" />
								<span>{t("docInfo.btn2")}</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
