import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { Select } from "@base-ui-components/react/select";

import { db } from "@/features/persistence/db";

import { cn } from "@/utilities/cn";

export default function ActiveBinderSelector() {
	const { t } = useTranslation();

	const binders = useLiveQuery(
		async () => db.getTranslatedBinders(),
		[db]
	);

	const activeBinderUuidSetting = useLiveQuery(
		async () => db.getCurrentBinderUuid(),
		[db]
	);

	const [activeBinderUuid, setActiveBinderUuid] = useState<string>("");
	useEffect(() => {
		setActiveBinderUuid(typeof activeBinderUuidSetting?.value === 'string' ? activeBinderUuidSetting.value : "");
	}, [activeBinderUuidSetting]);

	return (
		<>
			<label htmlFor="active-binder-selector" className={cn("text-2xl")}>{t("pages.settings.activeBinder")}</label>
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
							{binders && binders.map((binder) => (
								<Select.Item key={binder.uuid} value={binder.uuid} className={cn("grid min-w-full cursor-default grid-cols-[0.75rem_1fr] items-center gap-4 py-2 pr-4 pl-2.5 outline-none select-none hover:text-sky-50 hover:bg-sky-500")}>
									<Select.ItemIndicator className={cn("col-start-1 icon")}>
										check
									</Select.ItemIndicator>
									<Select.ItemText className={cn("col-start-2 flex items-center gap-2")}>
										{binder.title}
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
