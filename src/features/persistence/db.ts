import Dexie, { Table } from "dexie";

import { Binder } from "simple-picto-lib/entities/binder";
import { Category } from "simple-picto-lib/entities/category";
import { Pictogram } from "simple-picto-lib/entities/pictogram";
import { CURRENT_BINDER_ID, Setting } from "simple-picto-lib/entities/setting";
import { Translation } from "simple-picto-lib/entities/translation";

import { populate } from "@/features/persistence/populate";

export class SimplePictoDB extends Dexie {
	binders!: Table<Binder, number>;
	categories!: Table<Category, number>;
	pictograms!: Table<Pictogram, number>;
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
	}

	// #region get methods
	public getBinders() {
		return this.binders.toArray();
	}

	public getBinder(id: number) {
		return this.binders.get(id);
	}

	public getCategories() {
		return this.categories.toArray();
	}

	public getCategoriesFromPictograms(pictograms: Pictogram[]) {
		return this.categories.where("id").anyOf(pictograms.map((pictogram) => pictogram.categoryId)).toArray();
	}

	public getCategory(id: number) {
		return this.categories.get(id);
	}

	public getPictograms(binderId: number) {
		return this.pictograms.where({ binderId }).toArray();
	}

	public async getCurrentBinderPictograms() {
		const binderIdSetting = await this.getCurrentBinderId();
		if (binderIdSetting && typeof binderIdSetting.value === "number") {
			return this.pictograms.where({ binderId: binderIdSetting.value }).toArray();
		} else {
			return Promise.reject(new Error("No current binder ID"));
		}
	}

	public async getSetting(key: string) {
		return this.settings.get(key);
	}

	public async getCurrentBinderId() {
		return this.getSetting(CURRENT_BINDER_ID);
	}

	public async getTranslation(language: string, objectType: "Binder" | "Category" | "Pictogram", objectId: number) {
		return this.translations.get({ language, objectType, objectId });
	}
	// #endregion get methods

	// #region add methods
	public addBinder(binder: Binder) {
		return this.binders.add(binder);
	}

	public addCategory(category: Category) {
		return this.categories.add(category);
	}

	public addPictogram(pictogram: Pictogram) {
		return this.pictograms.add(pictogram);
	}

	public addSetting(setting: Setting) {
		return this.settings.add(setting);
	}

	public addTranslation(translation: Translation) {
		return this.translations.add(translation);
	}
	// #endregion add methods


	// #region update methods
	public updateSetting(setting: Setting) {
		if (setting.key !== undefined) {
			return this.settings.update(setting.key, setting);
		} else {
			return Promise.reject(new Error("Binder ID is undefined"));
		}
	}

	public updateBinder(binder: Binder) {
		if (binder.id !== undefined) {
			return this.binders.update(binder.id, binder);
		} else {
			return Promise.reject(new Error("Binder ID is undefined"));
		}
	}

	public updatePictogram(pictogram: Pictogram) {
		if (pictogram.id !== undefined) {
			return this.pictograms.update(pictogram.id, pictogram);
		} else {
			return Promise.reject(new Error("Pictogram ID is undefined"));
		}
	}
	// #endregion update methods


	// #region delete methods
	public deleteSetting(key: string) {
		return this.transaction("rw", this.settings, () => {
			this.settings.delete(key);
		});
	}

	public deleteBinder(id: number) {
		return this.transaction("rw", this.pictograms, this.binders, () => {
			this.pictograms.where({ binderId: id }).delete();
			this.binders.delete(id);
		});
	}

	public deletePictogram(id: number) {
		return this.transaction("rw", this.pictograms, () => {
			this.pictograms.delete(id);
		});
	}
	// #endregion delete methods
}

export const db = new SimplePictoDB();

db.on("populate", populate);
