import { useLiveQuery } from "dexie-react-hooks";

import { useTranslation } from "react-i18next";

import { useParams } from "react-router";

import { Accordion } from '@base-ui-components/react/accordion';

import { db } from "@/features/persistence/db";

import SettingCard from "@/partials/settings/SettingCard";

import { cn } from "@/utilities/cn";

export default function BinderEditPage() {
	const { uuid } = useParams();

	const { t, i18n } = useTranslation();

	const binder = useLiveQuery(
		async () => (uuid ? db.getTranslatedBinder(uuid) : undefined),
		[db, t, uuid]
	);

	const pictograms = useLiveQuery(
		async () => (uuid ? db.getTranslatedPictograms(uuid) : undefined),
		[db, t, uuid]
	);

	const categories = useLiveQuery(
		async () => (uuid ? db.getTranslatedCategories(uuid) : undefined),
		[db, t, uuid]
	);

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
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 block group-data-[panel-open]:hidden")}>keyboard_arrow_down</span>
							<span className={cn("icon ml-auto mr-2 size-3 shrink-0 hidden group-data-[panel-open]:block")}>keyboard_arrow_up</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Panel className="h-[var(--accordion-panel-height)] py-2 overflow-hidden text-base transition-[height] ease-in-out data-[ending-style]:h-0 data-[starting-style]:h-0">
						<div className={cn("grid grid-cols-2 p-2 gap-4")}>
							{pictograms?.map((pictogram) => (
								<div key={pictogram.uuid} className={cn("flex flex-col items-center justify-center p-2 border-2 border-zinc-500 rounded-sm")}>
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
										className={cn("px-2 py-1 mt-2 border-2 border-zinc-500 rounded-sm cursor-pointer")}
									>
										{pictogram.blob && <img src={URL.createObjectURL(pictogram.blob)} alt={pictogram.word} className="size-[200px]" />}
									</button>
									{/* Word */}
									<input type="text" value={pictogram.word} placeholder="Enter pictogram word" onChange={(event) => {
										pictogram.word = event.target.value;

										db.updateTranslatedPictogram(pictogram, i18n.language);
									}} className={cn("px-2 py-1 border-2 border-zinc-500 rounded-sm")} />
									{/* Category */}
									<div className={cn("px-2 py-1 border-2 border-zinc-500 rounded-sm")}>
										<input
											type="text"
											value={categories?.find((category) => category.uuid === pictogram.categoryUuid)?.name ?? ""}
											onKeyDown={(event) => {
												if (event.key === "Enter" && binder) {
													const newCategoryName = event.currentTarget.value.trim();
													if (newCategoryName) {
														const existingCategory = categories?.find(
															(category) => category.name.toLowerCase() === newCategoryName.toLowerCase()
														);

														if (existingCategory) {
															pictogram.categoryUuid = existingCategory.uuid;
														} else {
															const newCategory = {
																uuid: crypto.randomUUID(),
																name: newCategoryName,
																icon: "category",
															};
															pictogram.categoryUuid = newCategory.uuid;

															db.updateTranslatedCategory(newCategory, i18n.language);
														}

														db.updateTranslatedPictogram(pictogram, i18n.language);
													}
												}
											}}
											placeholder="Search..."
										/>
										{/* {showSuggestions && (
											<ul className="suggestions">
												{filteredSuggestions.length > 0 ? (
													filteredSuggestions.map((suggestion, index) => (
														<li key={index} onClick={() => handleSelect(suggestion.label)}>
															{suggestion.label}
														</li>
													))
												) : (
													<li>No suggestions found</li>
												)}
											</ul>
										)} */}
									</div>
								</div>
							))}
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion.Root>
		</SettingCard>
	);
}