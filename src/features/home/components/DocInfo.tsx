import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function DocInfo() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<section className="py-8 md:py-10">
			<div className="container mx-auto px-4 md:px-10">
				<div className="flex flex-col items-center gap-8 text-center sm:text-left lg:flex-row lg:items-center lg:gap-12">
					{/* Left - Image */}
					<div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
						<div className="mx-auto aspect-square w-full overflow-hidden rounded-full">
							<img
								src="/home/doc-info/doc-banner.png"
								alt="Доктор Суров Роман Викторович"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover object-top"
							/>
						</div>
					</div>

					{/* Right - Content */}
					<div className="w-full space-y-4 md:space-y-5">
						<div>
							<h1 className="mb-3 break-words text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
								{t("docInfo.fullName")}
							</h1>
							<span className="mb-3 inline-block h-[2px] w-[40px] bg-primary"></span>
							<div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
								<h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl">
									{t("docInfo.job")}
								</h2>
							</div>
						</div>

						<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
							{t("docInfo.description")}
						</p>

						{/* Buttons */}
						<div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
							<button
								onClick={() => navigate("/about")}
								className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg sm:w-auto sm:px-6 sm:text-base"
							>
								<span>{t("docInfo.btn1")}</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>

							<a
								target="_blank"
								href="https://wa.me/message/H7D2WIZWC3H7N1"
								className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:w-auto sm:px-6 sm:text-base"
							>
								<Mail className="w-5 h-5" />
								<span>{t("docInfo.btn2")}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
