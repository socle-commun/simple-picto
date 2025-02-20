import Dexie, { Table } from 'dexie';

import { Binder } from '@/features/persistence/Binder';
import { Pictogram } from '@/features/persistence/Pictogram';
import { populate } from '@/features/persistence/populate';
import { Setting } from '@/features/persistence/Setting';

export class SimplePictoDB extends Dexie {
	settings!: Table<Setting, string>;
	binders!: Table<Binder, number>;
	pictograms!: Table<Pictogram, number>;
	constructor() {
		super('SimplePictoDB');
		this.version(1).stores({
			settings: 'key',
			binders: '++id',
			pictograms: '++id, binderId'
		});
	}

	public getSettings() {
		return this.settings.toArray();
	}

	public getSetting(key: string) {
		return this.settings.get(key);
	}

	public getBinders() {
		return this.binders.toArray();
	}

	public async getcurrentBinderPictograms() {
		const binderIdSetting = await this.getSetting('current-binder-id');
		if (binderIdSetting && typeof binderIdSetting.value === 'number') {
			return this.pictograms.where({ binderId: binderIdSetting.value }).toArray();
		} else {
			return Promise.reject(new Error('No current binder ID'));
		}
	}

	public getPictograms(binderId: number) {
		return this.pictograms.where({ binderId }).toArray();
	}

	public addSetting(setting: Setting) {
		return this.settings.add(setting);
	}

	public addBinder(binder: Binder) {
		return this.binders.add(binder);
	}

	public addPictogram(pictogram: Pictogram) {
		return this.pictograms.add(pictogram);
	}

	public updateSetting(setting: Setting) {
		if (setting.key !== undefined) {
			return this.settings.update(setting.key, setting);
		} else {
			return Promise.reject(new Error('Binder ID is undefined'));
		}
	}

	public updateBinder(binder: Binder) {
		if (binder.id !== undefined) {
			return this.binders.update(binder.id, binder);
		} else {
			return Promise.reject(new Error('Binder ID is undefined'));
		}
	}

	public updatePictogram(pictogram: Pictogram) {
		if (pictogram.id !== undefined) {
			return this.pictograms.update(pictogram.id, pictogram);
		} else {
			return Promise.reject(new Error('Pictogram ID is undefined'));
		}
	}

	public deleteSetting(key: string) {
		return this.transaction('rw', this.settings, () => {
			this.settings.delete(key);
		});
	}

	public deleteBinder(id: number) {
		return this.transaction('rw', this.pictograms, this.binders, () => {
			this.pictograms.where({ binderId: id }).delete();
			this.binders.delete(id);
		});
	}

	public deletePictogram(id: number) {
		return this.transaction('rw', this.pictograms, () => {
			this.pictograms.delete(id);
		});
	}
}

export const db = new SimplePictoDB();

db.on('populate', populate);
