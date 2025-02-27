import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/features/persistence/db";
import { Translation } from "@/features/persistence/entities/Translation";
import speak from "@/features/tts/speak";

import Aside from "@/lib/components/aside";
import Main from "@/lib/components/main";

import { cn } from "@/utilities/cn";

export default function RootPage() {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.title = t("pages.titles.home");
	}, [t]);

	const pictograms = useLiveQuery(
		async () => db.getCurrentBinderPictograms(),
		[db]
	);

	const [pictogramsTranslations, setPictogramsTranslations] = useState<Translation[]>([]);
	useEffect(() => {
		if (pictograms) {
			for (const pictogram of pictograms) {
				if (pictogram.id !== undefined) {
					db.getTranslation(i18n.language, "Pictogram", pictogram.id).then((translation) => {
						if (translation) {
							setPictogramsTranslations((prev) => [...prev, translation]);
						}
					});
				}
			}
		}
	}, [pictograms, i18n.language]);

	const categories = useLiveQuery(
		async () => pictograms ? db.getCategoriesFromPictograms(pictograms) : [],
		[db, pictograms]
	);

	const [categoriesTranslations, setCategoriesTranslations] = useState<Translation[]>([]);
	useEffect(() => {
		if (categories) {
			for (const category of categories) {
				if (category.id !== undefined) {
					db.getTranslation(i18n.language, "Category", category.id).then((translation) => {
						if (translation) {
							setCategoriesTranslations((prev) => [...prev, translation]);
						}
					});
				}
			}
		}
	}, [categories, i18n.language]);

	const [activeCategories, setActiveCategories] = useState<number[]>([]);

	function toggleCategory(id: number) {
		if (id !== undefined && activeCategories.includes(id)) {
			setActiveCategories((prev) => prev.filter((item) => item !== id));
		} else {
			setActiveCategories((prev) => id !== undefined ? [...prev, id] : prev);
		}
	}

	return (
		<>
			<Aside role="complementary" className={cn("w-16 md:w-3xs px-2 md:px-6 lg:px-8 py-4 flex flex-col gap-2 bg-zinc-200 dark:bg-zinc-800")}>
				{categories && categories.map(category => (
					<button
						key={category.id}
						onClick={() => category.id !== undefined && toggleCategory(category.id)}
						className={cn("w-full p-2 my-2 flex items-center justify-center gap-2 cursor-pointer capitalize rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150", category.id !== undefined && activeCategories.includes(category.id) ? "bg-sky-400 dark:bg-sky-600" : "bg-zinc-300 dark:bg-zinc-700 ")}>
						<span className={cn("icon")}>{category.icon}</span>
						<span className={cn("hidden md:block")}>
							{categoriesTranslations?.filter((translation) => {
								return translation.objectId === category.id;
							}).map((translation) => translation.value)}
						</span>
					</button>
				))}
			</Aside>

			<Main role="main" className="p-4 sm:p-6 lg:p-8">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
					{pictograms && pictograms.filter((pictogram) => {
						return (activeCategories.includes(pictogram.categoryId)) || activeCategories.length === 0;
					}).map((pictogram) => {
						return { ...pictogram, word: pictogramsTranslations.find((translation) => translation.objectId === pictogram.id)?.value || "" };
					}).map(item => (
						<button
							key={item.id}
							onClick={() => speak(item.word, i18n.language)}
							className={cn("flex flex-col bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:scale-105 active:shadow-xl active:scale-95 transition-all ease-in-out duration-150")} >
							{item.blob && <img src={URL.createObjectURL(item.blob)} alt={item.word} className="aspect-square size-full" />}
							<p className="w-full p-2 font-semibold text-center capitalize border-t-1 border-zinc-300 dark:border-zinc-700">{item.word}</p>
						</button>
					))}
				</div>
			</Main>
		</>
	)
}