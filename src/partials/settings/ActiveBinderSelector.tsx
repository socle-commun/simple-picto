import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { Select } from "@base-ui-components/react/select";

import { db } from "@/features/persistence/db";
import { Translation } from "@/features/persistence/entities/Translation";

import { cn } from "@/utilities/cn";

export default function ActiveBinderSelector() {
	const { t, i18n } = useTranslation();

	const activeBinderUuidSetting = useLiveQuery(
		async () => db.getCurrentBinderUuid(),
		[db]
	);

	const binders = useLiveQuery(
		async () => db.getBinders(),
		[db]
	);

	const [bindersTranslations, setBindersTranslations] = useState<Translation[]>([]);
	useEffect(() => {
		if (binders) {
			for (const binder of binders) {
				db.getTranslationByUuidAndLanguage(binder.uuid, i18n.language, "title").then((translation) => {
					if (translation) {
						setBindersTranslations((prev) => [...prev, translation]);
					}
				});
				db.getTranslationByUuidAndLanguage(binder.uuid, i18n.language, "description").then((translation) => {
					if (translation) {
						setBindersTranslations((prev) => [...prev, translation]);
					}
				});
			}
		}
	}, [binders, i18n, i18n.language]);

	const [activeBinderUuid, setActiveBinderUuid] = useState<string>("");
	useEffect(() => {
		setActiveBinderUuid(typeof activeBinderUuidSetting?.value === 'string' ? activeBinderUuidSetting.value : "");
	}, [activeBinderUuidSetting]);

	return (
		<>
			<label htmlFor="active-binder-selector" className={cn("text-2xl text-center")}>{t("pages.settings.activeBinder")}</label>
			<Select.Root
				value={activeBinderUuid}
				onValueChange={(uuid: string) => {
					if (activeBinderUuidSetting) {
						activeBinderUuidSetting.value = uuid;
						db.updateSetting(activeBinderUuidSetting);
					}
				}}>
				<Select.Trigger id="active-binder-selector" className={cn("h-10 min-w-36 mt-auto flex items-center justify-between px-2 gap-2 rounded-md border text-base select-none")}>
					<Select.Value placeholder={t("pages.settings.activeBinder")} />
					<Select.Icon className={cn("icon")}>
						keyboard_arrow_down
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Positioner side="bottom" align="start">
						<Select.Popup className={cn("py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 shadow-lg outline transition-all")}>
							{binders && binders.map((binder) => {
								return { ...binder, title: bindersTranslations.find((translation) => translation.objectUuid === binder.uuid && translation.key === "title")?.value || "" };
							}).map((binder) => {
								return { ...binder, description: bindersTranslations.find((translation) => translation.objectUuid === binder.uuid && translation.key === "description")?.value || "" };
							}).map((binder) => (
								<Select.Item key={binder.uuid} value={binder.uuid} className={cn("grid min-w-full cursor-default grid-cols-[0.75rem_1fr] items-center gap-4 py-2 pr-4 pl-2.5 outline-none select-none hover:text-sky-50 hover:bg-sky-500")}>
									<Select.ItemIndicator className={cn("col-start-1 icon")}>
										check
									</Select.ItemIndicator>
									<Select.ItemText className={cn("col-start-2 flex items-center gap-2")}>
										<span>{binder.title}</span>
										<span className={cn("hidden md:block")}>({binder.description})</span>
									</Select.ItemText>
								</Select.Item>
							))}
						</Select.Popup>
					</Select.Positioner>
				</Select.Portal>
			</Select.Root>
		</>
	);
};
