# Development guidelines

These instructions apply throughout this repository. Follow any more specific `AGENTS.md` instructions in the directory being changed.

## Project context

- This is a personal website built with React 18, Create React App, and CSS.
- Application code lives in `src/`, reusable UI in `src/components/`, page components in `src/pages/`, and static public assets in `public/`.
- Use npm and preserve `package-lock.json`. CI uses Node.js 22; use the same major version locally when available.

## General development

- Read the relevant code and tests before editing. Check `git status` and preserve unrelated user changes.
- Keep changes focused on the requested task.
- Keep components and functions focused on one responsibility. Split large components when they contain distinct responsibilities or become difficult to understand, test, or maintain.
- Reuse existing components and utilities before introducing abstractions or packages.
- Add dependencies only when they provide a clear benefit. Update the lockfile through npm whenever dependencies change.
- Write comments to explain non-obvious intent or constraints rather than repeat the code.
- Add concise JSDoc (`/** ... */`) to all functions, including components, hooks, helpers, and callbacks. Describe their purpose and, where relevant, parameters, return values, side effects, and constraints.
- Update documentation whenever setup, commands, or expected behaviour changes.

## Naming and file organisation

- Use PascalCase for React components and their folders, such as `NavBar` and `HomePage`.
- Match each component’s filename to its name. Use `.jsx` for new files containing JSX, for example `src/components/NavBar/NavBar.jsx`.
- Keep component styles and tests beside the component, using the same basename: `NavBar.css` and `NavBar.test.jsx`. Follow the same convention for pages under `src/pages/`.
- Use camelCase and `.js` for modules without JSX, such as `createGlobe.js` and `formatDate.js`.
- Start custom hook names and filenames with `use`, for example `useViewportWidth.js`.
- Use camelCase for variables, props, and functions. Use descriptive verbs for actions and the `handle` prefix for event handlers, such as `handleResize`.
- Use UPPER_SNAKE_CASE for fixed module-level constants, such as `SESSION_KEY`.
- Use lowercase kebab-case for new image and document assets, such as `profile-photo.jpg`. Preserve existing public URLs when modifying assets.
- Use component-scoped CSS classes with a consistent BEM-style structure, such as `nav-bar`, `nav-bar__link`, and `nav-bar__link--active`. Follow the component’s existing naming convention when modifying its styles.
- Organise CSS attributes in a class in alphabetical order

## Accessibility and presentation

- Use semantic HTML: buttons for actions, anchors for navigation, and associated labels for form controls.
- Support keyboard navigation, visible focus states, meaningful accessible names, and appropriate image alt text.
- Do not rely on colour alone to convey meaning.
- Respect reduced-motion preferences.
- Keep component styles beside their components. Avoid broad global selectors that unexpectedly affect unrelated UI.

## Testing principles

- Add or update tests when behaviour changes or bugs are fixed.
-

## Test file conventions

- Place unit tests beside the module they exercise and match its basename:
  - `Experience.jsx` → `Experience.test.jsx`
  - `createGlobe.js` → `createGlobe.test.js`
- Use `describe` to group related behaviour and `test.each` for meaningful sets of input cases.
- Name the outer `describe` after the component or module; use nested groups for
  distinct behaviours when they improve readability. Keep setup and cleanup hooks
  inside the suite they apply to.
- Start test descriptions with lowercase action phrases, such as
  `test('closes the photo when the close button is clicked', ...)`. Preserve
  proper noun casing. Capitalisation is a style convention, not a Jest requirement.
- Structure each test as arrange, act, and assert.

## Verification workflow

### During development

- Run the relevant unit tests after each behavioural change. For example:

  ```sh
  npm run test:unit -- --runTestsByPath src/components/Experience/Experience.test.jsx
  ```

### Before handing off code or tooling changes

- Run `npm run precommit`. This runs all unit tests, ESLint, and the Prettier check.
- Run `npm run test:coverage` after adding or changing application behaviour or tests. It checks all application source files and requires 100% statement, branch, function, and line coverage.

## Commands

| Command                 | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `npm ci`                | Install dependencies from the lockfile      |
| `npm start`             | Start the development server                |
| `npm run test:unit`     | Run all unit tests once                     |
| `npm run test:coverage` | Run tests and enforce 100% coverage         |
| `npm run lint`          | Check JavaScript and JSX; warnings fail     |
| `npm run lint:fix`      | Apply supported ESLint fixes                |
| `npm run format`        | Format project files with Prettier          |
| `npm run format:check`  | Check formatting without modifying files    |
| `npm run precommit`     | Run unit tests, lint, and formatting checks |
| `npm run build`         | Create a production build                   |
