---
"@labdigital/toolkit": patch
---

Fix the package exports: the package is ESM-only (it never shipped a CommonJS build), so drop the `require` condition that pointed to a non-existent `dist/index.cjs` and add `types`/`default` conditions. Also mark the package as side-effect free.
