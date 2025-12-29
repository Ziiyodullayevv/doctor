import { Link } from "react-router";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown, Moon, Smartphone, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/theme/useTheme";

interface OperationsItem {
	title: string;
	description: string;
}

export default function MobileMenu() {
	const { t } = useTranslation("menu");
	const operations = t("menu.operationsList", {
		returnObjects: true,
	}) as OperationsItem[];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const links = [
		"/operations/genital",
		"/operations/urology",
		"/operations/plastic",
	];

	const [openDropdowns, setOpenDropdowns] = useState<{
		[key: string]: boolean;
	}>({});
	const { theme, setTheme } = useTheme();

	const toggleDropdown = (key: string) => {
		setOpenDropdowns((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	if (!Array.isArray(operations)) {
		return null;
	}

	return (
		<nav className="h-full overflow-y-auto">
			<div className="container mx-auto px-4 py-6">
				<ul className="space-y-2">
					{/* Обо мне */}
					<li>
						<Link
							to="/about"
							className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{t("menu.home")}
						</Link>
					</li>

					{/* Операции Dropdown */}
					<li>
						<Collapsible
							open={openDropdowns.operations}
							onOpenChange={() => toggleDropdown("operations")}
						>
							<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium">
								<span>{t("menu.operations")}</span>
								<ChevronDown
									className={`h-4 w-4 transition-transform ${
										openDropdowns.operations ? "rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent className="ml-4 mt-2 space-y-2">
								{operations.map((operation, index) => (
									<Link
										key={operation.title}
										to={links[index]}
										className="block py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{operation.title}
									</Link>
								))}
							</CollapsibleContent>
						</Collapsible>
					</li>

					{/* Клинические примеры */}
					<li>
						<Link
							to="/cases"
							className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{t("menu.cases")}
						</Link>
					</li>

					{/* Хирургия в деталях */}
					<li>
						{/* <Link
									to="/surgery-details"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Хирургия в деталях
								</Link> */}
					</li>

					{/* Контакты */}
					<li>
						<Link
							to="/contact"
							className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{t("menu.contacts")}
						</Link>
					</li>
				</ul>

				{/* Phone and Theme Toggle */}
				<div className="mt-6 pt-6 border-t space-y-4">
					<a
						href="tel:+998950047777"
						className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-accent transition-colors"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<Smartphone className="h-5 w-5" />
						<span className="font-medium">+998 (95) 004-77-77</span>
					</a>

					{/* Theme Dropdown */}
					<Collapsible
						open={openDropdowns.theme}
						onOpenChange={() => toggleDropdown("theme")}
					>
						<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium">
							<div className="flex items-center gap-2">
								{theme === "dark" ? (
									<Moon className="h-5 w-5" />
								) : (
									<Sun className="h-5 w-5" />
								)}
								<span>{t("menu.theme")}</span>
							</div>
							<ChevronDown
								className={`h-4 w-4 transition-transform ${
									openDropdowns.theme ? "rotate-180" : ""
								}`}
							/>
						</CollapsibleTrigger>
						<CollapsibleContent className="ml-4 mt-2 space-y-2">
							<button
								onClick={() => {
									setTheme("light");
									setIsMobileMenuOpen(false);
								}}
								className="flex items-center gap-2 w-full py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
							>
								<Sun className="h-4 w-4" />
								<span>{t("menu.light")}</span>
							</button>
							<button
								onClick={() => {
									setTheme("dark");
									setIsMobileMenuOpen(false);
								}}
								className="flex items-center gap-2 w-full py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
							>
								<Moon className="h-4 w-4" />
								<span>{t("menu.dark")}</span>
							</button>
							<button
								onClick={() => {
									setTheme("system");
									setIsMobileMenuOpen(false);
								}}
								className="flex items-center gap-2 w-full py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
							>
								<svg
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<span>{t("menu.system")}</span>
							</button>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</div>
		</nav>
	);
}
