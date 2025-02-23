import toggleDarkClass from "@/features/theming/toggleDarkClass";

export default function colorModeStorageListener(this: Window, event: StorageEvent) {
	if (event.key === "theme") {
		toggleDarkClass();
	}
}