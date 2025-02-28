import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

export async function populatePictogram(binderUuid: string, categoryUuid: string, translations: ElementTranslation[], url?: string) {
	const pictogramUuid = await db.createPictogram({
		uuid: crypto.randomUUID(),
		binderUuid: binderUuid,
		categoryUuid: categoryUuid,
		blob: url ? await fetch(url).then(r => r.blob()) : await fetch("https://placehold.co/400").then(r => r.blob())
	});
	translations.forEach(async (translation) => {
		await db.createTranslation({
			objectUuid: pictogramUuid,
			language: translation.language,
			key: translation.key,
			value: translation.value
		});
	});

	return pictogramUuid;
}