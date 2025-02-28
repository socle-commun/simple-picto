import { db } from "@/features/persistence/db";

import { type ElementTranslation } from "@/features/persistence/populate/_interfaces";

import { ACTIVE_BINDER_ID } from "@/features/persistence/entities/Setting";

export async function populateDefaultBinder(translations: ElementTranslation[]) {
	const defaultBinderUuid = await db.createBinder({
		uuid: crypto.randomUUID(),
		author: "SimplePicto"
	});

	translations.forEach(async (translation) => {
		await db.createTranslation({
			objectUuid: defaultBinderUuid,
			language: translation.language,
			key: translation.key,
			value: translation.value
		});
	});

	db.createSetting({
		key: ACTIVE_BINDER_ID,
		value: defaultBinderUuid
	});

	return defaultBinderUuid;
}