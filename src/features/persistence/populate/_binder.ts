import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

import { CURRENT_BINDER_ID } from "@/features/persistence/entities/Setting";

export async function populateDefaultBinder(translations: ElementTranslation[]) {
	const defaultBinderId = await db.addBinder({});
	translations.forEach(async (translation) => {
		await db.addTranslation({
			objectType: "Binder",
			objectId: defaultBinderId,
			language: translation.language,
			value: translation.value
		});
	});

	db.addSetting({
		key: CURRENT_BINDER_ID,
		value: defaultBinderId
	});

	return defaultBinderId;
}