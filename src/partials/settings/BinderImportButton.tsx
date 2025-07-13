import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import { db } from "@/features/persistence/db";
import { parseImportFile, type ImportResult } from "@/features/import/binderImport";

import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Span from "@/lib/components/span";

import { cn } from "@/utilities/cn";

export interface BinderImportButtonProps {
	onImportComplete?: () => void;
}

export default function BinderImportButton({ onImportComplete }: BinderImportButtonProps) {
	const { t } = useTranslation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isImporting, setIsImporting] = useState(false);
	const [importResult, setImportResult] = useState<ImportResult | null>(null);
	const [showModeSelection, setShowModeSelection] = useState(false);
	const [pendingImportData, setPendingImportData] = useState<any>(null);

	const handleFileSelect = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsImporting(true);
		setImportResult(null);

		try {
			const result = await parseImportFile(file);
			
			if (result.success && result.data) {
				// Show mode selection dialog
				setPendingImportData(result.data);
				setShowModeSelection(true);
			} else {
				setImportResult(result);
			}
		} catch (error) {
			setImportResult({
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		} finally {
			setIsImporting(false);
			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleImport = async (mode: 'merge' | 'replace') => {
		if (!pendingImportData) return;

		setIsImporting(true);
		setShowModeSelection(false);

		try {
			await db.importBinder(pendingImportData, mode);
			setImportResult({ success: true });
			onImportComplete?.();
		} catch (error) {
			setImportResult({
				success: false,
				error: error instanceof Error ? error.message : 'Import failed'
			});
		} finally {
			setIsImporting(false);
			setPendingImportData(null);
		}
	};

	const handleCancel = () => {
		setShowModeSelection(false);
		setPendingImportData(null);
		setImportResult(null);
	};

	return (
		<>
			<Button
				onClick={handleFileSelect}
				disabled={isImporting}
				className={cn("p-2 flex items-center justify-center gap-4 border-2 border-green-500 text-green-500 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed")}
			>
				<Span className={cn("icon")}>{isImporting ? "hourglass_empty" : "upload"}</Span>
				<Span className={cn("sr-only")}>{t("pages.settings.import")}</Span>
			</Button>

			<input
				ref={fileInputRef}
				type="file"
				accept=".json"
				onChange={handleFileChange}
				className="hidden"
			/>

			{/* Mode Selection Dialog */}
			{showModeSelection && (
				<Div className={cn("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50")}>
					<Div className={cn("bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4")}>
						<h3 className={cn("text-lg font-bold mb-4")}>{t("pages.settings.chooseImportMode")}</h3>
						<Div className={cn("space-y-4")}>
							<Button
								onClick={() => handleImport('merge')}
								className={cn("w-full p-4 text-left border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20")}
							>
								<Div className={cn("font-semibold")}>{t("pages.settings.merge")}</Div>
								<Div className={cn("text-sm opacity-75")}>{t("pages.settings.mergeDescription")}</Div>
							</Button>
							<Button
								onClick={() => handleImport('replace')}
								className={cn("w-full p-4 text-left border-2 border-red-500 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20")}
							>
								<Div className={cn("font-semibold")}>{t("pages.settings.replace")}</Div>
								<Div className={cn("text-sm opacity-75")}>{t("pages.settings.replaceDescription")}</Div>
							</Button>
						</Div>
						<Div className={cn("mt-6 flex justify-end")}>
							<Button
								onClick={handleCancel}
								className={cn("px-4 py-2 text-gray-500 hover:text-gray-700")}
							>
								Cancel
							</Button>
						</Div>
					</Div>
				</Div>
			)}

			{/* Result Display */}
			{importResult && (
				<Div className={cn("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50")}>
					<Div className={cn("bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4")}>
						<h3 className={cn("text-lg font-bold mb-4", importResult.success ? "text-green-600" : "text-red-600")}>
							{importResult.success ? t("pages.settings.importSuccess") : t("pages.settings.importError")}
						</h3>
						{importResult.error && (
							<p className={cn("text-sm text-gray-600 dark:text-gray-400 mb-4")}>
								{importResult.error}
							</p>
						)}
						<Div className={cn("flex justify-end")}>
							<Button
								onClick={() => setImportResult(null)}
								className={cn("px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600")}
							>
								OK
							</Button>
						</Div>
					</Div>
				</Div>
			)}
		</>
	);
}