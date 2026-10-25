import { describe, expect, it } from "vitest";
import { formatFullname, getLocalizedValue, parseLocale } from "./i18n";

describe("getLocalizedValue", () => {
	const greetings = {
		en: "Hello",
		"en-US": "Howdy",
		fr: "Bonjour",
		es: "Hola",
	};

	it.each([
		// Exact match for English
		{ locale: "en", fallback: [], expected: "Hello" },

		// Fallback to general English for en-GB
		{ locale: "en-GB", fallback: [], expected: "Hello" },

		// Exact match for American English
		{ locale: "en-US", fallback: [], expected: "Howdy" },

		// Exact match for French
		{ locale: "fr", fallback: [], expected: "Bonjour" },

		// Fallback to Spanish for es-ES without specific entry
		{ locale: "es-ES", fallback: [], expected: "Hola" },

		// No match or fallback for German
		{ locale: "de", fallback: [], expected: undefined },

		// Fallback to general English for en-GB, ignoring French fallback
		{ locale: "en-GB", fallback: ["fr"], expected: "Hello" },

		// Fallback to English for German
		{ locale: "de", fallback: ["en"], expected: "Hello" },
	])(
		"should return $expected when locale is $locale and fallback is $fallback",
		({ locale, fallback, expected }) => {
			const result = getLocalizedValue(greetings, locale, fallback);
			expect(result).toBe(expected);
		},
	);

	it.each([
		// Exact match for English
		{ locale: "en", expected: "Hello" },

		// Fallback to general English for en-GB
		{ locale: "en-GB", expected: "Hello" },

		// No match or fallback for German
		{ locale: "de", expected: undefined },
	])(
		"should return $expected when locale is $locale (no fallback)",
		({ locale, expected }) => {
			const result = getLocalizedValue(greetings, locale);
			expect(result).toBe(expected);
		},
	);
});

describe("parseLocale", () => {
	it.each([
		{
			locale: "en",
			expected: { languageTag: "en", subTag: undefined },
		},
		{
			locale: "en-US",
			expected: { languageTag: "en", subTag: "US" },
		},
		{
			locale: "es-ES",
			expected: { languageTag: "es", subTag: "ES" },
		},
	])("should parse locale $locale", ({ locale, expected }) => {
		const result = parseLocale(locale);
		expect(result).toEqual(expected);
		expect(result.languageTag).toBe(expected.languageTag);
		expect(result.subTag).toBe(expected.subTag);
	});
});

describe("formatFullname", () => {
	it.each([
		// Test cases: [givenName, familyName, locale, expectedResult]
		["John", "Doe", "en-US", "John Doe"],
		["John", "Doe", "ja-JP", "Doe John"],
		["John", "Doe", "zh-CN", "Doe John"],
		["Jean", "Dupont", "fr-FR", "Jean Dupont"],
		["Minh", "Nguyen", "vi-VN", "Nguyen Minh"],
		["John", "Doe", "", "John Doe"],
		["John", "Doe", "fr", "John Doe"],
		["John", "Doe", "hu-HU", "Doe John"],
	])(
		"should format '%s %s' correctly for locale '%s'",
		(givenName, familyName, locale, expected) => {
			const result = formatFullname(givenName, familyName, locale);
			expect(result).toBe(expected);
		},
	);
});
