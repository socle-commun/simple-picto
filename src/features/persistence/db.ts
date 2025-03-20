import Dexie, { Table } from "dexie";

import { Binder } from "@/features/persistence/entities/Binder";
import { TranslatedBinder } from "@/features/persistence/entities/translated/TranslatedBinder";
import { Category } from "@/features/persistence/entities/Category";
import { TranslatedCategory } from "@/features/persistence/entities/translated/TranslatedCategory";
import { Pictogram } from "@/features/persistence/entities/Pictogram";
import { TranslatedPictogram } from "@/features/persistence/entities/translated/TranslatedPictogram";
import { ACTIVE_BINDER_ID, Setting } from "@/features/persistence/entities/Setting";
import { Translation } from "@/features/persistence/entities/Translation";

import { populate } from "@/features/persistence/populate";


export class SimplePictoDB extends Dexie {
	binders!: Table<Binder, string>;
	categories!: Table<Category, string>;
	pictograms!: Table<Pictogram, string>;
	settings!: Table<Setting, string>;
	translations!: Table<Translation, number>;

	constructor() {
		super("SimplePictoDB");
		this.version(1).stores({
			binders: "++id",
			categories: "++id",
			pictograms: "++id, binderId, categoryId",
			settings: "&key",
			translations: "&[objectType+objectId+language]",
		});
		this.version(2).stores({
			binders: "&uuid",
			categories: "&uuid",
			pictograms: "&uuid, binderUuid, categoryUuid",
			translations: "++id, &[objectUuid+language+key]",
		});
	}

	// #region List
	public getBinders() {
		return this.binders.toArray();
	}

	public getCategories() {
		return this.categories.toArray();
	}

	public getPictograms() {
		return this.pictograms.toArray();
	}

	public getSettings() {
		return this.settings.toArray();
	}

	public getTranslations() {
		return this.translations.toArray();
	}
	// #endregion

	// #region Get
	public getBinder(uuid: string) {
		return this.binders.get(uuid);
	}

	public getCategory(uuid: string) {
		return this.categories.get(uuid);
	}

	public getPictogram(uuid: string) {
		return this.pictograms.get(uuid);
	}

	public getSetting(key: string) {
		return this.settings.get(key);
	}

	public getTranslation(id: number) {
		return this.translations.get(id);
	}
	// #endregion

	//#region Specific
	public getCategoriesFromPictograms(pictograms: Pictogram[]) {
		return this.categories.where("uuid").anyOf(pictograms.map((pictogram) => pictogram.categoryUuid)).toArray();
	}

	public getPictogramsFromBinderUuid(binderUuid: string) {
		return this.pictograms.where({ binderUuid }).toArray();
	}

	public async getActiveBinderPictograms() {
		const binderIdSetting = await this.getCurrentBinderUuid();
		if (binderIdSetting && typeof binderIdSetting.value === "string") {
			return this.getPictogramsFromBinderUuid(binderIdSetting.value);
		} else {
			return Promise.reject(new Error("No current binder ID"));
		}
	}

	public getCurrentBinderUuid() {
		return this.getSetting(ACTIVE_BINDER_ID);
	}

	public getTranslationByUuidAndLanguage(objectUuid: string, language: string, key: string) {
		return this.translations.get({ objectUuid, language, key });
	}

	public getActiveBinderTranslatedPictograms(): Promise<TranslatedPictogram[]> {
		return this.transaction("r", this.pictograms, this.settings, this.translations, () => {
			return this.getActiveBinderPictograms().then((pictograms) => {
				return this.translations.where("objectUuid").anyOf(pictograms.map((pictogram) => pictogram.uuid)).toArray().then((translations) => {
					return pictograms.map((pictogram) => {
						const pictogramTranslation = translations.find((translation) => translation.objectUuid === pictogram.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "word");
						return { ...pictogram, word: pictogramTranslation?.value || "" };
					});
				});
			});
		});
	}

	public getActiveBinderTranslatedCategories(): Promise<TranslatedCategory[]> {
		return this.transaction("r", this.pictograms, this.categories, this.settings, this.translations, () => {
			return this.getActiveBinderPictograms().then((pictograms) => {
				return this.getCategoriesFromPictograms(pictograms).then((categories) => {
					return this.translations.where("objectUuid").anyOf(categories.map((category) => category.uuid)).toArray().then((translations) => {
						return categories.map((category) => {
							const categoryTranslation = translations.find((translation) => translation.objectUuid === category.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "name");
							return { ...category, name: categoryTranslation?.value || "" };
						});
					});
				});
			});
		});
	}

	public getTranslatedBinders(): Promise<TranslatedBinder[]> {
		return this.transaction("r", this.binders, this.settings, this.translations, () => {
			return this.binders.toArray().then((binders) => {
				return this.translations.where("objectUuid").anyOf(binders.map((binder) => binder.uuid)).toArray().then((translations) => {
					return binders.map((binder) => {
						const binderTitleTranslation = translations.find((translation) => translation.objectUuid === binder.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "title");
						const binderDescriptionTranslation = translations.find((translation) => translation.objectUuid === binder.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "description");
						return { ...binder, title: binderTitleTranslation?.value || "", description: binderDescriptionTranslation?.value || "" };
					});
				});
			});
		});
	}

	public getTranslatedBinder(uuid: string): Promise<TranslatedBinder> {
		return this.transaction("r", this.binders, this.settings, this.translations, () => {
			return this.binders.get(uuid).then((binder) => {
				if (!binder) {
					return Promise.reject(new Error("Binder not found"));
				}
				return this.translations.where("objectUuid").anyOf(binder.uuid).toArray().then((translations) => {
					const binderTitleTranslation = translations.find((translation) => translation.objectUuid === binder.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "title");
					const binderDescriptionTranslation = translations.find((translation) => translation.objectUuid === binder.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "description");
					return { ...binder, title: binderTitleTranslation?.value || "", description: binderDescriptionTranslation?.value || "" };
				});
			});
		});
	}

	public getTranslatedPictograms(binderUuid: string): Promise<TranslatedPictogram[]> {
		return this.transaction("r", this.pictograms, this.settings, this.translations, () => {
			return this.getPictogramsFromBinderUuid(binderUuid).then((pictograms) => {
				return this.translations.where("objectUuid").anyOf(pictograms.map((pictogram) => pictogram.uuid)).toArray().then((translations) => {
					return pictograms.map((pictogram) => {
						const pictogramTranslation = translations.find((translation) => translation.objectUuid === pictogram.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "word");
						return { ...pictogram, word: pictogramTranslation?.value || "" };
					});
				});
			});
		});
	}

	public getTranslatedCategories(binderUuid: string): Promise<TranslatedCategory[]> {
		return this.transaction("r", this.pictograms, this.categories, this.settings, this.translations, () => {
			return this.getPictogramsFromBinderUuid(binderUuid).then((pictograms) => {
				return this.getCategoriesFromPictograms(pictograms).then((categories) => {
					return this.translations.where("objectUuid").anyOf(categories.map((category) => category.uuid)).toArray().then((translations) => {
						return categories.map((category) => {
							const categoryTranslation = translations.find((translation) => translation.objectUuid === category.uuid && translation.language === localStorage.getItem("i18nextLng") && translation.key === "name");
							return { ...category, name: categoryTranslation?.value || "" };
						});
					});
				});
			});
		});
	}
	//#endregion

	// #region Create
	public createBinder(binder: Binder) {
		return this.binders.add(binder);
	}

	public createCategory(category: Category) {
		return this.categories.add(category);
	}

	public createPictogram(pictogram: Pictogram) {
		return this.pictograms.add(pictogram);
	}

	public createSetting(setting: Setting) {
		return this.settings.add(setting);
	}

	public createTranslation(translation: Translation) {
		return this.translations.add(translation);
	}
	// #endregion


	// #region Update
	public updateTranslatedBinder(binder: TranslatedBinder, language: string) {
		return this.transaction("rw", this.binders, this.translations, () => {
			this.binders.update(binder.uuid, binder);
			this.translations.where({ objectUuid: binder.uuid, language, key: "title" }).modify({ value: binder.title });
			this.translations.where({ objectUuid: binder.uuid, language, key: "description" }).modify({ value: binder.description });
		});
	}

	public updateBinder(binder: Binder) {
		return this.binders.update(binder.uuid, binder);
	}

	public updateCategory(category: Category) {
		return this.categories.update(category.uuid, category);
	}

	public updatePictogram(pictogram: Pictogram) {
		return this.pictograms.update(pictogram.uuid, pictogram);
	}

	public updateSetting(setting: Setting) {
		return this.settings.update(setting.key, setting);
	}
	// #endregion


	// #region Delete
	public deleteSetting(key: string) {
		this.settings.delete(key);
	}

	public deleteBinder(binderUuid: string) {
		return this.transaction("rw", this.pictograms, this.binders, () => {
			this.pictograms.where({ binderUuid }).delete();
			this.binders.delete(binderUuid);
		});
	}

	public deletePictogram(uuid: string) {
		this.pictograms.delete(uuid);
	}
	// #endregion
}

export const db = new SimplePictoDB();

db.on("populate", populate);
