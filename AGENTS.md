# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

`@lawsafrica/indigo-akn` is a TypeScript/JavaScript npm package providing Akoma Ntoso support libraries for the Indigo platform. Source files live in `src/`, browser-based tests live in `tests/`, and build output is generated in `dist/`.

## Common Commands

- Install dependencies: `npm install`
- Build and run tests: `npm run build-test`
- Run tests only: `npm test`
- Build package output: `npm run build`

The test suite is run through Karma using Chrome, Mocha, and Chai. The build command removes and regenerates `dist/`; do not hand-edit generated files in `dist/`. Prefer `npm run build-test` for verification because tests may import built package output from `dist/`.

## Repository Layout

- `src/index.js`: package entry point
- `src/*.js`: core Akoma Ntoso utilities
- `src/enrichments/*.ts`: TypeScript enrichment modules
- `tests/*.js`: unit tests
- `dist/`: generated package output

## Coding Guidelines

- Keep changes scoped to the requested behavior.
- Follow the existing mix of JavaScript and TypeScript rather than converting files unnecessarily.
- Preserve public API compatibility unless the task explicitly calls for a breaking change.
- Add or update focused tests in `tests/` when behavior changes.
- Prefer existing project dependencies and local patterns over adding new packages.
- Use ASCII in source and docs unless existing content or legal text requires otherwise.

## Verification

Before handing off code changes, run the narrowest useful check:

- For behavior changes, run `npm run build-test`.
- For build or packaging changes, run `npm run build`.
- If you cannot run a relevant command, report why and describe the remaining risk.

## Release Notes

Release flow is documented in `README.md`: update `package.json` version according to semver, merge through a pull request, then tag and release through GitHub so publishing to npm can run automatically.
