import { DynamicBreadcrumb, type BreadCrumItem } from "./BreadCrumbs";
type PropsType = {
	title: string;
	data: BreadCrumItem;
};

export default function SubHeader({ title, data }: PropsType) {
	return (
		<div className="bg-blue-600/10 bg-no-repeat bg-cover bg-[url('https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/06/30/16/surgery-0.jpg')] mt-16 py-30">
			<div className="container mx-auto px-3">
				<DynamicBreadcrumb items={data} />
				<h1 className="text-5xl mt-7 text-white">{title}</h1>
			</div>
		</div>
	);
}
