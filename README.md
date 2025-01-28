# React w1 (components) task

### Stack:

- Vite
- React
- ESLint
- Prettier
- Husky

### Rules:

- Eslint is set up, when _lint_ command is run it doesn't produce any errors (if there are warnings score might be less).
- Prettier is set up, _format:fix_ command fixes issues.
- Husky is set up, linting is run on pre-commit.
- Page is split into at least two sections, top one has _Search_ input and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown while app makes a call to the api).
- When user types something to the _Search_ input and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term.
- The search term typed into the _Search_ input is saved in the LS when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term).
- Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. There should be a button to throw an error.
