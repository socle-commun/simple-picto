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
								<div>
									{pictogram.blob && <img src={URL.createObjectURL(pictogram.blob)} alt={pictogram.word} className="size-[200px]" />}
									<p className={cn("text-center")}>{pictogram.word}</p>
								</div>
							))}
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion.Root>
		</SettingCard>
	);
}