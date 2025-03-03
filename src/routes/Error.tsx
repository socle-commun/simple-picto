import Div from "@/lib/components/div";
import Main from "@/lib/components/main";

import { cn } from "@/utilities/cn";

export default function RootError() {
	return (
		<>
			<Main role="main" className={cn("p-2 sm:p-4 lg:p-8")}>
				<Div className={cn("h-full flex flex-col items-center pt-16 lg:pt-64 gap-4 lg:w-3xl lg:mx-auto ")}>
					<h1 className={cn("text-4xl font-bold mt-2 mb-4")}>Error, Page not found.</h1>
					<p className={cn("mb-4")}>Something went wrong.</p>
					<a href="/" className={cn("text-sky-500")}>Get back home</a>
				</Div>
			</Main>
		</>
	)
}