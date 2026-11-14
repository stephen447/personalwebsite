# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GitHub Actions

The workflow in `.github/workflows/ci.yml` runs unit tests, ESLint, and Prettier checks as separate jobs on every push and pull request. You can also start it manually from GitHub's Actions tab. It uses Node.js 22 and installs dependencies from `package-lock.json` with `npm ci`.

Commit and push the workflow file to enable it on GitHub. Failed checks mark the workflow as failed; to prevent merging, configure a branch ruleset requiring the `test:unit`, `lint`, and `format:check` status checks. These checks appear after the workflow's first run.

## Local commands

In the project directory, you can run:

### `npm run test:coverage`

Runs the tests with coverage for all JavaScript and JSX application files in `src`, including files not imported by tests. Only test files and `setupTests.js` are excluded. The command fails if statements, branches, functions, or lines fall below 100%. Open `coverage/lcov-report/index.html` for the detailed report.

The suite tests component interactions, startup, performance metric registration, and globe lifecycle and camera behavior. Renderer tests keep Three.js geometry and camera calculations real while mocking WebGL, texture loading, orbit controls, and resize observation. Native dialog behavior is modeled in jsdom. Coverage measures exercised code; visual rendering and native browser behavior still need browser testing.

Jest transforms Three.js ES modules and static class blocks using the existing React Babel preset plus `@babel/plugin-transform-class-static-block`. The production build configuration is unchanged. The 100% threshold applies when coverage is requested; `npm run precommit` and the current CI unit-test job run the tests without coverage collection.

### Pre-commit checks

Husky installs the Git hooks automatically when you run `npm install` (or `npm ci`). Run `npm run prepare` to reinstall them in an existing checkout.

Before each commit, the hook runs all unit tests once, ESLint, and Prettier's formatting check. A failed check blocks the commit. Checks run against the working tree; stage the changes you intend to commit after fixing any issues.

Run `npm run precommit` to perform the same checks manually. To fix formatting, run `npm run format` and stage the formatted files before retrying the commit.

### `npm run lint`

Checks JavaScript and JSX in `src` using Create React App's ESLint rules. Warnings fail the check. Formatting rules that conflict with Prettier are disabled.

### `npm run lint:fix`

Applies available ESLint fixes. Any remaining issues must be fixed manually. Use `npm run format` for formatting.

### `npm run format`

Formats project files with Prettier. Generated output, dependencies, coverage, and the npm lockfile are excluded.

### `npm run format:check`

Checks formatting without changing files.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
