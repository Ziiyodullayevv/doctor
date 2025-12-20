"use client";
import { useState, useEffect } from "react";
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
	// State yordamida joriy tilni saqlash
	const [currentLangCode, setCurrentLangCode] = useState("ru");

	// Komponent yuklanganda localStorage dan tilni o'qish
	useEffect(() => {
		const savedLang = localStorage.getItem("i18nextLng") || "ru";
		setCurrentLangCode(savedLang);
	}, []);

	const currentLang =
		languages.find((lang) => lang.code === currentLangCode) || languages[0];

	const changeLanguage = (lng: string) => {
		// i18n.changeLanguage(lng); // i18n integration
		localStorage.setItem("i18nextLng", lng);
		setCurrentLangCode(lng);

		// Sahifani qayta yuklash (agar kerak bo'lsa)
		// window.location.reload();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="rounded-full w-8 h-8 p-0 hover:bg-accent transition-colors overflow-hidden"
				>
					<img
						src={currentLang.flag}
						alt={currentLang.label}
						className="w-full h-full object-cover"
					/>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-48">
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => {
							changeLanguage(lang.code);
							{
								window.location.reload();
							}
						}}
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
						{currentLangCode === lang.code && (
							<span className="ml-auto text-primary font-bold">✓</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
