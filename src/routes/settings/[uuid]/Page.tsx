import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useParams } from "react-router";

import { Accordion } from '@base-ui-components/react/accordion';

import { db } from "@/features/persistence/db";

import SettingCard from "@/components/partials/settings/SettingCard";
import CategorySelector from "@/components/partials/settings/CategorySelector";
import NewPictoModal from "@/components/partials/settings/NewPictoModal";

import { cn } from "@/utilities/cn";

export default function BinderEditPage() {
	const { uuid } = useParams();

	const { t, i18n } = useTranslation();

	const [showNewPicto, setShowNewPicto] = useState(false);
	const [pictoRefresh, setPictoRefresh] = useState(0);
	const [pictoToDelete, setPictoToDelete] = useState<string | null>(null);

	const binder = useLiveQuery(
		async () => (uuid ? db.getTranslatedBinder(uuid) : undefined),
		[db, t, uuid]
	);

	const pictograms = useLiveQuery(
		async () => (uuid ? db.getTranslatedPictograms(uuid) : undefined),
		[db, t, uuid, pictoRefresh]
	);

	const categories = useLiveQuery(
		async () => (uuid ? db.getTranslatedCategories(uuid) : undefined),
		[db, t, uuid]
	);

	const handleDeletePicto = async () => {
		if (pictoToDelete) {
			await db.pictograms.delete(pictoToDelete);
			setPictoToDelete(null);
			setPictoRefresh(r => r + 1);
		}
	};

	return (
		<SettingCard>
			<h1 className={cn("mb-4 text-4xl font-bold")}>{binder ? binder.title : ""}</h1>
			<Accordion.Root openMultiple={false}>
				<Accordion.Item id="details" title="Details">
					<Accordion.Header>
						<Accordion.Trigger className={cn("group flex w-full cursor-pointer items-center gap-4 py-2 text-left font-medium")}>
							<span className={cn("icon")}>
								page_info
							</span>
							<h2 className={cn("text-2xl font-bold")}>Details</h2>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 block group-data-[panel-open]:hidden")}>keyboard_arrow_down</span>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 hidden group-data-[panel-open]:block")}>keyboard_arrow_up</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Panel className="h-[var(--accordion-panel-height)] py-2 overflow-hidden text-base transition-[height] ease-in-out data-[ending-style]:h-0 data-[starting-style]:h-0">
						<div className={cn("grid grid-cols-[auto_1fr] p-2 gap-4")}>

							<label htmlFor="title">Title</label>
							<input id="title" value={binder?.title ?? ""} onChange={(event) => {
								if (binder) {
									binder.title = event.target.value;

									db.updateTranslatedBinder(binder, i18n.language);
								}
							}} className={cn("px-2 py-1 border-2 border-zinc-500 rounded-sm")} />

							<label htmlFor="author">Author</label>
							<input id="author" value={binder?.author ?? ""} onChange={(event) => {
								if (binder) {
									binder.author = event.target.value;

									db.updateTranslatedBinder(binder, i18n.language);
								}
							}} className={cn("px-2 py-1 border-2 border-zinc-500 rounded-sm")} />

							<label htmlFor="description">Description</label>
							<textarea id="description" value={binder?.description ?? ""} onChange={(event) => {
								if (binder) {
									binder.description = event.target.value;

									db.updateTranslatedBinder(binder, i18n.language);
								}
							}} className={cn("px-2 py-1 border-2 border-zinc-500 rounded-sm")} />
						</div>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item id="pictograms" title="Pictograms">
					<Accordion.Header>
						<Accordion.Trigger className={cn("group flex w-full cursor-pointer items-center gap-4 py-2 text-left font-medium")}>
							<span className={cn("icon")}>
								image
							</span>
							<h2 className={cn("text-2xl font-bold")}>Pictograms</h2>
							<button type="button" onClick={e => { e.stopPropagation(); setShowNewPicto(true); }} className={cn("block ml-3 pl-2 pr-2 rounded bg-sky-800 text-white hover:bg-sky-600 transition-all")}>+</button>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 block group-data-[panel-open]:hidden")}>keyboard_arrow_down</span>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 hidden group-data-[panel-open]:block")}>keyboard_arrow_up</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Panel className="h-[var(--accordion-panel-height)] py-2 overflow-hidden text-base transition-[height] ease-in-out data-[ending-style]:h-0 data-[starting-style]:h-0">
						{showNewPicto && categories && (
							<NewPictoModal
								binderUuid={uuid || ""}
								categories={categories}
								onClose={() => setShowNewPicto(false)}
								onCreated={() => setPictoRefresh(r => r + 1)}
							/>
						)}
						{pictoToDelete && (
							<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
								<div className="bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 max-w-sm w-full">
									<h2 className="text-xl font-bold">{t("pages.settings.confirmDeletePicto")}</h2>
									<div className="flex gap-2 justify-end">
										<button onClick={() => setPictoToDelete(null)} className="bg-gray-400 text-white px-3 py-1 rounded">{t("pages.settings.cancel")}</button>
										<button onClick={handleDeletePicto} className="bg-red-500 text-white px-3 py-1 rounded">{t("pages.settings.delete")}</button>
									</div>
								</div>
							</div>
						)}
						<div className={cn("grid grid-cols-3 p-2 gap-4")}>
							{pictograms?.map((pictogram) => (
								<div key={pictogram.uuid} className={cn("flex flex-col justify-center items-center bg-zinc-200 dark:bg-zinc-900 overflow-hidden rounded-lg shadow-md hover:shadow-lg")}>
									<div className="flex justify-between items-center w-full">
										{/* Category */}
										<CategorySelector
											pictogramUuid={pictogram.uuid}
											currentCategoryUuid={pictogram.categoryUuid}
											binderUuid={uuid || ""}
											onChange={(categoryUuid) => {
												pictogram.categoryUuid = categoryUuid;
												db.updateTranslatedPictogram(pictogram, i18n.language);
											}}
										/>
										{ /* Delete button */ }
										<button
											type="button"
											onClick={() => setPictoToDelete(pictogram.uuid)}
											className={cn("size-6 flex ml-auto mr-3 mt-3 justify-center items-center bg-red-900 text-white rounded-full shadow hover:bg-red-800")}
											title={t("pages.settings.delete")}
										>
											<span className={cn("icon text-sm flex justify-center items-center")}>delete</span>
										</button>
									</div>
									{/* Image */}
									<button
										onClick={() => {
											const fileInput = document.createElement("input");
											fileInput.type = "file";
											fileInput.accept = "image/*";
											fileInput.onchange = async (event) => {
												const file = (event.target as HTMLInputElement).files?.[0];
												if (file && binder) {
													const blob = await file.arrayBuffer();
													pictogram.blob = new Blob([blob], { type: file.type });

													db.updateTranslatedPictogram(pictogram, i18n.language);
												}
											};
											fileInput.click();
										}}
										className={cn("px-2 py-1 mt-2 border-zinc-500 rounded-sm cursor-pointer")}
									>
										{pictogram.blob && <img src={URL.createObjectURL(pictogram.blob)} alt={pictogram.word} className="size-[120px] rounded-sm" />}
									</button>
									{/* Word */}
									<input type="text" value={pictogram.word} placeholder="Enter pictogram word" onChange={(event) => {
										pictogram.word = event.target.value;

										db.updateTranslatedPictogram(pictogram, i18n.language);
									}} className={cn("text-center px-2 mt-2 mb-3 py-1 border-b-1 border-zinc-500 dark:border-zinc-700 dark:text-zinc-400 rounded-sm w-[180px]")} />
								</div>
							))}
						</div>
					</Accordion.Panel>
				</Accordion.Item>
				{/* <Accordion.Item id="categories" title="Categories">
					<Accordion.Header>
						<Accordion.Trigger className={cn("group flex w-full cursor-pointer items-center gap-4 py-2 text-left font-medium")}>
							<span className={cn("icon")}>category</span>
							<h2 className={cn("text-2xl font-bold")}>Catégories</h2>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 block group-data-[panel-open]:hidden")}>keyboard_arrow_down</span>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 hidden group-data-[panel-open]:block")}>keyboard_arrow_up</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Panel className="h-[var(--accordion-panel-height)] py-2 overflow-hidden text-base transition-[height] ease-in-out data-[ending-style]:h-0 data-[starting-style]:h-0">

						<CategoryListEditor binderUuid={uuid || ""} />

					</Accordion.Panel>
				</Accordion.Item> */}
			</Accordion.Root>
		</SettingCard>
	);
}