import Appointment from "@/components/Appointment";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SubHeader from "@/components/SubHeader";
import { Award, GraduationCap, Stethoscope, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Memberships {
	period: string;
	organization: string;
	abbreviation: string;
	position?: string;
}

interface Internships {
	year: string;
	details: string[];
}

interface Experience {
	year: string;
	description: string;
}

import { CONFIG } from "../../../../global-config";

export default function AboutPage() {
	const { t, i18n } = useTranslation(["about", "navigation"]);

	const memberships = t("memberships.items", {
		returnObjects: true,
	}) as Memberships[];

	const internships = t("internships.data", {
		returnObjects: true,
	}) as Internships[];

	const experience = t("experience.positions", {
		returnObjects: true,
	}) as Experience[];

	const metaData = {
		title: `${t("header.title")} - ${CONFIG.appName}`,
	};

	return (
		<>
			<title>{metaData.title}</title>
			<BreadcrumbJsonLd
				pagePath="/about"
				pageName={t("header.title")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("navigation:menu.home"), path: "/" },
					{ name: t("header.supTitle"), path: "/about" },
				]}
			/>

			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
				{/* Hero Section */}
				<SubHeader
					data={[
						{ label: `${t("navigation:menu.home")}`, path: "/" },
						{ label: `${t("header.supTitle")}`, path: "/about" },
					]}
					title={`${t("header.title")}`}
				/>
				<section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800">
					<div className="absolute inset-0 bg-black/10"></div>
					<div className="container mx-auto px-4 md:px-10 relative z-10">
						<div className="max-w-4xl mx-auto text-center text-white">
							<p className="text-sm md:text-base uppercase tracking-wider mb-3 opacity-90">
								{t("header.supTitle")}
							</p>
							<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
								{t("header.fullName")}
							</h1>
							<div className="w-20 h-1 bg-white mx-auto mb-6"></div>
							<p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
								{t("header.aboutMe")}
							</p>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-12 md:py-16 border-b dark:border-gray-700">
					<div className="container mx-auto px-4 md:px-10">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
									<Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									10
								</p>
								<p className="text-sm capitalize text-gray-600 dark:text-gray-400">
									{t("tabs.experience")}
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
									<Stethoscope className="w-8 h-8 text-green-600 dark:text-green-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									3000+
								</p>
								<p className="text-sm capitalize text-gray-600 dark:text-gray-400">
									{t("tabs.operations")}
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
									<GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									20+
								</p>
								<p className="text-sm capitalize text-gray-600 dark:text-gray-400">
									{t("tabs.internships")}
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
									<BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									30+
								</p>
								<p className="text-sm capitalize text-gray-600 dark:text-gray-400">
									{t("tabs.publications")}
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Main Content */}
				<section className="py-12 md:py-20">
					<div className="container mx-auto px-4 md:px-10">
						<div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
							{/* Text Content */}
							<div className="lg:col-span-2 space-y-6">
								<div className="prose prose-lg dark:prose-invert max-w-none">
									<h4 className="font-bold">{t("title")}</h4>
									<br />
									<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
										{t("education.university")}
									</p>

									<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8 my-8">
										<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
											{t("memberships.title")}
										</h3>
										<ul className="space-y-4">
											{memberships.map((item: Memberships) => (
												<li className="flex gap-4">
													<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
													<div>
														<p className="font-semibold text-gray-900 dark:text-white mb-1">
															{item.period}
														</p>
														<p className="text-sm text-gray-600 dark:text-gray-400">
															{item.organization} ({item.abbreviation})
															{item.position ? ` — ${item.position}` : ""}
														</p>
													</div>
												</li>
											))}
										</ul>

										{/* ------------------- */}

										<hr className="my-10" />

										<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
											{t("internships.title")}
										</h3>
										<ul className="space-y-4">
											{internships.map(({ details, year }: Internships) => (
												<li className="flex gap-4">
													<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
													<div>
														<p className="font-semibold text-gray-900 dark:text-white mb-1">
															{year}
														</p>

														{details.map((text, idx) => (
															<div key={idx}>
																<p className="text-sm text-gray-600 dark:text-gray-400">
																	{text} <br />
																	<br />
																</p>
															</div>
														))}
													</div>
												</li>
											))}
										</ul>

										<hr className="my-10" />

										<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
											{t("experience.title")}
										</h3>
										<div className="space-y-4">
											{experience.map(({ year, description }: Experience) => (
												<li className="flex gap-4">
													<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
													<div>
														<h2 className="font-semibold text-gray-900 dark:text-white mb-1">
															{year}
														</h2>
														<p className="text-sm text-gray-600 dark:text-gray-400">
															{description}
														</p>
													</div>
												</li>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Sidebar with Images */}
							<div className="lg:col-span-1 space-y-6">
								<div className="sticky top-24 space-y-6">
									<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
										<img
											className="w-full h-80 object-cover"
											src="/about/about1.jpg"
											alt={t("sidebar.doctor_photo_alt")}
											loading="lazy"
											decoding="async"
										/>
									</div>

									<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
										<img
											className="w-full h-80 object-cover"
											src="/about/about2.jpg"
											alt={t("sidebar.consultation_photo_alt")}
											loading="lazy"
											decoding="async"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<Appointment />
			</div>
		</>
	);
}
