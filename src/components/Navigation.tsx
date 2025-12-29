"use client";

import { Link } from "react-router";
import {
	Smartphone,
	Menu,
	X,
	ChevronDown,
	Moon,
	Sun,
	Globe,
} from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTheme } from "@/context/theme/useTheme";
import { LanguageToggle } from "./LanguageSwitcher"; // desktop uchun
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { ModeToggle } from "./ui/mode-toggle";

interface OperationsItem {
	title: string;
	description: string;
}

const links = [
	"/operations/genital",
	"/operations/urology",
	"/operations/plastic",
];

const languages = [
	{ code: "ru", label: "Русский", flag: "https://flagcdn.com/w160/ru.png" },
	{ code: "uz", label: "O'zbekcha", flag: "https://flagcdn.com/w160/uz.png" },
	{ code: "en", label: "English", flag: "https://flagcdn.com/w160/us.png" },
];

export default function Navigation() {
	const { t } = useTranslation(["navigation", "home"]);
	const { i18n } = useTranslation();

	const operations = t("home:ekspert.data", {
		returnObjects: true,
	}) as OperationsItem[];

	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openDropdowns, setOpenDropdowns] = useState<{
		operations?: boolean;
		theme?: boolean;
		language?: boolean;
	}>({});

	const { theme, setTheme } = useTheme();

	// Header balandligini dinamik o'lchash uchun
	const headerRef = useRef<HTMLDivElement>(null);
	const [headerHeight, setHeaderHeight] = useState(80); // boshlang'ich taxmin

	const toggleDropdown = (key: "operations" | "theme" | "language") => {
		setOpenDropdowns((prev) => ({
			...prev,
			[key]: !prev[key],
			// faqat bitta dropdown ochiq bo'lsin (ixtiyoriy)
			...(key !== "operations" && { operations: false }),
			...(key !== "theme" && { theme: false }),
			...(key !== "language" && { language: false }),
		}));
	};

	// Scroll holatini kuzatish
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Header balandligini yangilash (scroll, resize, theme o'zgarishi)
	useEffect(() => {
		const updateHeight = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}
		};

		updateHeight();
		window.addEventListener("resize", updateHeight);

		// Scroll va theme o'zgarishi ham balandlikni o'zgartirishi mumkin
		window.addEventListener("scroll", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
			window.removeEventListener("scroll", updateHeight);
		};
	}, [isScrolled, theme]);

	// Mobil menyu ochiq bo'lganda body scroll ni bloklash
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

	// Ekranni kengaytirganda mobil menyuni yopish
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			{/* Header */}
			<header
				ref={headerRef}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-background/95 backdrop-blur-md border-b shadow-md py-3 md:py-4"
						: "bg-background py-5 md:py-7"
				}`}
			>
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center">
						{/* Logo */}
						<Logo />

						{/* Desktop Navigation */}
						<div className="hidden lg:flex gap-8 items-center">
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link to="/">{t("menu.home")}</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link to="/about">{t("menu.about")}</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuTrigger>
											{t("menu.operations")}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-1">
												{operations.map((operation, index) => (
													<ListItem
														key={operation.title}
														title={operation.title}
														to={links[index]}
													>
														{operation.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link to="/cases">{t("menu.cases")}</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>

									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className={navigationMenuTriggerStyle()}
										>
											<Link to="/contact">{t("menu.contacts")}</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>

						{/* Right Side Actions (Desktop) */}
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								className="hidden md:flex h-10 bg-transparent hover:bg-blue-500/10 px-5 border rounded-full items-center gap-2 transition-colors"
							>
								<a href="tel:+998950047777" className="flex items-center gap-2">
									<Smartphone className="h-4 w-4" />
									<span className="text-sm font-medium">
										+998 (95) 004-77-77
									</span>
								</a>
							</Button>

							<div className="hidden lg:flex items-center gap-3">
								<ModeToggle />
								<LanguageToggle />
							</div>

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay (fonni qoraytirish) */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-[99998] lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu - dinamik top va height */}
			<div
				className={`fixed inset-x-0 bg-background z-[99999] transition-all duration-300 ease-in-out lg:hidden overflow-y-auto ${
					isMobileMenuOpen
						? "translate-y-0 opacity-100"
						: "translate-y-full opacity-0"
				}`}
				style={{
					top: `${headerHeight}px`,
					height: `calc(100vh - ${headerHeight}px)`,
				}}
			>
				<nav className="h-full">
					<div className="container mx-auto px-4 py-8">
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{t("menu.home")}
								</Link>
							</li>

							<li>
								<Link
									to="/about"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{t("menu.about")}
								</Link>
							</li>

							{/* Operations Dropdown */}
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

							<li>
								<Link
									to="/cases"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{t("menu.cases")}
								</Link>
							</li>

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

						{/* Phone, Theme, Language */}
						<div className="mt-8 pt-8 border-t space-y-4">
							<a
								href="tel:+998950047777"
								className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-accent transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<Smartphone className="h-5 w-5" />
								<span className="font-medium">+998 (95) 004-77-77</span>
							</a>

							{/* Theme */}
							<Collapsible
								open={openDropdowns.theme}
								onOpenChange={() => toggleDropdown("theme")}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium">
									<div className="flex items-center gap-3">
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
										className="flex items-center gap-3 w-full py-2 px-4 rounded-md hover:bg-accent text-sm"
									>
										<Sun className="h-4 w-4" /> {t("menu.light")}
									</button>
									<button
										onClick={() => {
											setTheme("dark");
											setIsMobileMenuOpen(false);
										}}
										className="flex items-center gap-3 w-full py-2 px-4 rounded-md hover:bg-accent text-sm"
									>
										<Moon className="h-4 w-4" /> {t("menu.dark")}
									</button>
									<button
										onClick={() => {
											setTheme("system");
											setIsMobileMenuOpen(false);
										}}
										className="flex items-center gap-3 w-full py-2 px-4 rounded-md hover:bg-accent text-sm"
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
										{t("menu.system")}
									</button>
								</CollapsibleContent>
							</Collapsible>

							{/* Language */}
							<Collapsible
								open={openDropdowns.language}
								onOpenChange={() => toggleDropdown("language")}
							>
								<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium">
									<div className="flex items-center gap-3">
										<Globe className="h-5 w-5" />
										<span>{t("menu.language")}</span>
									</div>
									<ChevronDown
										className={`h-4 w-4 transition-transform ${
											openDropdowns.language ? "rotate-180" : ""
										}`}
									/>
								</CollapsibleTrigger>
								<CollapsibleContent className="ml-4 mt-2 space-y-2">
									{languages.map((lang) => (
										<button
											key={lang.code}
											onClick={() => {
												i18n.changeLanguage(lang.code);
												setIsMobileMenuOpen(false);
											}}
											className="flex items-center justify-between w-full py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
										>
											<div className="flex items-center gap-3">
												<div className="w-6 h-6 rounded-full overflow-hidden border border-border">
													<img
														src={lang.flag}
														alt={lang.label}
														className="w-full h-full object-cover"
													/>
												</div>
												<span>{lang.label}</span>
											</div>
											{i18n.language.startsWith(lang.code) && (
												<span className="text-primary font-bold">✓</span>
											)}
										</button>
									))}
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

// Desktop dropdown uchun ListItem
function ListItem({
	title,
	children,
	to,
}: {
	title: string;
	children: React.ReactNode;
	to: string;
}) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to={to}
					className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
