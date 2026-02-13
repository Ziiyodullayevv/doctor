import ImageCarousel from "./ImageCarusel";
export interface SlideDataProps {
	slideData: {
		id: string;
		title: string;
		urlList: string[];
	}[];
}

export default function SlideList({ slideData }: SlideDataProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-5 gap-7">
			{slideData.map((data) => (
				<div key={data.id}>
					<ImageCarousel caruselData={data} />{" "}
				</div>
			))}
		</div>
	);
}
