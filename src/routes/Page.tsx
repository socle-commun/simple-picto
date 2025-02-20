import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/features/persistence/db";

import PictogramGridContainer from "@/partials/binder/PictogramGridContainer";
import FilterSideBar from "@/partials/binder/FilterSideBar";

export default function RootPage() {
	const { i18n } = useTranslation();

	const [activeCategories, setActiveCategories] = useState<string[]>([]);

	const pictograms = useLiveQuery(
		async () => db.getcurrentBinderPictograms(),
		[db]
	);

	if (!pictograms) return null;

	const categories = Array.from(new Set(pictograms.map(item => item.category)));

	function toggleCategory(category: string) {
		if (activeCategories.includes(category)) {
			setActiveCategories((prev) => prev.filter((item) => item !== category));
		} else {
			setActiveCategories((prev) => [...prev, category]);
		}
	}

	function speakWord(word: string) {
		const wordToSpeak = new SpeechSynthesisUtterance(word);
		wordToSpeak.lang = i18n.language || "en-US";
		window.speechSynthesis.speak(wordToSpeak);
	}

	return (
		<>
			<FilterSideBar>
				{categories.map(category => (
					<button
						key={category}
						onClick={() => toggleCategory(category)}
						className={`category-button${activeCategories.includes(category) ? " active" : ""}`}>
						{String(category).charAt(0).toUpperCase() + String(category).slice(1)}
					</button>
				))}
			</FilterSideBar>

			<PictogramGridContainer>
				{pictograms.filter((value) => {
					return activeCategories.includes(value.category) || activeCategories.length === 0;
				}).map(item => (
					<button
						key={item.id}
						onClick={() => speakWord(item.word)}
						className="flex flex-col bg-stone-200 dark:bg-stone-800 overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:bg-stone-200 hover:dark:bg-stone-800 hover:scale-105 active:shadow-xl active:scale-110 transition-all ease-in-out duration-150" >
						<img src={item.imageUrl ? item.imageUrl : item.imageBase64} alt={item.word} className="aspect-square size-full" />
						<p className="w-full p-2 font-semibold text-center capitalize border-t-1 border-stone-300 dark:border-stone-700">{item.word}</p>
					</button>
				))}
			</PictogramGridContainer>
		</>
	)
}