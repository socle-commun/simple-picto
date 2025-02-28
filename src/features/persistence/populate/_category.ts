import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

export async function populateCategory(translations: ElementTranslation[], icon?: string) {
	const categoryUuid = await db.createCategory({
		uuid: crypto.randomUUID(),
		icon: icon ? icon : "public_off"
	});
	translations.forEach(async (translation) => {
		await db.createTranslation({
			objectUuid: categoryUuid,
			language: translation.language,
			key: translation.key,
			value: translation.value
		});
	});

	return categoryUuid;
}
