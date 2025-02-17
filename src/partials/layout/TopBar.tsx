import BrandName from "@/components/branding/BrandName";
import Logo from "@/components/branding/Logo";
import NavIconButton from "@/components/nav/NavIconButton";

export default function AppProviders() {
	return (
		<header role="banner">
			<nav role="navigation">
				<section>
					<BrandName>
						<Logo className="size-12" />
						<span>SimplePicto</span>
					</BrandName>
				</section>
				<section></section>
				<section>
					<NavIconButton to="/settings" className="icon text-4xl w-12 h-12">
						settings
					</NavIconButton>
				</section>
			</nav>
		</header>
	)
}