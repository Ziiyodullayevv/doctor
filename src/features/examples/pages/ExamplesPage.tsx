import SubHeader from "@/components/SubHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SlideList from "../components/SlideList";
import { getUrologiyaData } from "./data";
import { CONFIG } from "../../../../global-config";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function ExamplesPage() {
	const { t, i18n } = useTranslation("navigation");
	const slideData = useMemo(
		() => getUrologiyaData(i18n.resolvedLanguage),
		[i18n.resolvedLanguage],
	);
	const metaData = {
		title: `${t("menu.cases")} - ${CONFIG.appName}`,
	};

	return (
		<div>
			<title>{metaData.title}</title>
			<BreadcrumbJsonLd
				pagePath="/cases"
				pageName={t("menu.cases")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("menu.home"), path: "/" },
					{ name: t("menu.cases"), path: "/cases" },
				]}
			/>

			<SubHeader
				title={t("menu.cases")}
				data={[
					{ label: t("menu.home"), path: "/" },
					{ label: t("menu.cases"), path: "/cases" },
				]}
			/>

			<div className=" py-10 md:py-15 container px-3 mx-auto">
				<SlideList slideData={slideData} />
			</div>
		</div>
	);
}
