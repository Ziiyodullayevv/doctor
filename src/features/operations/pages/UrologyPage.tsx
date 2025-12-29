import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import { useTranslation } from "react-i18next";

interface Urology {
	title: string;
	description: string;
}

export default function UrologyPage() {
	const { t } = useTranslation(["operations", "navigation"]); // operations va navigation namespace-larini ishlatish
	const data = t("urology.data", { returnObjects: true }) as Urology[];
	return (
		<div>
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
				imageUrl="https://classroomclipart.com/image/static7/preview2/photo-medical-doctor-performing-surgery-63417.jpg"
			/>

			<Appointment />
		</div>
	);
}
