import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/features/persistence/db";
import speak from "@/features/tts/speak";

import Aside from "@/lib/components/aside";
import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Main from "@/lib/components/main";
import Span from "@/lib/components/span";

import { cn } from "@/utilities/cn";

import { byAlphabeticalOrder } from "@/utilities/sorting";

export default function RootPage() {
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.title = t("pages.titles.home");
	}, [t]);

	const pictograms = useLiveQuery(
		async () => db.getActiveBinderTranslatedPictograms(),
		[db], []
	);

	const categories = useLiveQuery(
		async () => pictograms ? db.getActiveBinderTranslatedCategories() : [],
		[db], []
	);

	const [activeCategories, setActiveCategories] = useState<string[]>([]);

	function toggleCategory(uuid: string) {
		if (activeCategories.includes(uuid)) {
			setActiveCategories((prev) => prev.filter((item) => item !== uuid));
		} else {
			setActiveCategories((prev) => [...prev, uuid]);
		}
	}

	return (
		<>
			<Aside role="complementary" className={cn("w-16 md:w-64 lg:w-3xs px-2 md:px-6 lg:px-8 py-4 flex flex-col gap-2 bg-zinc-200 dark:bg-zinc-800")}>
				{categories && categories.sort((a, b) => byAlphabeticalOrder(a.name, b.name)).map(category => (
					<Button
						key={category.uuid}
						onClick={() => toggleCategory(category.uuid)}
						className={cn("w-full p-2 my-2 flex items-center justify-center gap-2 cursor-pointer capitalize rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150", activeCategories.includes(category.uuid) ? "bg-sky-500 text-sky-50" : "bg-zinc-300 dark:bg-zinc-700 ")}>
						<Span className={cn("icon")}>{category.icon}</Span>
						<Span className={cn("hidden md:block")}>
							{category.name}
						</Span>
					</Button>
				))}
			</Aside>

			<Main role="main" className="p-4 sm:p-6 lg:p-8">
				<Div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
					{pictograms && pictograms.filter((pictogram) => {
						return (activeCategories.includes(pictogram.categoryUuid)) || activeCategories.length === 0;
					}).sort((a, b) => byAlphabeticalOrder(a.word, b.word)).map(item => (
						<Button
							key={item.uuid}
							onClick={() => speak(item.word, i18n.language)}
							className={cn("flex flex-col bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:scale-105 active:shadow-xl active:scale-95 transition-all ease-in-out duration-150")} >
							{item.blob && <img src={URL.createObjectURL(item.blob)} alt={item.word} className="aspect-square size-full" />}
							<p className="w-full p-2 font-semibold text-center capitalize border-t-1 border-zinc-300 dark:border-zinc-700">{item.word}</p>
						</Button>
					))}
				</Div>
			</Main>
		</>
	)
}