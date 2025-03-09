import { type ReactNode, useEffect, useState } from "react";

import { useLiveQuery } from "dexie-react-hooks";

import { useTranslation } from "react-i18next";

import { useParams } from "react-router";

import { db } from "@/features/persistence/db";

import SettingCard from "@/partials/settings/SettingCard";

import { cn } from "@/utilities/cn";

function BackButton({ onClick, children, className }: { onClick: () => void; children: ReactNode; className: string; }) {
	return (
		<button onClick={onClick} className={cn("px-4 py-2 rounded-md border-2 border-sky-500 text-sky-500 font-semibold", className)}>
			{children}
		</button>
	);
}
function NextButton({ onClick, children, className }: { onClick: () => void; children: ReactNode; className: string; }) {
	return (
		<button onClick={onClick} className={cn("px-4 py-2 text-white rounded-md bg-sky-500", className)}>
			{children}
		</button>
	);
}

function StepDetails({ onNext, uuid }: { onNext: () => void; uuid: string; }) {
	const { t, i18n } = useTranslation();

	const binder = useLiveQuery(
		async () => db.getTranslatedBinder(uuid),
		[db, t, uuid]
	);

	const [title, setTitle] = useState(binder?.title ?? "");
	const [author, setAuthor] = useState(binder?.author ?? "");
	const [description, setDescription] = useState(binder?.description ?? "");

	useEffect(() => {
		if (binder) {
			setTitle(binder.title);
			setAuthor(binder.author);
			setDescription(binder.description);
		}
	}, [binder]);


	function onClick() {
		// Save the details
		if (binder) {
			binder.title = title;
			binder.author = author;
			binder.description = description;

			db.updateTranslatedBinder(binder, i18n.language);
		}
		onNext();
	}
	return (
		<>
			<h2 className={cn("col-span-2 text-2xl font-bold")}>Details</h2>
			<div className={cn("col-span-2 grid grid-cols-[auto_1fr] gap-4")}>

				<label htmlFor="title">Title</label>
				<input id="title" value={title} onChange={(event) => setTitle(event.target.value)} className={cn("p-1 border-2 border-zinc-500 rounded-sm focus:border-sky-500 active:border-sky-500")} />

				<label htmlFor="author">Author</label>
				<input id="author" value={author} onChange={(event) => setAuthor(event.target.value)} className={cn("p-1 border-2 border-zinc-500 rounded-sm focus:border-sky-500 active:border-sky-500")} />

				<label htmlFor="description">Description</label>
				<textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} className={cn("p-1 border-2 border-zinc-500 rounded-sm focus:border-sky-500 active:border-sky-500")} />

			</div>
			<NextButton onClick={onClick} className={cn("col-start-2")}>Next</NextButton>
		</>
	);
}
function StepSettings({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
	return (
		<>
			<h2 className={cn("col-span-2 text-2xl font-bold")}>Settings</h2>
			{/* Add form fields for settings */}
			<form className={cn("grid grid-cols-2 gap-4")}>

			</form>
			<BackButton onClick={onBack} className={cn("col-start-1")}>Back</BackButton>
			<NextButton onClick={onNext} className={cn("col-start-2")}>Next</NextButton>
		</>
	);
}
function StepPictogram({ onBack }: { onBack: () => void }) {
	return (
		<>
			<h2 className={cn("col-span-2 text-2xl font-bold")}>Review</h2>
			{/* Add review information */}
			<form className={cn("grid grid-cols-2 gap-4")}>

			</form>
			<BackButton onClick={onBack} className={cn("col-start-1")}>Back</BackButton>
		</>
	);
}

export default function BinderEditPage() {
	const { uuid } = useParams();

	const [currentStep, setCurrentStep] = useState(0);
	const handleNext = () => setCurrentStep((prev) => prev + 1);
	const handleBack = () => setCurrentStep((prev) => prev - 1);

	const steps = ["Details", "Settings", "Pictograms"];

	return (
		<SettingCard>
			<h1 className={cn("text-4xl font-bold")}>Edit Binder</h1>
			<div className={cn("flex justify-center gap-4")}>
				{steps.map((step, index) => (
					<span key={index} className={cn("px-4 py-2 flex align-center gap-2 rounded-full", index === currentStep ? "font-bold bg-gradient-to-br from-[#ff0066] from-0% to-[#bd34fe] to-75% text-white" : "font-normal bg-zinc-300 dark:bg-zinc-700 text-inherit")}>
						<span className={cn("icon")}>
							{index === 0 && "page_info"}
							{index === 1 && "tune"}
							{index === 2 && "image"}
						</span>
						<span>{step}</span>
					</span>
				))}
			</div>
			<div className={cn("grid grid-cols-2 gap-8")}>
				{currentStep === 0 && <StepDetails uuid={uuid || ""} onNext={handleNext} />}
				{currentStep === 1 && <StepSettings onNext={handleNext} onBack={handleBack} />}
				{currentStep === 2 && <StepPictogram onBack={handleBack} />}
			</div>
		</SettingCard>
	);
}