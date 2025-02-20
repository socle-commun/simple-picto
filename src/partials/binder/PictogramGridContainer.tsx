import { type ReactNode } from "react";

interface AppProvidersProps {
	children: ReactNode;
}

export default function PictogramGridContainer({ children }: AppProvidersProps) {
	return (
		<main role="main" className="p-4 sm:p-6 lg:p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4 h-min">
			{children}
		</main>
	)
}