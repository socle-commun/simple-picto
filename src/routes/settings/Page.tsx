import { type ReactNode, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { cn } from "@/utilities/cn";
import LocaleSelector from "@/features/i18n/LocaleSelector";
import ColorModeToggle from "@/features/theming/ColorModeToggle";

function SettingCard({ children }: { children: ReactNode }) {
	return (
		<div className={cn("flex flex-col p-2 gap-2 bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg shadow-md hover:shadow-lg")}>
			{children}
		</div>
	);
}

export default function SettingsPage() {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t("pages.titles.settings");
	}, [t]);

	return (
		<>
			<h1 className={cn("text-4xl font-bold")}>{t("pages.titles.settings")}</h1>
			<hr />
			<div className={cn("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6")}>
				<SettingCard>
					<LocaleSelector />
				</SettingCard>
				<SettingCard>
					<ColorModeToggle />
				</SettingCard>
			</div>
		</>
	)
}