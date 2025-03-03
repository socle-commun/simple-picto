import { useLiveQuery } from "dexie-react-hooks";

import { useTranslation } from "react-i18next";

import { NavLink } from "react-router";

import { db } from "@/features/persistence/db";

import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Span from "@/lib/components/span";

import BinderCard from "@/partials/settings/BinderCard";

import { cn } from "@/utilities/cn";

export default function BindersList() {
	const { t } = useTranslation();

	const binders = useLiveQuery(
		async () => db.getTranslatedBinders(),
		[db, t]
	);

	const onDeleteBinder = async (uuid: string) => {
		await db.deleteBinder(uuid);
	}

	return (
		<>
			<Div className={cn("mb-2 flex items-center")}>
				<h2 className={cn("text-2xl font-bold")}>{t("pages.settings.binders")}</h2>
				<NavLink to="create" className={cn("ml-auto p-2 flex items-center justify-center gap-4 border-2 border-sky-500 text-sky-500 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
					<Span className={cn("icon")}>add</Span>
					<Span className={cn("sr-only")}>{t("pages.settings.new")}</Span>
				</NavLink>
			</Div>
			<hr className={cn("border-zinc-400 dark:border-zinc-600 -mx-4")} />
			<Div className={cn("mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6")}>
				{binders && binders?.map((binder) => (
					<BinderCard key={binder.uuid}>
						<Div className={cn("flex flex-col md:flex-row items-baseline gap-1")}>
							<Div className={cn("text-lg font-bold")}>{binder.title}</Div>
							<Div className={cn("text-sm italic pl-2 text-zinc-600 dark:text-zinc-500")}>{t("pages.settings.by")} {binder.author}</Div>
						</Div>
						<Div className={cn("text-zinc-600 dark:text-zinc-500 mb-2")}>{binder.description}</Div>
						<hr className={cn("border-zinc-600 dark:border-zinc-400 -mx-4")} />
						<Div className={cn("flex justify-end gap-2 -mx-4 px-2")}>
							<NavLink to={binder.uuid} className={cn("flex items-center justify-center gap-2 p-2 text-sm md:text-base bg-sky-500 text-sky-50 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
								<Span className={cn("icon")}>edit</Span>
								<Span className={cn("sr-only")}>{t("pages.settings.edit")}</Span>
							</NavLink>
							<Button
								onClick={() => onDeleteBinder(binder.uuid)}
								className={cn("flex items-center justify-center gap-2 p-2 text-sm md:text-base border-2 border-red-500 text-red-500 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
								<Span className={cn("icon")}>delete</Span>
								<Span className={cn("sr-only")}>{t("pages.settings.delete")}</Span>
							</Button>
						</Div>
					</BinderCard>
				))}
			</Div>
		</>
	)
}