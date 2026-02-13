import {
	FacebookFilled,
	InstagramFilled,
	SendOutlined,
	WhatsAppOutlined,
	YoutubeFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const { t } = useTranslation("navigation");

	const socialLinks = [
		{
			label: "YouTube",
			href: "https://youtube.com/@dr.zafarabdullayev?si=ostHlCpokE1Og3lP",
			icon: <YoutubeFilled className="text-lg transition-colors" />,
		},
		{
			label: "Instagram",
			href: "https://www.instagram.com/doc.abdullaevzafar?igsh=MTE4OG9kNHhycDF2bw==",
			icon: <InstagramFilled className="text-lg transition-colors" />,
		},
		{
			label: "Telegram",
			href: "https://t.me/Pediatric_urology",
			icon: <SendOutlined className="text-lg transition-colors" />,
		},
		{
			label: "Facebook",
			href: "https://www.facebook.com/share/1AdQQbDAHm/",
			icon: <FacebookFilled className="text-lg transition-colors" />,
		},
		{
			label: "WhatsApp",
			href: "https://wa.me/message/H7D2WIZWC3H7N1",
			icon: <WhatsAppOutlined className="text-lg transition-colors" />,
		},
	];

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
					{socialLinks.map((social) => (
						<a
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							className="w-11 h-11 rounded-full border-2 border-gray-600 text-gray-300 hover:text-gray-900 hover:border-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
						>
							{social.icon}
						</a>
					))}
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
