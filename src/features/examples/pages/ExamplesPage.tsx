import SubHeader from "@/components/SubHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SlideList from "../components/SlideList";
import { gipospadiyaData, plasticData, urologiyaData } from "./data";

export default function ExamplesPage() {
	return (
		<div>
			<SubHeader
				title="Клинические примеры"
				data={[
					{ label: "Главная", path: "/" },
					{ label: "Клинические примеры", path: "/cases" },
				]}
			/>

			<div className=" py-10 md:py-15 lg:py-20 container px-3 mx-auto">
				<Tabs defaultValue="a" className="mx-auto h-full">
					{/* --- SCROLLABLE TABS WITH SHADOWS --- */}
					<div className="relative md:mb-6">
						{/* Left shadow */}
						<div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />

						{/* Right shadow */}
						<div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

						{/* Scrollable wrapper */}
						<div className="overflow-x-auto no-scrollbar">
							<TabsList className="flex whitespace-nowrap gap-2 px-2">
								<TabsTrigger className="p-4 md:text-xl" value="a">
									Гипоспадия
								</TabsTrigger>
								<TabsTrigger className="p-4 md:text-xl" value="b">
									Урология
								</TabsTrigger>
								<TabsTrigger className="p-4 md:text-xl" value="c">
									Эстетическая и пластическая хирургия
								</TabsTrigger>
							</TabsList>
						</div>
					</div>

					{/* --- CONTENT --- */}
					<TabsContent value="a">
						<SlideList slideData={gipospadiyaData} />
					</TabsContent>

					<TabsContent value="b">
						<SlideList slideData={urologiyaData} />
					</TabsContent>

					<TabsContent value="c">
						<SlideList slideData={plasticData} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
