# @labdigital/toolkit

[![npm](https://img.shields.io/npm/v/@labdigital/toolkit)](https://www.npmjs.com/package/@labdigital/toolkit)

This package contains a set of common utility functions we use for most of our
typescript projects. It is unopinionated, should have almost no dependencies and
is meant to be used in any project.

## Installation

```
pnpm add @labdigital/toolkit
```

## API

<!-- INSERT GENERATED DOCS START -->

### `isValue` (function)

Utility for lists to ensure there are no empty values.

```ts
const products = [
	{ id: "a", price: { centAmount: 20 } },
	{ id: "b", price: null },
	{ id: "c", price: { centAmount: 30 } },
];
products
	.map((x) => x.price)
	.filter(isValue)
	.map((p) => p.centAmount)[
	// results in
	(20, 30)
];
```

### `unique` (function)

Filter utility to filter out duplicate values

```ts
const names = ["john", "john", "jane"].filter(unique); // ['john', 'jane']
```

### `uniqueBy` (function)

### `groupByMap` (function)

Groups a list based on a callback.
Returns a Map where the keys are the result of the callback.

```ts
groupByMap(
  [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}, {age: 16, name: 'Jack'}],
  p => p.age,
)

// results in
Map {
 16: [{age: 16, name: 'Jack'}],
 18: [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}],
}
```

### `groupBy` (function)

Groups a list based on a callback.
Returns a Map where the keys are the result of the callback.

```ts
groupBy(
  [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}, {age: 16, name: 'Jack'}],
  p => p.age,
)

// results in
[
 [16, [{age: 16, name: 'Jack'}]],
 [18, [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}]],
]
```

### `findFirst` (function)

Finds the first item in a list of items by a list of ids.

````ts
const products = [
{id: 'a', price: 1},
{id: 'b', price: 1},
{id: 'c', price: 1}
]
findFirst(['x', 'b'], products, p => p.id) // {id: 'b', price: 1}


### `range` (function)

Creates a range of numbers, staring at `start` and ending at `end` .

```ts
range({start: 0, end: 3}) // [0, 1, 2]
range({start: 1, end: 3}) // [1, 2]
````

### `zip` (function)

Merges two arrays, creating a single array with tuples from both arrays.

```ts
const a = [1, 2, 3];
const b = ["a", "b", "c"];

zip(a, b); // [[1, 'a'], [2, 'b'], [3, 'c']]
```

### `getLocalizedValue` (function)

Attempts to find a matching value for the provided locale by trying the given
locale and its language tag, followed by locale without subtags and then by
any additional fallback locales specified.

It performs both an exact case-sensitive match and a case-insensitive match
to ensure compatibility with different case conventions. Notably, if a
specific locale (e.g., 'en-GB') does not have a direct match, the function
will try to fall back to a more general locale (e.g., 'en') before moving on
to the next fallback locales.

```tsx
// Define a map of localized values
const greetings = {
	en: "Hello",
	"en-US": "Howdy",
	fr: "Bonjour",
};

// Get localized value for British English without an explicit entry, falling
// back to generic English
getLocalizedValue(greetings, "en-GB");
```

```tsx
// Get localized value for American English specifically
getLocalizedValue(greetings, "en-US");
```

```tsx
// Attempt to get a localized value for an unsupported locale with fallbacks
getLocalizedValue(greetings, "es", "en");
```

### `parseLocale` (function)

Parses a locale string and extracts the primary language tag and an optional
subtag. According to the IETF language tag standard (see
https://en.wikipedia.org/wiki/IETF_language_tag), a locale can consist of a
primary language tag followed by optional subtags, separated by hyphens. This
function specifically extracts the primary language tag and the first subtag
if present. Subsequent subtags are not considered in the current
implementation.

**Parameters:**

- locale (`string`) - The locale string to parse. Expected format:
  'language[-subtag]', where 'language' is a 2 or 3 letter language code, and
  'subtag' is an optional additional identifier, such as a country code or
  script.

```tsx
// Parsing a simple language tag
parseLocale("en");
// Returns: { languageTag: 'en', subTag: undefined }
```

```tsx
// Parsing a locale with a subtag
parseLocale("en-US");
// Returns: { languageTag: 'en', subTag: 'US' }
```

```tsx
// Parsing a locale with multiple subtags, note that subsequent subtags are ignored
parseLocale("zh-Hant-HK");
// Returns: { languageTag: 'zh', subTag: 'Hant' }
```

### `formatFullname` (function)

Formats a full name based on locale-specific conventions.

Certain locales place the family name (last name) before the given name
(first name), while others place the given name first. This function formats
the full name accordingly.

**Parameters:**

- givenName (`string`) - The given (first) name of the person.
- familyName (`string`) - The family (last) name of the person.
- locale (`string`) - The locale to format the name in (e.g., 'en-US', 'ja-JP').

```tsx
// Returns "John Doe" for US locale
formatFullname("John", "Doe", "en-US");
```

```tsx
// Returns "Doe John" for Japanese locale
formatFullname("John", "Doe", "ja-JP");
```

### `sum` (function)

Sums the values of a list of objects calculated by a callback.

```js
sum([{ price: 1 }, { price: 2 }], (x) => x.price); // 3
```

### `byMin` (function)

Reducer callback to find object with some minimum value.

```ts
[{ price: 1 }, { price: 2 }].reduce(byMin((x) => x.price)); // {price: 1}
```

### `byMax` (function)

Reducer callback to find object with some maximum value.

```ts
[{ price: 1 }, { price: 2 }].reduce(byMax((x) => x.price)); // {price: 2}
```

### `clamp` (function)

Clamps the value between `min` and `max`.

I.e. returns `min` if `value < min`, or `max` if value > `max`, or the value
itself otherwise.

### `roundHalfEven` (function)

Rounds a number to the nearest integer using the "half to even" strategy,
also known as "bankers' rounding". This method minimizes bias in rounding
over a large set of numbers. When the fractional part of the number is
exactly 0.5, it rounds to the nearest even number.

**Parameters:**

- value (`number`) - The number to round.

```tsx
// When rounding 2.5, it rounds to 2, because 2 is even
roundHalfEven(2.5); // Returns: 2
```

```tsx
// When rounding 3.5, it rounds to 4, because 4 is even
roundHalfEven(3.5); // Returns: 4
```

### `roundHalfUp` (function)

Rounds a number to the nearest integer using the "half up" strategy. This
method rounds up when the fractional part of the number is 0.5 or greater.
It's the most common form of rounding.

**Parameters:**

- value (`number`) - The number to round.

```tsx
roundHalfUp(2.5); // Returns: 3
```

```tsx
roundHalfUp(2.4); // Returns: 2
```

### `roundHalfDown` (function)

Rounds a number to the nearest integer using the "half down" strategy. This
method rounds down when the fractional part of the number is exactly 0.5,
contrary to the "half up" method.

**Parameters:**

- value (`number`) - The number to round.

```tsx
roundHalfDown(2.5); // Returns: 2
```

```tsx
roundHalfDown(2.6); // Returns: 3
```

### `pruneObject` (function)

Removes all undefined properties

```ts
pruneObject({
	a: 1,
	b: undefined,
});
// { a: 1 }
```

### `pick` (function)

Pick a subset of items from an object

**Parameters:**

- base (`T`) - The object
- keys (`K[]`) - A list of keys to pick

**returns:** Pick<T, K>

```tsx
pick({ a: 1, b: 2, c: 3 }, "a", "c"); // { a: 1, c: 3 }
```

### `objectMap` (function)

Transforms an object using the given value and or key transformers.

```ts
objectMap(
	{
		a: 1,
		b: 2,
		c: 3,
	},
	{
		getKey: (key, value) => key.toUpperCase(),
		getValue: (value, key) => value * 2,
	},
); // { A: 2, B: 4, C: 6 }
```

### `createObjectHash` (function)

Generates a deterministic key for an object ignoring the order of the fields.

JSON stringifies the object and generates a base64 SHA-256 hash.
The keys of the object are sorted in order to get a deterministic key.

### `equalsIgnoringCase` (function)

Compares two strings for equality, ignoring case sensitivity.

**Parameters:**

- value (`string`) - The first string to compare.
- other (`string`) - The second string to compare.

### `DeepPartial` (type)

<!-- INSERT GENERATED DOCS END -->
