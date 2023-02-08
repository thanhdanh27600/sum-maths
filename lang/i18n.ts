import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import EnglishTranslation from "./en.json";
import VietnameseTranslation from "./vi.json";

i18n
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: process.env.NODE_ENV !== "production",
		fallbackLng: "vi",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		lng: "vi",
		resources: {
			en: {
				common: EnglishTranslation,
			},
			vi: {
				common: VietnameseTranslation,
			},
		},
	});

export default i18n;

export const Language = {
	vi: "Tiếng Việt",
	en: "English",
};

export type Language = keyof typeof Language;
