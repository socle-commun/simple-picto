export const ACTIVE_BINDER_ID = "current-binder-id";

export interface Setting {
	key: string;
	value: boolean | number | string | object;
}