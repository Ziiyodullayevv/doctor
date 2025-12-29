"use client";

import { useTranslation } from "react-i18next"; // Bu hook ni import qiling
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
	{ code: "ru", label: "Русский", flag: "https://flagcdn.com/w160/ru.png" },
	{ code: "uz", label: "O'zbekcha", flag: "https://flagcdn.com/w160/uz.png" },
	{ code: "en", label: "English", flag: "https://flagcdn.com/w160/us.png" },
];

export function LanguageToggle() {
	const { i18n } = useTranslation(); // i18n instansiyasini oling

	// Joriy tilni i18n dan oling – real-time yangilanadi
	const currentLangCode = i18n.language || "ru";
	const currentLang =
		languages.find((lang) => lang.code === currentLangCode.split("-")[0]) ||
		languages[0];

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng); // Bu muhim! Avto qayta render qiladi
		// localStorage avtomatik saqlanadi, agar detector ishlatayotgan bo'lsangiz
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="rounded-full w-8.5 h-8.5 p-0 border-1 transition-colors overflow-hidden"
				>
					<img
						src={currentLang.flag}
						alt={currentLang.label}
						className="w-full h-full object-cover"
					/>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mt-2 w-48">
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => changeLanguage(lang.code)}
						className="flex items-center gap-3 cursor-pointer py-2.5"
					>
						<div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
							<img
								src={lang.flag}
								alt={lang.label}
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="font-medium">{lang.label}</span>
						{currentLangCode.startsWith(lang.code) && (
							<span className="ml-auto text-primary font-bold">✓</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
