import { type ReactNode } from "react";

import Header from "@/lib/components/header";
import Nav from "@/lib/components/nav";
import Div from "@/lib/components/div";
import Button from "@/lib/components/button";
import Span from "@/lib/components/span";

import { cn } from "@/utilities/cn";

interface ResponsiveTopBarProps {
	brand: ReactNode;
	children: ReactNode;
	isOpen: boolean;
	onClick: () => void;
}

export default function ResponsiveTopBar({ brand, children, isOpen, onClick }: ResponsiveTopBarProps) {
	return (
		<Header role="banner">
			<Nav className={cn("w-full")}>
				<Div className={cn("flex flex-col md:items-center md:flex-row md:justify-between")}>
					<Div>
						<Div className={cn("flex items-center md:block")}>
							{brand}

							<Button
								className={cn("ml-auto p-2 h-min flex items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700 md:hidden")}
								onClick={() => onClick()}
							>
								<Span className={cn("sr-only")}>Toggle main menu</Span>
								<Span aria-hidden="true" className={cn("icon")}>{isOpen ? "close" : "menu"}</Span>
							</Button>
						</Div>
					</Div>
					<Div>
						<Div className={cn("flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0", isOpen ? "block" : "hidden")}>
							<ul className={cn("items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0")}>
								{children}
							</ul>
						</Div>
					</Div>
				</Div>
			</Nav>
		</Header>
	);
};
