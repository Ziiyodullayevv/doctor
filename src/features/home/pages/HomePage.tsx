import ReviewsCarousel from "../components/Carusel";
import DocInfo from "../components/DocInfo";
import Hero from "../components/Hero";
import ImageGroup from "../components/ImageGroup";
import Napravleniya from "../components/Napravleniya";
import { useTranslation } from "react-i18next";

export default function HomePage() {
	const { t } = useTranslation("home");
	const metaData = {
		title: `Urokids.uz - ${t("docInfo.fullName")} (${t("docInfo.job")})`,
	};

	return (
		<>
			<title>{metaData.title}</title>

			<Hero />
			<Napravleniya />
			<DocInfo />
			<ImageGroup />
			<ReviewsCarousel />
		</>
	);
}
