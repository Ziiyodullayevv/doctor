import { useTranslation } from "react-i18next";

export default function Appointment() {
	const { t } = useTranslation("consultation");
	return (
		<section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800">
			<div className="container mx-auto px-4 md:px-10">
				<div className="max-w-3xl mx-auto text-center text-white">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						{t("consultation.title")}
					</h2>
					<div className="w-20 h-1 bg-white mx-auto mb-6"></div>
					<p className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed opacity-90">
						{t("consultation.description")}
					</p>
					<a
						target="_blank"
						href="https://wa.me/message/H7D2WIZWC3H7N1"
						className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						{t("consultation.appointment")}
					</a>
				</div>
			</div>
		</section>
	);
}
