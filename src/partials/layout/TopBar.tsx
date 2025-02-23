import HomeLink from "@/partials/branding/_RootLink";
import Logo from "@/partials/branding/_Logo";
import NavIconButton from "@/components/nav/NavIconButton";

export default function AppProviders() {
	return (
		<header role="banner">
			<button className="icon text-4xl w-12 h-12 md:hidden">
				menu
			</button>
			<HomeLink>
				<Logo className="size-12" />
				<span>SimplePicto</span>
			</HomeLink>
			<nav role="navigation">
				<NavIconButton to="/settings" className="icon text-4xl w-12 h-12">
					settings
				</NavIconButton>
			</nav>
		</header>
	)
}