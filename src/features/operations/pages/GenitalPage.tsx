import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useTranslation } from "react-i18next";
import { CONFIG } from "../../../../global-config";

interface Gental {
	title: string;
	description: string;
}

export default function GenitalPage() {
	const { t, i18n } = useTranslation(["operations", "navigation"]); // operations va navigation namespace-larini ishlatish
	const data = t("genetal.data", { returnObjects: true }) as Gental[];
	const metaData = {
		title: `${t("genetal.header")} - ${CONFIG.appName}`,
	};

	return (
		<div>
			<title>{metaData.title}</title>
			<BreadcrumbJsonLd
				pagePath="/operations/genital"
				pageName={t("genetal.header")}
				language={i18n.resolvedLanguage}
				items={[
					{ name: t("navigation:menu.home"), path: "/" },
					{ name: t("genetal.header"), path: "/operations/genital" },
				]}
			/>
			<SubHeader
				title={t("genetal.header")}
				data={[
					{ label: t("navigation:menu.home"), path: "/" },
					{ label: t("genetal.header"), path: "/genital" },
				]}
			/>
			<MedicalProcedures
				title={t("genetal.title")}
				description={t("genetal.description")}
				procedures={data}
				imageUrl="/public/operations/1.jpg"
			/>
			<Appointment />
		</div>
	);
}
