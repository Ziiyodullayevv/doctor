import ImageCarousel from "./ImageCarusel";
export interface SlideDataProps {
	slideData: {
		id: string;
		title: string;
		description: string;
		urlList: string[];
	}[];
}

export default function SlideList({ slideData }: SlideDataProps) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 py-5 gap-7">
			{slideData.map((data) => (
				<div>
					<ImageCarousel caruselData={data} />{" "}
				</div>
			))}
		</div>
	);
}
