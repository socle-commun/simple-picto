import { type ReactNode } from "react";

interface AppProvidersProps {
	children: ReactNode;
}

export default function PictogramGridContainer({ children }: AppProvidersProps) {
	return (
		<main role="main" className="p-4 sm:p-6 lg:p-8">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
				{children}
			</div>
		</main>
	)
}