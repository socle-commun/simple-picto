import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/features/persistence/db";
import speak from "@/features/tts/speak";

import PictogramGridContainer from "@/partials/binder/PictogramGridContainer";
import FilterSideBar from "@/partials/binder/FilterSideBar";

import { cn } from "@/utilities/cn";
import { Translation } from "@/features/persistence/entities/Translation";

export default function RootPage() {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.title = t("pages.titles.home");
	}, [t]);

	const pictograms = useLiveQuery(
		async () => db.getCurrentBinderPictograms(),
		[db]
	);

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
			<FilterSideBar>
				{categories && categories.map(category => (
					<button
						key={category.id}
						onClick={() => category.id !== undefined && toggleCategory(category.id)}
						className={cn("w-full p-2 my-2 cursor-pointer capitalize rounded-lg shadow-md bg-zinc-300 dark:bg-zinc-700 hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150", category.id !== undefined && activeCategories.includes(category.id) ? "bg-sky-500" : "")}>
						<span className="icon"></span>
						<span>
							{categoriesTranslations?.filter((translation) => {
								return translation.objectId === category.id;
							}).map((translation) => translation.value)}
						</span>
					</button>
				))}
			</FilterSideBar>

			<PictogramGridContainer>
				{pictograms && pictograms.filter((pictogram) => {
					return (activeCategories.includes(pictogram.categoryId)) || activeCategories.length === 0;
				}).map(item => (
					<button
						key={item.id}
						onClick={() => speak(item.word, i18n.language)}
						className={cn("flex flex-col bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:scale-105 active:shadow-xl active:scale-95 transition-all ease-in-out duration-150")} >
						<img src={item.imageUrl ? item.imageUrl : item.imageBase64} alt={item.word} className="aspect-square size-full" />
						<p className="w-full p-2 font-semibold text-center capitalize border-t-1 border-zinc-300 dark:border-zinc-700">{item.word}</p>
					</button>
				))}
			</PictogramGridContainer>
		</>
	)
}