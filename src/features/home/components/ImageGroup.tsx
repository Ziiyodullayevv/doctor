import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";

const GALLERY_IDS = [
	1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
	24, 25, 27, 28, 29, 30, 31, 32, 33, 34,
];

const ITEM_DATA = GALLERY_IDS.map((id) => ({
	preview: `/home/thumbs-small/image${id}.jpg`,
	full: `/home/thumbs/image${id}.webp`,
}));

const EAGER_COUNT = 2;

export default function ImageGallery() {

	useEffect(() => {
		Fancybox.bind("[data-fancybox]", {
			Carousel: {
				formatCaption: (carouselRef, slide) => {
					return `${slide.index + 1} of ${
						carouselRef.getSlides().length
					}<br /> ${slide.caption || ""}`;
				},
			},
		});

		return () => Fancybox.destroy();
	}, []);

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
				{ITEM_DATA.map((item, i) => (
					<a
						key={i}
						href={item.full}
						data-fancybox="gallery"
						className="relative block overflow-hidden aspect-square group"
					>
						<img
							src={item.preview}
							loading={i < EAGER_COUNT ? "eager" : "lazy"}
							decoding="async"
							fetchPriority={i < EAGER_COUNT ? "high" : "low"}
							onError={(event) => {
								event.currentTarget.src = item.full;
							}}
							alt={`Image ${i + 1}`}
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>

						{/* Hover overlay */}
						<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
					</a>
				))}
			</div>
		</div>
	);
}
