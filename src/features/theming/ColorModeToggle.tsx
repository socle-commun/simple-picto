import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';

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
			<label htmlFor="color-mode-toggle" className={cn("mb-2 text-2xl font-bold")}>{t("pages.settings.colorMode")}</label>
			<hr className={cn("border-zinc-400 dark:border-zinc-600 -mx-4")} />
			<ToggleGroup
				id="color-mode-toggle"
				aria-label="Color mode"
				value={[colorMode]}
				onValueChange={(value) => setColorMode(value[0] as "light" | "dark" | "system" ? value[0] as "light" | "dark" | "system" : "system")}
				className={cn("w-min mr-auto mt-4 flex items-center justify-around rounded-md border")}
			>
				{
					Array.from([
						{
							value: "light",
							aria: "Light mode",
							icon: "light_mode"
						},
						{
							value: "system",
							aria: "System mode",
							icon: "devices"
						},
						{
							value: "dark",
							aria: "Dark mode",
							icon: "dark_mode"
						}]).map((mode) => (
							<Toggle
								key={mode.value}
								aria-label={mode.aria}
								value={mode.value}
								className="flex size-8 items-center justify-center select-none first:rounded-l-sm last:rounded-r-sm hover:text-zinc-950 hover:dark:text-zinc-50 hover:bg-zinc-300 hover:dark:bg-zinc-700 active:bg-sky-500 data-[pressed]:text-sky-50 data-[pressed]:bg-sky-500"
							>
								<span className="icon">{mode.icon}</span>
							</Toggle>
						))
				}
			</ToggleGroup>
		</>
	);
}