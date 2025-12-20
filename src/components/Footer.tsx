import { Instagram, MessageCircle, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const { t } = useTranslation("navigation");
	return (
		<footer className="bg-gray-900  text-white">
			{/* Main Footer */}
			<div className="container mx-auto px-4 md:px-10 py-12">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<Logo />
				</div>

				{/* Navigation */}
				<nav className="flex justify-center gap-8 md:gap-12 mb-8 flex-wrap">
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						{t("menu.home")}
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						{t("menu.about")}
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						{t("menu.operations")}
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						{t("menu.contacts")}
					</a>
				</nav>

				{/* Social Media Icons */}
				<div className="flex justify-center gap-4 mb-8">
					<a
						href="#"
						className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
					>
						<Instagram className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
					</a>
					<a
						href="#"
						className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
					>
						<MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
					</a>

					<a
						href="#"
						className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
					>
						<Send className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
					</a>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="container mx-auto px-4 md:px-10 py-6">
					<div className="flex flex-col md:flex-row justify-center items-center gap-4">
						<p className="text-gray-400 text-sm">
							{t("menu.doctor")} © {currentYear}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
