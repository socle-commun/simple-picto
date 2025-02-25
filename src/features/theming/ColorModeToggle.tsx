import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import toggleDarkClass from "@/features/theming/toggleDarkClass";

import { cn } from "@/utilities/cn";

export default function ColorModeToggle() {
	const { t } = useTranslation();

	const [colorMode, setColorMode] = useState<"light" | "dark" | "system">(!("theme" in localStorage) ? "system" : localStorage.theme);

	useEffect(() => {
		if (colorMode === "system") {
			localStorage.removeItem("theme");
		}
		else {
			localStorage.theme = colorMode;
		}

		toggleDarkClass();
	}, [colorMode]);

	return (
		<>
			<label htmlFor="color-mode-toggle" className={cn("text-2xl text-center")}>{t("pages.settings.colorMode")}</label>
			<div role="group" id="color-mode-toggle" className={cn("w-min flex mx-auto mt-auto border-2 border-zinc-400 dark:border-zinc-600 rounded-lg overflow-hidden")}>
				<button onClick={() => setColorMode("light")} className={cn("icon p-2 cursor-pointer", colorMode === "light" ? "bg-sky-500 text-sky-50" : "")}>light_mode</button>
				<button onClick={() => setColorMode("system")} className={cn("icon p-2 cursor-pointer", colorMode === "system" ? "bg-sky-500 text-sky-50" : "")}>devices</button>
				<button onClick={() => setColorMode("dark")} className={cn("icon p-2 cursor-pointer", colorMode === "dark" ? "bg-sky-500 text-sky-50" : "")}>dark_mode</button>
			</div>
		</>
	);
}