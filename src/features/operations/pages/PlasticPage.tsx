import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";

export default function PlasticPage() {
	return (
		<div>
			<SubHeader
				title="Пластическая хирургия"
				data={[
					{ label: "Главная", path: "/" },
					{ label: "Пластическая хирургия", path: "/plastic" },
				]}
			/>

			<MedicalProcedures
				procedures={plasticSurgeryData}
				imageUrl="https://cevrehastanesi.com.tr/upload/galeri/general_surgery_in_turkey_doctors_20250120142930.jpg"
			/>

			<Appointment />
		</div>
	);
}

const plasticSurgeryData = [
	{
		condition: "Искривление полового члена у взрослых",
		treatment: "Коррекция искривления.",
		category: "Пластическая хирургия",
	},
	{
		condition: "Стриктура (сужение) уретры в области полового члена",
		treatment: "Пластика уретры различными методами.",
		category: "Пластическая хирургия",
	},
	{
		condition: "Гипоспадия у взрослых",
		treatment: "Пластика уретры.",
		category: "Пластическая хирургия",
	},
	{
		condition: "Осложнения гипоспадии у взрослых",
		treatment:
			"Пластика уретры и пластика кожи полового члена у мужчин, имеющих осложнения после операций по поводу гипоспадии в детском возрасте.",
		category: "Пластическая хирургия",
	},
	{
		condition: "Лопоухость",
		treatment: "Отопластика (коррекция ушных раковин) у взрослых и детей.",
		category: "Эстетическая хирургия",
	},
	{
		condition: "Возрастные изменения век",
		treatment: "Блефаропластика (пластика верхних и нижних век).",
		category: "Эстетическая хирургия",
	},
	{
		condition: "Локальные отложения жира на животе",
		treatment: "Абдоминопластика (подтяжка живота).",
		category: "Пластическая хирургия",
	},
	{
		condition: "Птоз лба и бровей",
		treatment: "Подтяжка лба и бровей (эндоскопически).",
		category: "Эстетическая хирургия",
	},
	{
		condition: "Птоз молочных желез",
		treatment: "Мастопексия (подтяжка груди).",
		category: "Эстетическая хирургия",
	},
	{
		condition: "Макромастия",
		treatment: "Редукционная маммопластика.",
		category: "Пластическая хирургия",
	},
	{
		condition: "Эстетические операции",
		treatment:
			"Увеличение груди, липосакция различных зон тела, пластика малых и больших половых губ.",
		category: "Эстетическая хирургия",
	},
];
