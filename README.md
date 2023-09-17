# Hierarchy table

## Summary

A React application that dynamically creates a hierarchy table based on the input data.
The application provides two basic functionalities:

- Show or hide the direct children of an item
- Delete an item from the hierarchy table

The project is built on top of React library using Vite framework and TypeScript.
The following choices were made based on the current requirements:

- Data layer: Running validation on the input data to ensure compliant schema and creating the data model. Using [uuid](https://www.npmjs.com/package/uuid) to generate random unique ids for every item. The data model stores two objects with the item's unique id as key, and as values: the parent to children relatioships in one map and all the items in a flattened level in the other map. This is to ensure O(1) time complexity when accessing data.
- View layer: Creating the view model to store the data in a UI friendly format and clearly separate it from the data model.
- UI: Using [@fluentui/react](https://www.npmjs.com/package/@fluentui/react) library to get out of the box some components such as buttons.
- State: Relying on React hooks for managing local state and React context for managing global state. If the state was more complicated, a separate state management library like Redux would be required.
- Tests: Adding unit and integrations UI tests using Jest and React Testing Library. Skipping E2E tests since they are more time consuming to write and setup. However, it would be good to have some E2E tests for the happy paths of the main user scenarios.
- Localization: Skipping the localization but it is a must-have for going enterprise.
- Performance: Carefully designed the components architecture to ensure that each component is responsible to only manage changes of its immediate children, avoiding unnecessary re-renders in case an irrelevant component triggers a state update. Used [React-profiler](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to verify the React components performance.

## Development

### Prerequisites

1. Install [Node **v16.x**](https://nodejs.org/dist/latest-v16.x/) using npm
2. Open terminal window and setup global NPM package for TypeScript:

   - `npm install typescript -g`
   - `npm install yarn -g`
3. Install the project dependencies.

   `yarn install`

### Build

   `yarn build` to build the project.

### Run

   `yarn preview` to run the application.

Once the application is running, open browser on "http://127.0.0.1:4173".

### Test

   `yarn test` to run the unit and integration UI tests.
