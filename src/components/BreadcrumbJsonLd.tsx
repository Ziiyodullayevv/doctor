type BreadcrumbItem = {
	name: string;
	path: string;
};

type BreadcrumbJsonLdProps = {
	pagePath: string;
	pageName: string;
	items: BreadcrumbItem[];
	language?: string;
};

const SITE_URL = "https://www.urokids.uz";

const toAbsoluteUrl = (path: string) => {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}

	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const toSchemaLanguage = (language?: string) => {
	if (language?.startsWith("uz")) return "uz-UZ";
	if (language?.startsWith("en")) return "en-US";
	return "ru-RU";
};

export default function BreadcrumbJsonLd({
	pagePath,
	pageName,
	items,
	language,
}: BreadcrumbJsonLdProps) {
	const pageUrl = toAbsoluteUrl(pagePath);
	const inLanguage = toSchemaLanguage(language);

	const ldJson = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${pageUrl}#webpage`,
				url: pageUrl,
				name: pageName,
				isPartOf: {
					"@id": `${SITE_URL}/#website`,
				},
				breadcrumb: {
					"@id": `${pageUrl}#breadcrumb`,
				},
				inLanguage,
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${pageUrl}#breadcrumb`,
				itemListElement: items.map((item, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: item.name,
					item: toAbsoluteUrl(item.path),
				})),
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
		/>
	);
}
