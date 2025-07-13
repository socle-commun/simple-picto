import { Binder } from "@/features/persistence/entities/Binder";
import { Category } from "@/features/persistence/entities/Category";
import { Pictogram } from "@/features/persistence/entities/Pictogram";
import { Translation } from "@/features/persistence/entities/Translation";

export interface BinderImportData {
	binder: Binder;
	translations: Omit<Translation, 'id'>[];
	categories?: Category[];
	pictograms?: Pictogram[];
}

export interface ImportResult {
	success: boolean;
	error?: string;
	data?: BinderImportData;
}

export function validateBinderImportData(data: any): ImportResult {
	try {
		// Check if data has required structure
		if (!data || typeof data !== 'object') {
			return { success: false, error: 'Invalid file format: not a valid JSON object' };
		}

		// Check for required binder field
		if (!data.binder || typeof data.binder !== 'object') {
			return { success: false, error: 'Invalid file format: missing binder data' };
		}

		// Validate binder structure
		if (!data.binder.uuid || typeof data.binder.uuid !== 'string') {
			return { success: false, error: 'Invalid file format: binder must have a valid uuid' };
		}

		if (!data.binder.author || typeof data.binder.author !== 'string') {
			return { success: false, error: 'Invalid file format: binder must have a valid author' };
		}

		// Check for translations
		if (!data.translations || !Array.isArray(data.translations)) {
			return { success: false, error: 'Invalid file format: missing or invalid translations array' };
		}

		// Validate translations structure
		for (const translation of data.translations) {
			if (!translation.objectUuid || !translation.language || !translation.key || typeof translation.value !== 'string') {
				return { success: false, error: 'Invalid file format: invalid translation structure' };
			}
		}

		// Validate optional categories
		if (data.categories && !Array.isArray(data.categories)) {
			return { success: false, error: 'Invalid file format: categories must be an array' };
		}

		// Validate optional pictograms
		if (data.pictograms && !Array.isArray(data.pictograms)) {
			return { success: false, error: 'Invalid file format: pictograms must be an array' };
		}

		return {
			success: true,
			data: {
				binder: data.binder,
				translations: data.translations,
				categories: data.categories || [],
				pictograms: data.pictograms || []
			}
		};
	} catch (error) {
		return { success: false, error: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}` };
	}
}

export function parseImportFile(file: File): Promise<ImportResult> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		
		reader.onload = (event) => {
			try {
				const content = event.target?.result as string;
				const data = JSON.parse(content);
				const validationResult = validateBinderImportData(data);
				resolve(validationResult);
			} catch (error) {
				resolve({ 
					success: false, 
					error: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}` 
				});
			}
		};

		reader.onerror = () => {
			resolve({ success: false, error: 'Failed to read file' });
		};

		reader.readAsText(file);
	});
}