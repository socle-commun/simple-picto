import Dexie, { Table } from 'dexie';

import { Binder } from '@/features/persistence/Binder';
import { Pictogram } from '@/features/persistence/Pictogram';

export class SimplePictoDB extends Dexie {
	binders!: Table<Binder, number>;
	pictograms!: Table<Pictogram, number>;
	constructor() {
		super('SimplePictoDB');
		this.version(1).stores({
			binders: '++id',
			pictograms: '++id, binderId'
		});
	}

	deleteBinder(id: number) {
		return this.transaction('rw', this.pictograms, this.binders, () => {
			this.pictograms.where({ binderID: id }).delete();
			this.binders.delete(id);
		});
	}
}

export const db = new SimplePictoDB();
