export interface Pictogram {
	id?: number;

	word: string;
	category: string;

	imageBase64?: string;
	imageUrl?: string;

	binderId: number;
}
