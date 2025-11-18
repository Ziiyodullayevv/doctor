import { Instagram, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900  text-white">
			{/* Main Footer */}
			<div className="container mx-auto px-4 md:px-10 py-12">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<Link to="/" className="flex items-center z-50">
						<span className="text-primary uppercase font-bold text-lg md:text-xl">
							Абдуллаев
						</span>
						<span className="text-blue-500 font-bold text-lg md:text-xl ml-1">
							З.Б.
						</span>
					</Link>
				</div>

				{/* Navigation */}
				<nav className="flex justify-center gap-8 md:gap-12 mb-8 flex-wrap">
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						ГЛАВНАЯ
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						ОБО МНЕ
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						ОПЕРАЦИИ
					</a>
					<a
						href="#"
						className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
					>
						КОНТАКТЫ
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
						<svg
							className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M13.5 9C13.5 8.17 12.83 7.5 12 7.5S10.5 8.17 10.5 9 11.17 10.5 12 10.5 13.5 9.83 13.5 9M18 9C18 11.5 16.5 13.5 14.5 14.5 13.83 15.67 12.67 16.5 11.5 16.83V18.25C14.5 17.53 17 15.03 17 12V10C17 9.45 16.55 9 16 9H12.5C12.22 9 12 8.78 12 8.5S12.22 8 12.5 8H16C17.1 8 18 8.9 18 10V9M6 9C6 6.5 7.5 4.5 9.5 3.5 10.17 2.33 11.33 1.5 12.5 1.17V-.25C9.5 .47 7 2.97 7 6V8C7 8.55 7.45 9 8 9H11.5C11.78 9 12 9.22 12 9.5S11.78 10 11.5 10H8C6.9 10 6 9.1 6 8V9Z" />
						</svg>
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
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-400 text-sm">
							Доктор{" "}
							<span className="font-semibold">Абдуллаев Зафар Бобирович</span> ©{" "}
							{currentYear}г.
						</p>
						<a
							href="#"
							className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
						>
							Разработка и реклама
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
