# girder-react-client-app

A Girder application build that uses a client plugin.

## How to build, test, etc.

First, run `npm install`.

Since nothing is released on npm, you will need to set up some local links.

```bash
# Setup and build girder client library
cd ..
npm link    # links girder-react-client to local registry
npm run lib # builds the girder client library

# Setup and build table view plugin
cd plugins/table-view
npm link                     # links girder-plugin-table-view to local registry
npm link girder-react-client # uses linked girder-react-client in plugin
npm run lib                  # builds the plugin library

# Setup and build girder client app
cd ../../app
npm link girder-react-client       # uses linked girder-react-client in app
npm link girder-plugin-table-view  # uses linked girder-plugin-table-view in app
npm start                          # builds the application and runs in watch mode
```

The development server is set up to proxy all requests under `/api/v1` to `http://localhost:8080`,
and assumes a Girder server is running there.

Run the tests in watch mode with `npm test`. Report coverage with `npm test -- --coverage`.

Build production code (in `/build`) with `npm run build`.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find information on how to perform common tasks
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
