# Development guidelines

These instructions apply throughout this repository. Follow any more specific
`AGENTS.md` instructions in the directory being changed.

## Project context

- This is a personal website built with React 18, Create React App, and CSS.
- Application code lives in `src/`, reusable UI in `src/components/`, and pages
  in `src/pages/`. Static public assets live in `public/`.
- Use npm and preserve `package-lock.json`. CI uses Node.js 22; prefer the same
  major version locally when available.
- Keep the existing JavaScript/JSX stack and tooling unless the task calls for
  a migration. Do not eject Create React App as part of routine development.

## Scope and maintainability

- Read the relevant code and tests before editing. Check `git status` and preserve
  unrelated user changes.
- Follow nearby naming and folder conventions. Use descriptive names and keep
  components and functions focused on one responsibility.
- Reuse existing components and utilities before adding abstractions or packages.
  Add dependencies only when they provide a clear benefit, and update the lockfile
  through npm when dependencies change.
- Write comments for non-obvious intent or constraints, not to repeat the code.
- Add JS Docs for all functions.
- Update documentation when setup, commands, or expected behavior changes.

## Accessibility and presentation

- Use semantic HTML: buttons for actions, anchors for navigation, and associated
  labels for form controls.
- Support keyboard navigation, visible focus states, meaningful accessible names,
  and appropriate image alt text. Do not rely on color alone to convey meaning.
- Respect reduced-motion preferences for animation.
- Keep component styles near their components; avoid broad global selectors that
  unexpectedly affect unrelated UI.

## Tests and quality checks

- Add or update tests for changed behavior and bug fixes. Test observable outcomes
  and important edge cases rather than implementation details.
- Use Jest and React Testing Library. Prefer accessible queries such as
  `getByRole` and `getByLabelText`; avoid direct DOM traversal and CSS selectors
  when an accessible query is available.
- Use Prettier for formatting and ESLint for code checks. The existing Prettier
  configuration uses single quotes, two-space indentation, and semicolons.
- Do not silence lint rules, skip tests, or weaken CI merely to make checks pass.
  Any necessary exception must be narrow and explain its reason.
- For code or tooling changes, run `npm run precommit` before handing off. It
  runs all unit tests, ESLint, and the Prettier check. ESLint warnings fail the check.
- Also run `npm run build` when changes affect application code, dependencies,
  assets, or build configuration.
- For documentation-only changes, check formatting for the changed files; a full
  test run is unnecessary.
- Fix failures introduced by the change. Report pre-existing failures and any
  checks that could not run; never claim an unrun check passed.

## Commands

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm ci`               | Install dependencies from the lockfile   |
| `npm start`            | Start the development server             |
| `npm run test:unit`    | Run all unit tests once                  |
| `npm run lint`         | Check JavaScript and JSX; warnings fail  |
| `npm run lint:fix`     | Apply supported ESLint fixes             |
| `npm run format`       | Format project files with Prettier       |
| `npm run format:check` | Check formatting without modifying files |
| `npm run precommit`    | Run tests, lint, and formatting checks   |
| `npm run build`        | Create a production build                |
