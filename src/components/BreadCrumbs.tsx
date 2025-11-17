import { SlashIcon } from "lucide-react";
import { Link } from "react-router";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadCrumItem = {
	label: string;
	path: string;
}[];

export type BreadCrumb = {
	items: BreadCrumItem;
};

export function DynamicBreadcrumb({ items }: BreadCrumb) {
	return (
		<Breadcrumb className="text-white">
			<BreadcrumbList>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<div key={index} className="flex items-center">
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage className="text-white hover:text-white">
										{item.label}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink
										className="text-white/50 hover:text-white"
										asChild
									>
										<Link to={item.path}>{item.label}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>

							{!isLast && (
								<BreadcrumbSeparator className="text-white ml-3 hoer:text-white">
									<SlashIcon />
								</BreadcrumbSeparator>
							)}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
