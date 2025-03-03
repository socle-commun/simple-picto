import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Select } from '@base-ui-components/react/select';

import Label from "@/lib/components/label";

import { cn } from "@/utilities/cn";

const locales: {
	[key: string]: string;
} = {
	"en-US": "English (USA)",
	"fr-FR": "Français (France)",
}

export default function LocaleSelector() {
	const { t, i18n } = useTranslation();

	const [locale, setLocale] = useState<string>(i18n.resolvedLanguage || "en");

	useEffect(() => {
		i18n.changeLanguage(locale);
		document.documentElement.setAttribute("lang", locale as string);
	}, [locale, i18n]);

	return (
		<>
			<Label htmlFor="locale-selector" className={cn("mb-2 text-2xl font-bold")}>{t("pages.settings.language")}</Label>
			<hr className={cn("border-zinc-400 dark:border-zinc-600 -mx-4")} />
			<Select.Root value={locale} onValueChange={(value) => {
				setLocale(value);
			}}>
				<Select.Trigger id="locale-selector" className={cn("h-10 min-w-36 mt-4 mr-auto flex items-center justify-between px-2 gap-2 rounded-md border text-base select-none")}>
					<Select.Value placeholder={t("pages.settings.language")} />
					<Select.Icon className={cn("icon")}>
						keyboard_arrow_down
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Positioner side="bottom" align="start" sideOffset={100}>
						<Select.Popup className={cn("py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 shadow-lg outline transition-all")}>
							{i18n.languages.map((language) => (
								<Select.Item key={language} value={language} className={cn("grid min-w-full cursor-default grid-cols-[0.75rem_1fr] items-center gap-4 py-2 pr-4 pl-2.5 outline-none select-none hover:text-sky-50 hover:bg-sky-500")}>
									<Select.ItemIndicator className={cn("col-start-1")}>
										<span className="icon">check</span>
									</Select.ItemIndicator>
									<Select.ItemText className={cn("col-start-2 flex items-center gap-2")}>
										<img src={"/locales/" + language + "/icon.svg"} alt={locales[language]} />
										<span>{locales[language]}</span>
									</Select.ItemText>
								</Select.Item>
							))}
						</Select.Popup>
					</Select.Positioner>
				</Select.Portal>
			</Select.Root>
		</>
	);
}
