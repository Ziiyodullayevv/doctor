import ReviewsCarousel from "../components/Carusel";
import DocInfo from "../components/DocInfo";
import Hero from "../components/Hero";
import ImageGroup from "../components/ImageGroup";
import Napravleniya from "../components/Napravleniya";

export default function HomePage() {
	return (
		<div>
			<Hero />
			<Napravleniya />
			<DocInfo />
			<ImageGroup />
			<ReviewsCarousel />
		</div>
	);
}
