import { Link } from "react-router";
import { Button } from "@/components/ui/button"; // shadcn/ui yoki oddiy button

export default function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
			<div className="max-w-2xl text-center">
				{/* Tibbiy ilustratsiya (SVG yoki img) */}
				<div className="mb-8">
					<svg
						className="w-64 h-64 mx-auto text-blue-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
						<circle cx="12" cy="8" r="6" strokeWidth="1.5" />
						<path d="M12 12v4" strokeWidth="2" />
					</svg>
				</div>

				<h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
				<p className="text-2xl font-medium text-gray-700 mb-4">
					Sahifa topilmadi
				</p>
				<p className="text-lg text-gray-600 mb-10">
					Izlagan sahifangiz mavjud emas yoki ko'chirilgan bo'lishi mumkin.
					Bizning shifokorlar jamoasi sizga yordam berishga tayyor!
				</p>

				<Link to="/">
					<Button
						size="lg"
						className="bg-blue-600 hover:bg-blue-700 text-white"
					>
						Bosh sahifaga qaytish
					</Button>
				</Link>
			</div>
		</div>
	);
}
