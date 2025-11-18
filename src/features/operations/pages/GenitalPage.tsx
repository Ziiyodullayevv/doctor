import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";

export default function GenitalPage() {
	return (
		<div>
			<SubHeader
				title="Генитальная хирургия"
				data={[
					{ label: "Главная", path: "/" },
					{ label: "Генитальная хирургия", path: "/genital" },
				]}
			/>
			<MedicalProcedures
				procedures={demoData}
				imageUrl="https://img.freepik.com/premium-photo/group-doctors-surgery-medicine-surgical-procedure-start-with-ppe-team-theatre-hospital-medical-operation-health-insurance-safety-gear-with-surgeon-people-healthcare_590464-184655.jpg"
			/>
			<Appointment />
		</div>
	);
}

const demoData = [
	{
		condition:
			"Гипоспадия любой сложности, в том числе при осложнениях после неудачных операций",
		treatment:
			"Применение современных и надежных методов пластики уретры и полового члена.",
		category: "Уретропластика",
	},
	{
		condition: "Эписпадия",
		treatment: "Пластика уретры и полового члена.",
		category: "Уретропластика",
	},
	{
		condition: "Стриктура уретры",
		treatment:
			"Анастомотическая уретропластика (иссечение сужения), уретропластика с применением слизистой рта.",
		category: "Уретропластика",
	},
	{
		condition: "Аномалии мошонки",
		treatment: "Пластика мошонки.",
		category: "Пластика",
	},
	{
		condition: "Искривление полового члена",
		treatment: "Коррекция искривления.",
		category: "Коррекция",
	},
	{
		condition: "Скрытый половой член",
		treatment:
			"Выведение и фиксация полового члена, удаление надлобковой жировой клетчатки.",
		category: "Реконструкция",
	},
	{
		condition: "Скрытый половой член после обрезания крайней плоти",
		treatment: "Замещение дефицита кожи.",
		category: "Реконструкция",
	},
	{
		condition:
			"Врожденная дисфункция коры надпочечника у девочек (урогенитальный синус и гипертрофия клитора)",
		treatment: "Восстановление половых органов по женскому типу.",
		category: "Реконструкция",
	},
	{
		condition: "Гипертрофия малых половых губ у девочек",
		treatment: "Резекция (уменьшение) малых половых губ.",
		category: "Пластика",
	},
];
