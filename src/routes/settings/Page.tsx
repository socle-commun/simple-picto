import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import LocaleSelector from "@/features/i18n/LocaleSelector";
import ColorModeToggle from "@/features/theming/ColorModeToggle";

import Div from "@/lib/components/div";

import ActiveBinderSelector from "@/partials/settings/ActiveBinderSelector";
import BindersList from "@/partials/settings/BindersList";
import SettingCard from "@/partials/settings/SettingCard";

import { cn } from "@/utilities/cn";


export default function SettingsPage() {
	const { t } = useTranslation();

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
					<BindersList />
				</SettingCard>
			</Div>
		</>
	)
}