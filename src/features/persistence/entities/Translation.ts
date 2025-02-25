export interface Translation {
	objectType: "Binder" | "Category" | "Pictogram";
	objectId: number;
	language: string;

	value: string;
}