import { useState } from "react";

import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";

import Span from "@/lib/components/span";

import ResponsiveTopBar from "@/components/ui/nav/ResponsiveTopBar";
import TopBarNavLink from "@/components/ui/nav/TopBarNavLink";

import Brand from "@/components/partials/branding/Brand";

import { cn } from "@/utilities/cn";

export default function RootLayout() {
	const { t } = useTranslation();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<>
			<ResponsiveTopBar
				isOpen={isOpen}
				onClick={toggleOpen}
				brand={<Brand />}>
				<TopBarNavLink to="/settings" onClick={toggleOpen}>
					<Span className={cn("icon")}>settings</Span>
					<Span>{t("navigation.settings")}</Span>
				</TopBarNavLink>
				<li>
					<a href="mailto:socle-commun@gmail.com" className={cn("flex items-center gap-2 text-center")}>
						<Span className={cn("icon")}>mail</Span>
						<Span>{t("navigation.suggestions")}</Span>
					</a>
				</li>
			</ResponsiveTopBar>

			<Outlet />
		</>
	)
}