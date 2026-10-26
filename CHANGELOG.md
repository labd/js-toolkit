# @labdigital/toolkit

## 0.3.0

### Minor Changes

- 8ad7fc9: Require Node.js >= 22: `engines.node` is now `>=22`, older Node.js versions are no longer supported.

### Patch Changes

- 3b2dc6e: Fix the package exports: the package is ESM-only (it never shipped a CommonJS build), so drop the `require` condition that pointed to a non-existent `dist/index.cjs` and add `types`/`default` conditions. Also mark the package as side-effect free.

## 0.2.0

### Minor Changes

- 65b6a85: Add formatFullname(givenName, familyName, locale)

### Patch Changes

- 8f813fe: Use Intl.Locale() to parse locales

## 0.1.0

### Minor Changes

- b678d5f: Add DeepPartial<T> type

## 0.0.4

### Patch Changes

- fc8ee26: Make `parseLocale` part of public api
- 8a269bc: Add `equalsIgnoringCase` for string compare

## 0.0.3

### Patch Changes

- c293818: Fix release by setting proper exports field

## 0.0.2

### Patch Changes

- 4151391: Initial release
