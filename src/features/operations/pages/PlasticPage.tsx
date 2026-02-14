import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useTranslation } from "react-i18next";
import { CONFIG } from "../../../../global-config";

interface Plastic {
	title: string;
	description: string;
}

export default function PlasticPage() {
	const { t, i18n } = useTranslation(["operations", "navigation"]);
	const data = t("plastic.data", { returnObjects: true }) as Plastic[];
	const metaData = {
		title: `${t("plastic.header")} - ${CONFIG.appName}`,
	};

	return (
		<>
			<title>{metaData.title}</title>

			<BreadcrumbJsonLd
				pagePath="/operations/plastic"
				pageName={t("plastic.header")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("navigation:menu.home"), path: "/" },
					{ name: t("plastic.header"), path: "/operations/plastic" },
				]}
			/>
			<SubHeader
				title={t("plastic.header")}
				data={[
					{ label: t("navigation:menu.home"), path: "/" },
					{ label: t("plastic.header"), path: "/plastic" },
				]}
			/>

			<MedicalProcedures
				title={t("plastic.title")}
				description={t("plastic.description")}
				procedures={data}
				imageUrl="/operations/2.jpg"
			/>

			<Appointment />
		</>
	);
}
