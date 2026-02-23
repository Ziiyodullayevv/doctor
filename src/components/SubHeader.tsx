import { DynamicBreadcrumb, type BreadCrumItem } from "./BreadCrumbs";
type PropsType = {
	title: string;
	data: BreadCrumItem;
};

export default function SubHeader({ title, data }: PropsType) {
	return (
		<div className="bg-gradient-to-r from-[#131c2c] to-[#2b3f62] mt-16 py-30">
			<div className="container mx-auto px-3">
				<DynamicBreadcrumb items={data} />
				<h1 className="text-5xl mt-7 text-white">{title}</h1>
			</div>
		</div>
	);
}
