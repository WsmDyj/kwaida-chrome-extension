export type optionModel = {
	label: string;
	value: unknown;
}
export interface constModel<T, V> {
	val: T;
	text: V;
	options?: optionModel[];
	[key: string]: unknown;
}