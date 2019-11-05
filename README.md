## Gethyra frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

## Folder Structure

```
front/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    assets/
    components/ // Dump components
    containers/ // Smart components
    routers/ // All routers
    store/ // Redux store
      actions/
      reducers/
      sagas/
      index.js
    index.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## In project used

#### Storage
  * [Redux](https://redux.js.org/)
  * [Redux-saga](https://redux-saga.js.org)
  * [Redux-persist](https://github.com/rt2zz/redux-persist)
  * [Redux-actions](https://redux-actions.js.org/)
  * [Immutablejs](https://facebook.github.io/immutable-js/)
#### Style
  * [SASS Preprocessor](https://sass-lang.com/)
  * [Bourbon Mixins](https://www.bourbon.io/)
#### Tests
  * [Jest](https://jestjs.io)
  * [Enzyme](https://airbnb.io/enzyme/)
#### Other
  * [Flow](https://flow.org/)
  * [Lodash](https://lodash.com/)

## Development Methodology

This project uses the [BEM](https://ru.bem.info/methodology/) methodology (Two Dashes style).
