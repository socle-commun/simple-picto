import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/utilities/cn";

const locales: {
	[key: string]: string;
} = {
	"en": "English",
	"fr": "Français"
}

export default function LocaleSelector() {
	const { t, i18n } = useTranslation();

	const [locale, setLocale] = useState<string>(i18n.resolvedLanguage || "en");

	useEffect(() => {
		document.documentElement.setAttribute("lang", locale as string);
	}, [locale]);

	return (
		<>
			<label htmlFor="locale-selector" className={cn("text-2xl text-center")}>{t("pages.settings.language")}</label>
			<select
				name="locale-selector"
				id="locale-selector"
				className={cn("w-min flex mx-auto mt-auto p-2 border-2 border-zinc-400 dark:border-zinc-600 rounded-lg")}
				value={locale}
				onChange={(event: ChangeEvent<HTMLSelectElement>) => {
					setLocale(event.target.value as string);
					i18n.changeLanguage(event.target.value as string);
				}}>
				{i18n.languages.map((language) => (
					<option key={language} value={language} className={cn("bg-zinc-200 dark:bg-zinc-800")}>
						{/* <img src={"/locales/" + language + "/icon.svg"} alt={locales[language]} /> */}
						{/* <span>{locales[language]}</span> */}
						{locales[language]}
					</option>
				))}
			</select>
		</>
	);
}