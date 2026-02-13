import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Procedure {
	title: string;
	description: string;
}

interface MedicalProceduresProps {
	title?: string;
	description?: string;
	procedures: Procedure[];
	imageUrl?: string;
}

export default function MedicalProcedures({
	title = "Реконструктивно-пластические операции на наружных половых органах у детей",
	description = "Применение современных и надежных методов пластики",
	procedures = [],
	imageUrl,
}: MedicalProceduresProps) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<Card className="border-none shadow-xl bg-white/80 backdrop-blur">
							<CardHeader className="space-y-1 pb-6">
								<CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
									{title}
								</CardTitle>
								<CardDescription className="text-base text-slate-600">
									{description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{procedures.map((procedure, index) => (
										<div
											key={index}
											className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-300"
										>
											<div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

											<div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
												<div className="md:col-span-2">
													<div className="flex items-start gap-2">
														<div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
														<p className="text-sm font-semibold text-slate-800 leading-relaxed">
															{procedure.title}
														</p>
													</div>
												</div>

												<div className="md:col-span-3">
													<p className="text-sm text-slate-600 leading-relaxed pl-3.5 md:pl-0">
														{procedure.description}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar with Image */}
					<div className="lg:col-span-1">
						<div className="border-none rounded-2xl shadow-xl bg-white/80 backdrop-blur overflow-hidden sticky top-8">
							{imageUrl ? (
								<div className="h-[500px]">
									<img
										src={imageUrl}
										alt="Medical procedure"
										loading="lazy"
										decoding="async"
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
									<div className="text-center p-6">
										<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
											<svg
												className="w-8 h-8 text-blue-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
										</div>
										<p className="text-sm text-slate-600">
											Медицинская процедура
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
