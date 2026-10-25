/**
 * Removes all undefined properties
 *
 * @example
 * ```ts
 * pruneObject({
 *  a: 1,
 *  b: undefined,
 * })
 * // { a: 1 }
 * ```
 *
 */
export const pruneObject = <T>(object: T): Partial<T> =>
	JSON.parse(JSON.stringify(object ?? null));

/**
 * Pick a subset of items from an object
 * @example pick({ a: 1, b: 2, c: 3 }, "a", "c") // { a: 1, c: 3 }
 * @param base The object
 * @param keys A list of keys to pick
 * @returns The object with just the picked keys
 */
export function pick<T extends object, K extends keyof T>(
	base: T,
	keys: K[],
): Pick<T, K> {
	const entries = keys.map((key) => [key, base[key] ?? ""]);
	return Object.fromEntries(entries);
}

/**
 * Transforms an object using the given value and or key transformers.
 *
 * @example
 * ```ts
 * objectMap({
 * 	a: 1,
 * 	b: 2,
 * 	c: 3,
 * }, {
 * 	getKey: (key, value) => key.toUpperCase(),
 * 	getValue: (value, key) => value * 2,
 * }) // { A: 2, B: 4, C: 6 }
 * ```
 */
export const objectMap = <T extends Record<string, any>, U>(
	obj: T,
	{
		getValue,
		getKey,
	}: {
		getKey?: (key: keyof T, value: T[keyof T]) => string;
		getValue?: (value: T[keyof T], key: keyof T) => U;
	},
): Record<keyof T, U> =>
	Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			getKey ? getKey(key, value) : key,
			getValue ? getValue(value, key) : value,
		]),
	) as Record<keyof T, U>;

/**
 * Generates a deterministic key for an object ignoring the order of the fields.
 *
 * JSON stringifies the object and generates a base64 SHA-256 hash.
 * The keys of the object are sorted in order to get a deterministic key.
 */
export const createObjectHash = <T extends object>(object: T) =>
	crypto.subtle
		.digest(
			"SHA-256",
			new TextEncoder().encode(
				// Stringify and sort the fields
				JSON.stringify(
					Object.fromEntries(
						Object.entries(object).sort((a, b) => a[0].localeCompare(b[0])),
					),
				),
			),
		)
		// convert to base64
		.then((arrayBuffer) =>
			[...new Uint8Array(arrayBuffer)]
				.map((x) => x.toString(16).padStart(2, "0"))
				.join(""),
		);
