import { type ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface AppProvidersProps {
	children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
	return (
		<RecoilRoot>
			{children}
		</RecoilRoot>
	)
}