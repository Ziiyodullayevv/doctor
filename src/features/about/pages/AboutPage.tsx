import Appointment from "@/components/Appointment";
import SubHeader from "@/components/SubHeader";
import { Award, GraduationCap, Stethoscope, Globe } from "lucide-react";

export default function AboutPage() {
	return (
		<>
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
				{/* Hero Section */}
				<SubHeader
					data={[
						{ label: "Главная", path: "/" },
						{ label: "Обо мне", path: "/about" },
					]}
					title={"Генитальная хирургия"}
				/>
				<section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800">
					<div className="absolute inset-0 bg-black/10"></div>
					<div className="container mx-auto px-4 md:px-10 relative z-10">
						<div className="max-w-4xl mx-auto text-center text-white">
							<p className="text-sm md:text-base uppercase tracking-wider mb-3 opacity-90">
								Доктор медицинских наук
							</p>
							<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
								Абдуллаев Зафар Бобирович
							</h1>
							<div className="w-20 h-1 bg-white mx-auto mb-6"></div>
							<p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
								Провожу операции в Bolalar Miliy Tibbiyot Markazi г. Ташкент
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
									18+
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									лет опыта
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
									<Stethoscope className="w-8 h-8 text-green-600 dark:text-green-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									1000+
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									операций
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
									<GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									10+
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									стажировок
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
									<Globe className="w-8 h-8 text-orange-600 dark:text-orange-400" />
								</div>
								<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
									ESPU
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									член общества
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
									<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
										Пластический хирург, детский уролог-андролог, специалист по
										лечению гипоспадии. Реконструктивная и пластическая
										хирургия. Врач высшей квалификационной категории. Кандидат
										медицинских наук. Член Европейского общества детских
										урологов (ESPU). Реконструктивная и пластическая хирургия у
										взрослых и детей.
									</p>

									<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 my-8">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Образование
										</h3>
										<p className="text-gray-700 dark:text-gray-300">
											В 2006 году с отличием окончил Кемеровскую государственную
											медицинскую академию. Награжден стипендией правительства
											РФ.
										</p>
									</div>

									<p className="text-gray-700 dark:text-gray-300">
										С 2006 по 2008 годы проходил клиническую ординатуру по
										специальности «детская хирургия» на кафедре детских
										хирургических болезней Кемеровской государственной
										медицинской академии.
									</p>

									<p className="text-gray-700 dark:text-gray-300">
										По окончании ординатуры принят на должность врача детского
										хирурга в отделение детской урологии Областной детской
										клинической больницы г. Кемерово.
									</p>

									<p className="text-gray-700 dark:text-gray-300">
										В 2009 году прошел профессиональную переподготовку по
										специальности – «детская урология-андрология», а также курс
										повышения квалификации «лапароскопическая хирургия» на
										кафедре детской хирургии РНИМУ имени Н.И. Пирогова.
									</p>

									<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8 my-8">
										<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
											Международные стажировки
										</h3>
										<ul className="space-y-4">
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Shaare Zedek Medical Center, Израиль (2011)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Курс по взрослой и детской урологии. Руководитель –
														профессор Boris Chertin
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														НИИ урологии, Москва (2012)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Курс по практической уродинамике и нейроурологии
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Belmedic Clinic, Сербия (2012)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Генито-уретральная реконструктивная хирургия.
														Руководитель – Rados Djinovic
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Ospedale Maggiore Policlinico, Италия (2014)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Реконструктивная детская урология. Руководитель –
														профессор Gianantonio Manzoni
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Krankenhaus der Barmherzigen Schwestern, Австрия
														(2014)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Реконструктивная детская урология. Руководитель –
														профессор Josef Oswald
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Great Ormond Street Hospital, Великобритания (2016)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Руководители – профессор Abraham Cherian и профессор
														Peter Cuckow
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Robert-Debre Hospital, Франция (2018)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Руководитель – профессор Alaa El-Ghoneimi
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														Sidra Medicine Hospital, Катар (2019)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Руководитель – профессор Joao Luiz Pippi Salle
													</p>
												</div>
											</li>
											<li className="flex gap-4">
												<span className="flex-shrink-0 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
												<div>
													<p className="font-semibold text-gray-900 dark:text-white mb-1">
														First Affiliated Hospital, Китай (2025)
													</p>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														Малоинвазивное лечение мочекаменной болезни.
														Руководитель – профессор Zeng Guohua
													</p>
												</div>
											</li>
										</ul>
									</div>

									<div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 my-8">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Награды и достижения
										</h3>
										<p className="text-gray-700 dark:text-gray-300">
											За достижения в работе награжден грамотой администрации г.
											Кемерово, медалью «За служение Кузбассу», знаком отличия
											«Золотой знак Кузбасс».
										</p>
									</div>

									<p className="text-gray-700 dark:text-gray-300">
										В 2020 г защитил диссертацию на соискание научной степени
										кандидата медицинских наук на тему «Хирургическое лечение
										срединных и проксимальных форм гипоспадии у детей с
										сохранением уретральной площадки».
									</p>
								</div>
							</div>

							{/* Sidebar with Images */}
							<div className="lg:col-span-1 space-y-6">
								<div className="sticky top-24 space-y-6">
									<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
										<img
											className="w-full h-80 object-cover"
											src="https://globalnews.ca/wp-content/uploads/2019/06/operation.jpg?quality=65&strip=all"
											alt="Доктор Абдуллаев Зафар Бобирович"
										/>
										<div className="p-4">
											<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
												Доктор Абдуллаев Зафар Бобирович
											</p>
										</div>
									</div>

									<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
										<img
											className="w-full h-80 object-cover"
											src="https://media.cnn.com/api/v1/images/stellar/prod/150202113458-surgeons-hospital-angers.jpg?q=w_4256,h_2832,x_0,y_0,c_fill"
											alt="Доктор Абдуллаев Зафар Бобирович"
										/>
										<div className="p-4">
											<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
												Во время консультации
											</p>
										</div>
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
