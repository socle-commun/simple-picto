import { useState } from "react";
import { useTranslation } from "react-i18next";

import { populatePictogram } from "@/features/persistence/populate/_pictogram";

import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import { cn } from "@/utilities/cn";

export default function NewPictoModal({ binderUuid, categories, onClose, onCreated }: {
	binderUuid: string;
	categories: { uuid: string; name: string; icon: string }[];
	onClose: () => void;
	onCreated: () => void;
}) {
	const { t } = useTranslation();
	const [word, setWord] = useState("");
	const [categoryUuid, setCategoryUuid] = useState(categories[0]?.uuid || "");
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!word.trim() || !categoryUuid) {
			setError(t("errors.pictoFieldsRequired"));
			return;
		}
		setLoading(true);
		try {
			let blob: Blob | undefined = undefined;
			if (image) {
				blob = image;
			}
			// Création du pictogramme
			const translations = [
				{ language: "fr-FR", key: "word", value: word },
				{ language: "en-US", key: "word", value: word }
			];
			await populatePictogram(binderUuid, categoryUuid, translations, blob ? URL.createObjectURL(blob) : undefined);
			setLoading(false);
			onCreated();
			onClose();
		} catch {
			setError(t("errors.addingPicto"));
			setLoading(false);
		}
	};

	return (
		<Div className={cn("fixed inset-0 bg-black/50 z-50 flex items-center justify-center")}>
			<Div className={cn("bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg w-[90%] max-w-md shadow-lg flex flex-col gap-4")}>
				<h2 className="text-2xl font-bold mb-2">{t("pages.settings.addPicto")}</h2>
				{error && <Div className="p-2 bg-red-100 text-red-700 rounded">{error}</Div>}
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="text"
						placeholder={t("pages.settings.pictoWord")}
						className="border p-2 rounded"
						value={word}
						onChange={e => setWord(e.target.value)}
						required
					/>
					<select
						className="border p-2 rounded"
						value={categoryUuid}
						onChange={e => setCategoryUuid(e.target.value)}
						required
					>
						{categories.map(cat => (
							<option key={cat.uuid} value={cat.uuid} className="text-black">{cat.name}</option>
						))}
					</select>
					<input
						type="file"
						accept="image/*"
						onChange={e => setImage(e.target.files?.[0] || null)}
					/>
					<Div className="flex gap-2 justify-end">
						<Button type="button" onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded">{t("pages.settings.cancel")}</Button>
						<Button type="submit" className="bg-sky-500 text-white px-3 py-1 rounded" disabled={loading}>{t("pages.settings.add")}</Button>
					</Div>
				</form>
			</Div>
		</Div>
	);
} 