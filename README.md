# girder-react-client

[![build-status](https://circleci.com/gh/jeffbaumes/girder-react-client.svg?style=shield)](https://circleci.com/gh/jeffbaumes/girder-react-client)
[![codecov](https://codecov.io/gh/jeffbaumes/girder-react-client/branch/master/graph/badge.svg)](https://codecov.io/gh/jeffbaumes/girder-react-client/branch/master)

A proof-of-concept web UI for Girder built with
`react`, `redux`, `react-router`, `semantic-ui-react`.

## How to build, test, etc.

First, run `npm install`.

Run the client in watch mode with `npm start`.
The development server is set up to proxy all requests under `/api/v1` to `http://localhost:8080`,
and assumes a Girder server is running there.

Run the tests in watch mode with `npm test`. Report coverage with `npm test -- --coverage`.

Build production code (in `/build`) with `npm run build`.

Build the library (in `/lib`) with `npm run lib`.

See the [Girder application README](app) for information on how to setup and build Girder with a plugin enabled.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find information on how to perform common tasks
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

See

## Why?

[@jeffbaumes](https://github.com/jeffbaumes) wanted to learn React and decided to use
the Girder client as an example app to implement. This is not prescriptive in terms of
how a next-generation Girder client could be built, but it hopefully will at least be
informative, informing both what to do and what not to do.

## Why React?

I've already done a [project](https://github.com/arborworkflows/arbor_apps) with the other
new(er) kid, Vue. It also uses Girder but does not try to mimic the core Girder UI.

I like that React enables a true mashup of JavaScript and HTML. With Vue you still need to
decide what goes in the template (its own mini-language to learn) and what goes into helper methods.
React also has been around longer, and seems more likely to find solutions for issues
encountered. Create React App and its thorough documentation have been extremely helpful.

I like that Vue handles scoped CSS without effort. Out-of-the-box React requires separate CSS files.

Vuex and Redux are largely identical in how they work for state management.

Overall I'm a bit more impressed by React, though Vue is a pleasure as well.

## Why Semantic UI?

It has decent documentation, apparently good theming support, and an underlying non-React library
so non-React apps could still make Semantic UI themed apps that fit the ecosystem. Semantic UI for
React is jQuery-free.

Other UI libraries could work just fine, though I've heard some Material Design libraries
have performance issues. I've also already tried a Material Design library on the Vue project
and wanted to try something else.

## Why no `react-router-redux`?

The fundamental issue using Redux and `react-router` together is that
Redux wants to be the source of truth for the app state
but `react-router` wants to be the source of truth for location/history. `react-router-redux`
syncs them so you can get location/history state from Redux. However, right now the library
seems to be in an odd state, requiring a `@next` tag to install a version that works with
the latest `react-router`.
In any event, it was glitching on me (user error most likely), and then I came across multiple
places (including the first paragraph on
[this page](https://redux.js.org/docs/advanced/UsageWithReactRouter.html)
in the official Redux docs) stating that it's normally fine/better to let `react-router` be
the source of truth for routing and let Redux be the source of truth for everything else.
So far it seems to be ok to make that separation.

## Why this directory layout?

There are lots of opinions out there. I like that `/src/components` is all UI with no Redux logic
and that `/src/containers` is all Redux with no UI logic. There are other approaches such as
directory-per-component and group-by-functionality. I kept things pretty simple/flat.
I like the idea of tests alongside code as `.test.js` files so it's clear what is tested.
I also like the simplicity and compactness of the
[ducks](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)
model for Redux, which I've put in `/src/modules`.

## What was done to make it a library

Girder is somewhat unique in that it is both an application and a library.
Out of the box, `create-react-app` is not for
[library creation](https://github.com/facebookincubator/create-react-app/issues/907#issuecomment-253998607),
but the comment thread links to an interesting
[article](https://medium.com/@lokhmakov/best-way-to-create-npm-packages-with-create-react-app-b24dd449c354)
explaining how it could be done.
This was adapted for `npm` instead of `yarn`, and with a minimal set of steps to
make it work without ejecting from `create-react-app`.

Install Babel
```
npm i babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-cli
```

Create `.babelrc`
```
{
  "presets": ["es2015", "react", "stage-0"]
}
```

Change `package.json`
```
{
  ...
  "main": "lib/index.js",
  ...
  "scripts": {
    ...
    "lib": "babel src --out-dir lib --copy-files"
  }
}
```

Export app from `src/index.js`
```jsx
// ... imports

const GirderApp = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(
  <GirderApp />,
  document.getElementById('root'));

registerServiceWorker();

export default GirderApp;
```

## Using `girder-react-client` as a library

To use the library, create a new `create-react-app` that depends on Girder
```bash
create-react-app my-girder-app
cd my-girder-app
npm i git+https://github.com/jeffbaumes/girder-react-client

# Note: it currently needs to be "npm link"ed to a local checkout because
# the "/lib" dir with build artifacts is not in the git repo and the package
# is not yet on npm. You can do this with the following steps:
cd ..
git clone https://github.com/jeffbaumes/girder-react-client
cd girder-react-client
npm i
npm run lib
npm link
cd ../my-girder-app
npm link girder-react-client
```

Use the exported Girder app object in `src/index.js`
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from 'girder-react-client';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

Add the proxy to Girder for the dev server to your `package.json`
```
{
  ...
  "proxy": {
    "/api": {
      "target": "http://localhost:8080",
      "ws": true
    }
  }
}
```

Start your app
```
npm start
```

## Using plugin endpoints

See the [table-view](plugins/table-view) plugin for an example
of how to use plugin endpoints.

## Templating: Pug vs. Vuew vs. React

Girder uses Pug as its templating engine. Here is a compilation of normal constructs in Pug along with React and Vue equivalents.

### Accessing a variable in inner text

Pug
```pug
div= a
```
Pug-flavored Vue
```pug
div {{a}}
```
React
```jsx
<div>{a}</div>
```

### Accessing a variable in property
Pug
```pug
div(class=a)
```
Pug-flavored Vue
```pug
div(:class='a')
```
React
```jsx
<div class={a} />
```

### Simple conditional
Pug
```pug
if condition
  div
```
Pug-flavored Vue
```pug
div(v-if='condition')
```
React
```jsx
{
  condition &&
  <div />
}
```

### Complex conditional
Pug
```pug
div The variable x is
  if x > 0
    span positive.
  else if x < 0
    span negative.
  else
    span zero.
```
Pug-flavored Vue
```pug
div The variable x is
  span(v-if='x > 0') positive.
  span(v-else-if='x < 0') negative.
  span(v-else) zero.
```
React
```jsx
let indicator;
if (x > 0) {
  indicator = <span>positive.</span>;
} else if (x < 0) {
  indicator = <span>negative.</span>;
} else {
  indicator = <span>zero.</span>;
}
return (
  <div>The variable x is {indicator}</div>
);
```

### Iteration
Pug
```pug
each todo in todos
  div= todo.name
```
Pug-flavored Vue
```pug
div(v-for='todo in todos') {{todo.name}}
```
React
```jsx
{
  todos.map(todo => <div>{todo.name}</div>)
}
```

### Callback
Pug
```pug
div(click=handleClick) Click me!
```
Pug-flavored Vue
```pug
div(@click='handleClick') Click me!
```
React
```jsx
<div onClick={handleClick}>Click me!</div>
```
