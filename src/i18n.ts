import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const DEFAULT_LANGUAGE = "ru";

// localStorage'da til yo‘q bo‘lsa, avtomatik 'ru' ni saqlaymiz
const savedLanguage = localStorage.getItem("i18nextLng");
if (!savedLanguage) {
	localStorage.setItem("i18nextLng", DEFAULT_LANGUAGE);
}

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: DEFAULT_LANGUAGE,
		supportedLngs: ["uz", "ru", "en"],
		load: "languageOnly",
		debug: false,

		ns: ["home", "about", "navigation"],
		defaultNS: "home",

		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},

		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},

		interpolation: {
			escapeValue: false,
		},

		react: {
			useSuspense: true,
		},
	});

export default i18n;
