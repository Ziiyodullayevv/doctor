import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";

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
				{itemData.map((item, i) => (
					<a
						key={i}
						href={item.img}
						data-fancybox="gallery"
						className="relative block overflow-hidden aspect-square group"
					>
						<img
							src={item.img}
							loading="lazy"
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

const itemData = [
	{ img: "/home/thumbs/image1.webp" },
	{ img: "/home/thumbs/image2.webp" },
	{ img: "/home/thumbs/image3.webp" },
	// { img: "/home/thumbs/image4.webp" },
	{ img: "/home/thumbs/image5.webp" },
	{ img: "/home/thumbs/image6.webp" },
	{ img: "/home/thumbs/image7.webp" },
	{ img: "/home/thumbs/image8.webp" },
	{ img: "/home/thumbs/image9.webp" },
	{ img: "/home/thumbs/image10.webp" },
	{ img: "/home/thumbs/image11.webp" },
	{ img: "/home/thumbs/image12.webp" },
	// { img: "/home/thumbs/image13.webp" },
	{ img: "/home/thumbs/image14.webp" },
	{ img: "/home/thumbs/image15.webp" },
	{ img: "/home/thumbs/image16.webp" },
	{ img: "/home/thumbs/image17.webp" },
	{ img: "/home/thumbs/image18.webp" },
	{ img: "/home/thumbs/image19.webp" },
	{ img: "/home/thumbs/image20.webp" },
	{ img: "/home/thumbs/image21.webp" },
	{ img: "/home/thumbs/image22.webp" },
	{ img: "/home/thumbs/image23.webp" },
	{ img: "/home/thumbs/image24.webp" },
	{ img: "/home/thumbs/image25.webp" },
	{ img: "/home/thumbs/image26.webp" },
	{ img: "/home/thumbs/image27.webp" },
	{ img: "/home/thumbs/image28.webp" },
	{ img: "/home/thumbs/image29.webp" },
	{ img: "/home/thumbs/image30.webp" },
	{ img: "/home/thumbs/image31.webp" },
	{ img: "/home/thumbs/image32.webp" },
	{ img: "/home/thumbs/image33.webp" },
	{ img: "/home/thumbs/image34.webp" },
];
