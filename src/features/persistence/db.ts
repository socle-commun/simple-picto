import Dexie, { Table } from "dexie";

import { Binder } from "@/features/persistence/entities/Binder";
import { Category } from "@/features/persistence/entities/Category";
import { Pictogram } from "@/features/persistence/entities/Pictogram";
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

	public async getCurrentBinderUuid() {
		return this.getSetting(ACTIVE_BINDER_ID);
	}

	public async getTranslationByUuidAndLanguage(objectUuid: string, language: string, key: string) {
		return this.translations.get({ objectUuid, language, key });
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
	public updateSetting(setting: Setting) {
		return this.settings.update(setting.key, setting);
	}

	public updateBinder(binder: Binder) {
		return this.binders.update(binder.uuid, binder);
	}

	public updatePictogram(pictogram: Pictogram) {
		return this.pictograms.update(pictogram.uuid, pictogram);
	}
	// #endregion


	// #region Delete
	public deleteSetting(key: string) {
		this.settings.delete(key);
	}

	public deleteBinder(uuid: string) {
		return this.transaction("rw", this.pictograms, this.binders, () => {
			this.pictograms.where({ binderId: uuid }).delete();
			this.binders.delete(uuid);
		});
	}

	public deletePictogram(uuid: string) {
		this.pictograms.delete(uuid);
	}
	// #endregion
}

export const db = new SimplePictoDB();

db.on("populate", populate);
