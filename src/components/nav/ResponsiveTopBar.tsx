import { type ReactNode } from "react";

import { cn } from "@/utilities/cn";

interface ResponsiveTopBarProps {
	isOpen: boolean;
	onClick: () => void;
	brand: ReactNode;
	children: ReactNode;
}

export default function ResponsiveTopBar({ isOpen, onClick, brand, children }: ResponsiveTopBarProps) {
	return (

		<header>
			<nav className={cn("w-full")}>
				<div className={cn("flex flex-col md:items-center md:flex-row md:justify-between")}>
					<div>
						<div className={cn("flex items-center md:block")}>
							{brand}

							<div className={cn("ml-auto md:hidden")}>
								<button
									className={cn("p-2 h-min rounded-full border border-gray-700 flex items-center justify-center")}
									onClick={() => onClick()}
								>
									<span className={cn("sr-only")}>Toggle main menu</span>
									<span aria-hidden="true" className={cn("icon")}>{isOpen ? "close" : "menu"}</span>
								</button>
							</div>
						</div>
					</div>
					<div>
						<div className={cn("flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0", isOpen ? "block" : "hidden")}>
							<ul className={cn("items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0")}>
								{children}
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
