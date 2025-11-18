import SubHeader from "@/components/SubHeader";
import MedicalProcedures from "../components/OperationList";
import Appointment from "@/components/Appointment";

export default function UrologyPage() {
	return (
		<div>
			<SubHeader
				title="Урология"
				data={[
					{ label: "Главная", path: "/" },
					{ label: "Урология", path: "/urology" },
				]}
			/>

			<MedicalProcedures
				procedures={laparoscopicData}
				imageUrl="https://classroomclipart.com/image/static7/preview2/photo-medical-doctor-performing-surgery-63417.jpg"
			/>

			<Appointment />
		</div>
	);
}

const laparoscopicData = [
	{
		condition: "Гидронефроз",
		treatment:
			"Лапароскопическая пиелопластика (иссечение суженного участка мочеточника).",
		category: "Лапароскопия",
	},
	{
		condition: "Обструктивный мегауретер",
		treatment:
			"Лапароскопическая реимплантация мочеточника (иссечение суженного участка мочеточника).",
		category: "Лапароскопия",
	},
	{
		condition: "Пузырно-мочеточниковый рефлюкс",
		treatment:
			"Лапароскопическая и пневмовезикоскопическая реимплантация мочеточника (создание механизма, препятствующего рефлюксу).",
		category: "Лапароскопия",
	},
	{
		condition: "Нефункционирующая почка",
		treatment: "Лапароскопическое удаление почки.",
		category: "Лапароскопия",
	},
	{
		condition: "Камни мочеточника",
		treatment:
			"Уретероскопия и контактная литотрипсия (внутрипросветное разрушение камня с помощью лазера).",
		category: "Эндоскопия",
	},
	{
		condition: "Камни почек",
		treatment:
			"Дистанционная литотрипсия (разрушение камня ультразвуковой волной без разрезов).",
		category: "Литотрипсия",
	},
	{
		condition: "Крупные и плотные камни почек",
		treatment:
			"Перкутанная нефролитотрипсия (разрушение камней через прокол в поясничной области).",
		category: "Нефролитотрипсия",
	},
	{
		condition: "Камни в почке",
		treatment:
			"Ретроградная интраренальная хирургия (разрушение камня через естественные пути с помощью гибких эндоскопов, без разрезов).",
		category: "Эндоскопия",
	},
];
