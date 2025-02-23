import Logo from "./_Logo";
import RootLink from "./_RootLink";

export default function Brand() {
	return (
		<RootLink>
			<Logo className="size-12" />
			<span className="hidden md:block">SimplePicto</span>
		</RootLink>
	)
}