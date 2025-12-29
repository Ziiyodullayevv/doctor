import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";
import { useTranslation } from "react-i18next";

interface Gental {
	title: string;
	description: string;
}

export default function GenitalPage() {
	const { t } = useTranslation(["operations", "navigation"]); // operations va navigation namespace-larini ishlatish
	const data = t("genetal.data", { returnObjects: true }) as Gental[];
	return (
		<div>
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
				imageUrl="https://img.freepik.com/premium-photo/group-doctors-surgery-medicine-surgical-procedure-start-with-ppe-team-theatre-hospital-medical-operation-health-insurance-safety-gear-with-surgeon-people-healthcare_590464-184655.jpg"
			/>
			<Appointment />
		</div>
	);
}
