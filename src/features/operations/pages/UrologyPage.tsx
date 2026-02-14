import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useTranslation } from "react-i18next";
import { CONFIG } from "../../../../global-config";

interface Urology {
	title: string;
	description: string;
}

export default function UrologyPage() {
	const { t, i18n } = useTranslation(["operations", "navigation"]); // operations va navigation namespace-larini ishlatish
	const data = t("urology.data", { returnObjects: true }) as Urology[];
	const metaData = {
		title: `${t("urology.header")} - ${CONFIG.appName}`,
	};

	return (
		<>
			<title>{metaData.title}</title>

			<BreadcrumbJsonLd
				pagePath="/operations/urology"
				pageName={t("urology.header")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("navigation:menu.home"), path: "/" },
					{ name: t("urology.header"), path: "/operations/urology" },
				]}
			/>
			<SubHeader
				title={t("urology.header")}
				data={[
					{ label: t("navigation:menu.home"), path: "/" },
					{ label: t("urology.header"), path: "/urology" },
				]}
			/>

			<MedicalProcedures
				title={t("urology.title")}
				description={t("urology.description")}
				procedures={data}
				imageUrl="/operations/3.jpg"
			/>

			<Appointment />
		</>
	);
}
