import { useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";

import { useTranslation } from "react-i18next";

import { db } from "@/features/persistence/db";
import LocaleSelector from "@/features/i18n/LocaleSelector";
import ColorModeToggle from "@/features/theming/ColorModeToggle";

import Div from "@/lib/components/div";

import ActiveBinderSelector from "@/partials/settings/ActiveBinderSelector";
import SettingCard from "@/partials/settings/SettingCard";

import { cn } from "@/utilities/cn";


export default function SettingsPage() {
	const { t } = useTranslation();

	const binders = useLiveQuery(
		async () => db.getTranslatedBinders(),
		[db, t]
	);

	useEffect(() => {
		document.title = t("pages.titles.settings");
	}, [t]);

	return (
		<>
			<h1 className={cn("text-4xl font-bold mt-2 mb-4")}>{t("pages.titles.settings")}</h1>
			<Div className={cn("grid grid-cols-1 gap-2 md:gap-4 lg:gap-6")}>
				<SettingCard>
					<LocaleSelector />
				</SettingCard>
				<SettingCard>
					<ColorModeToggle />
				</SettingCard>
				<SettingCard>
					<ActiveBinderSelector />
				</SettingCard>
				<SettingCard>
					<h2 className={cn("mb-2 text-2xl font-bold")}>{t("pages.settings.binders")}</h2>
					<hr className={cn("border-zinc-400 dark:border-zinc-600 -mx-4")} />
					<ul className={cn("mt-4 pl-8 list-disc")}>
						{binders?.map((binder) => (
							<li key={binder.uuid}>{binder.title}</li>
						))}
					</ul>
				</SettingCard>
			</Div>
		</>
	)
}