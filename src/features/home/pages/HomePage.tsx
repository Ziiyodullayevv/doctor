import ReviewsCarousel from "../components/Carusel";
import DocInfo from "../components/DocInfo";
import Hero from "../components/Hero";
import ImageGroup from "../components/ImageGroup";
import Napravleniya from "../components/Napravleniya";
import { CONFIG } from "../../../../global-config";
import { useTranslation } from "react-i18next";

export default function HomePage() {
	const { t } = useTranslation("navigation");
	const metaData = {
		title: `${t("menu.home")} - ${CONFIG.appName}`,
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
