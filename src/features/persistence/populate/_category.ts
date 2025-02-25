import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

export async function populateCategory(translations: ElementTranslation[], icon?: string) {
	const categoryId = await db.addCategory({ icon });
	translations.forEach(async (translation) => {
		await db.addTranslation({
			objectType: "Category",
			objectId: categoryId,
			language: translation.language,
			value: translation.value
		});
	});

	return categoryId;
}
