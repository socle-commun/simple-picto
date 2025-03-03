import { useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";

import { useTranslation } from "react-i18next";

import { db } from "@/features/persistence/db";
import LocaleSelector from "@/features/i18n/LocaleSelector";
import ColorModeToggle from "@/features/theming/ColorModeToggle";

import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Span from "@/lib/components/span";

import ActiveBinderSelector from "@/partials/settings/ActiveBinderSelector";
import BinderCard from "@/partials/settings/BinderCard";
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
					<Div className={cn("mb-2 flex items-center")}>
						<h2 className={cn("text-2xl font-bold")}>{t("pages.settings.binders")}</h2>
						<Button className={cn("ml-auto px-4 py-2 flex items-center justify-center gap-4 border-2 border-sky-500 text-sky-500 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
							<Span className={cn("icon")}>add</Span>
							<Span>New</Span>
						</Button>
					</Div>
					<hr className={cn("border-zinc-400 dark:border-zinc-600 -mx-4")} />
					<Div className={cn("mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6")}>
						{binders?.map((binder) => (
							<BinderCard key={binder.uuid}>
								<Div className={cn("flex items-baseline gap-1")}>
									<Div className={cn("text-lg font-bold")}>{binder.title}</Div>
									<Div className={cn("text-sm italic pl-2 text-zinc-600 dark:text-zinc-500")}>by {binder.author}</Div>
								</Div>
								<Div className={cn("text-sm  text-zinc-600 dark:text-zinc-500")}>{binder.description}</Div>
								<hr className={cn("border-zinc-600 dark:border-zinc-400 -mx-4")} />
								<Div className={cn("flex justify-end gap-2 -mx-4 px-2")}>
									<Button className={cn("flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-sky-50 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
										<Span className={cn("icon")}>edit</Span>
										<Span>Edit</Span>
									</Button>
									<Button className={cn("flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
										<Span className={cn("icon")}>delete</Span>
										<Span>Delete</Span>
									</Button>
								</Div>
							</BinderCard>
						))}
					</Div>
				</SettingCard>
			</Div>
		</>
	)
}