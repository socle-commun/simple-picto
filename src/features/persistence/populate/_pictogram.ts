import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

export async function populatePictogram(binderId: number, categoryId: number, translations: ElementTranslation[], url?: string) {
	const pictogramId = await db.addPictogram({
		binderId,
		categoryId,
		blob: url ? await fetch(url).then(r => r.blob()) : await fetch("https://placehold.co/400").then(r => r.blob())
	});
	translations.forEach(async (translation) => {
		await db.addTranslation({
			objectType: "Pictogram",
			objectId: pictogramId,
			language: translation.language,
			value: translation.value
		});
	});

	return pictogramId;
}