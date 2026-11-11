# indigo-akn

Akoma Ntoso support libraries for the Indigo platform, including:

* base GrammarModel class
* html to AKN XML utilities

Published on [npmjs.com](https://www.npmjs.com/package/@lawsafrica/indigo-akn).

## Installation

Install with

```bash
npm install @lawsafrica/indigo-akn
```

## Running tests

1. Install dependencies: `npm install`
2. Build and run tests: `npm run build-test`

`npm run build-test` regenerates `dist/` before running the browser test suite. Use `npm test` only when `dist/` is already up to date.

## Releasing a new version

1. Make your changes.
2. Update the version in package.json, according to [semver.org](https://semver.org/)
3. Commit and merge to main via a Pull Request.
4. Tag and release a new version through [GitHub](https://github.com/laws-africa/indigo-akn/releases/new).
5. GitHub will publish to npmjs.com automatically.

# License

Copyright 2020 Laws.Africa.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

## XSLT processors

Use `createXsltProcessor()` from this package instead of constructing a browser
`XSLTProcessor` directly. It returns a fresh processor synchronously, using native
XSLT when construction succeeds and the bundled `xslt-polyfill` WASM implementation
otherwise. Stylesheet import, parameters and transformations use the standard
processor methods. Importing the package does not initialize the WASM engine.

The fallback currently installs the upstream package's browser globals on first
use; callers should still go through the factory. It disables automatic XML-page
transformation. Browser Content Security Policy must allow WASM compilation
(`wasm-unsafe-eval` in `script-src`, where a CSP is configured). Synchronous
stylesheet imports/includes and `document()` that require additional network
requests are not supported by this fallback; use self-contained stylesheets.
