import { useEffect } from "react";

import { useTranslation } from "react-i18next";

export default function SettingsPage() {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t("pages.titles.settings");
	}, [t]);

	return (
		<>
			<h1>SettingsPage</h1>
		</>
	)
}