import { useEffect } from "react";
import { useLocation } from "react-router";

const SITE_URL = "https://www.urokids.uz";

const CANONICAL_ALIASES: Record<string, string> = {
	"/urology": "/operations/urology",
	"/genetal-surgery": "/operations/genital",
	"/plastic-surgery": "/operations/plastic",
	"/genital": "/operations/genital",
	"/plastic": "/operations/plastic",
};

const getCanonicalPath = (pathname: string) =>
	CANONICAL_ALIASES[pathname] ?? pathname;

const toCanonicalUrl = (pathname: string) => {
	const canonicalPath = getCanonicalPath(pathname);
	if (canonicalPath === "/") return `${SITE_URL}/`;
	return `${SITE_URL}${canonicalPath.replace(/\/+$/, "")}`;
};

const upsertCanonicalLink = (href: string) => {
	let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
	if (!link) {
		link = document.createElement("link");
		link.setAttribute("rel", "canonical");
		document.head.appendChild(link);
	}
	link.setAttribute("href", href);
};

const upsertMeta = (
	query: string,
	attribute: "property" | "name",
	key: string,
	content: string,
) => {
	let meta = document.querySelector<HTMLMetaElement>(query);
	if (!meta) {
		meta = document.createElement("meta");
		meta.setAttribute(attribute, key);
		document.head.appendChild(meta);
	}
	meta.setAttribute("content", content);
};

export default function CanonicalUrl() {
	const location = useLocation();

	useEffect(() => {
		const canonicalUrl = toCanonicalUrl(location.pathname);
		upsertCanonicalLink(canonicalUrl);
		upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
		upsertMeta(
			'meta[name="twitter:url"], meta[property="twitter:url"]',
			"name",
			"twitter:url",
			canonicalUrl,
		);
	}, [location.pathname]);

	return null;
}
