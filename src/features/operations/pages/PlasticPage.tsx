import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import { useTranslation } from "react-i18next";
import { CONFIG } from "../../../../global-config";

interface Plastic {
	title: string;
	description: string;
}

export default function PlasticPage() {
	const { t } = useTranslation(["operations", "navigation"]);
	const data = t("plastic.data", { returnObjects: true }) as Plastic[];
	const metaData = {
		title: `${t("plastic.header")} - ${CONFIG.appName}`,
	};

	return (
		<div>
			<title>{metaData.title}</title>
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
				imageUrl="https://cevrehastanesi.com.tr/upload/galeri/general_surgery_in_turkey_doctors_20250120142930.jpg"
			/>

			<Appointment />
		</div>
	);
}
