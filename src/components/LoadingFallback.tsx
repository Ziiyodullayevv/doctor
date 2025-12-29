import { useTranslation } from "react-i18next";

export default function LoadingFallback() {
	const { t } = useTranslation("navigation");
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
				<p className="text-xl font-medium">{t("menu.loading")}</p>
			</div>
		</div>
	);
}
