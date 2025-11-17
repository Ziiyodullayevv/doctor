"use client";

import { Link } from "react-router";
import { Smartphone, Menu, X, ChevronDown, Moon, Sun } from "lucide-react";

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
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/theme/useTheme";

const operations = [
	{
		title: "Генитальная хирургия",
		to: "/operations/genital",
		description:
			"Гипоспадия, эписпадия, стриктура уретры, искривление полового члена",
	},
	{
		title: "Урология",
		to: "/operations/urology",
		description: "Диагностика и лечение заболеваний мочевыводящей системы",
	},
	{
		title: "Пластическая хирургия",
		to: "/operations/plastic",
		description: "Реконструктивная и эстетическая пластическая хирургия",
	},
];

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	return (
		<header
			className={`fixed top-0 left-0 text-lg right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background backdrop-blur-md shadow-md py-5 md:py-7"
					: "bg-background py-4 md:py-6"
			}`}
		>
			<div className="container mx-auto px-3">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<Link to="/" className="flex items-center z-50">
						<span className="text-primary uppercase font-bold text-lg md:text-xl">
							Абдуллаев
						</span>
						<span className="text-blue-500 font-bold text-lg md:text-xl ml-1">
							З.Б.
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex gap-8 items-center">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link to="/about">Обо мне</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger>Операции</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
											{operations.map((operation) => (
												<ListItem
													key={operation.title}
													title={operation.title}
													to={operation.to}
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
										<Link to="/cases">Клинические примеры</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link to="/surgery-details">Хирургия в деталях</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link to="/contact">Контакты</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Right Side Actions */}
					<div className="flex items-center gap-4">
						<a
							href="tel:+998995476202"
							className="hidden md:flex items-center gap-2 hover:text-primary transition-colors"
						>
							<Smartphone className="h-4 w-4" />
							<span className="text-sm font-medium">+998 (99) 547-62-02</span>
						</a>
						<div className="hidden lg:block">
							<ModeToggle />
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
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

			{/* Mobile Menu */}
			<div
				className={`lg:hidden fixed inset-0 top-[60px] bg-background z-40 transition-transform duration-300 ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
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
									Обо мне
								</Link>
							</li>

							{/* Операции Dropdown */}
							<li>
								<Collapsible
									open={openDropdowns.operations}
									onOpenChange={() => toggleDropdown("operations")}
								>
									<CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium">
										<span>Операции</span>
										<ChevronDown
											className={`h-4 w-4 transition-transform ${
												openDropdowns.operations ? "rotate-180" : ""
											}`}
										/>
									</CollapsibleTrigger>
									<CollapsibleContent className="ml-4 mt-2 space-y-2">
										{operations.map((operation) => (
											<Link
												key={operation.title}
												to={operation.to}
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
									Клинические примеры
								</Link>
							</li>

							{/* Хирургия в деталях */}
							<li>
								<Link
									to="/surgery-details"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Хирургия в деталях
								</Link>
							</li>

							{/* Контакты */}
							<li>
								<Link
									to="/contact"
									className="block py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Контакты
								</Link>
							</li>
						</ul>

						{/* Phone and Theme Toggle */}
						<div className="mt-6 pt-6 border-t space-y-4">
							<a
								href="tel:+998995476202"
								className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-accent transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<Smartphone className="h-5 w-5" />
								<span className="font-medium">+998 (99) 547-62-02</span>
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
										<span>Тема</span>
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
										<span>Светлая</span>
									</button>
									<button
										onClick={() => {
											setTheme("dark");
											setIsMobileMenuOpen(false);
										}}
										className="flex items-center gap-2 w-full py-2 px-4 rounded-md hover:bg-accent transition-colors text-sm"
									>
										<Moon className="h-4 w-4" />
										<span>Темная</span>
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
										<span>Системная</span>
									</button>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}

function ListItem({
	title,
	children,
	to,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
	return (
		<li {...props}>
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
