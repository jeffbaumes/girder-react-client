# girder-react-client

A proof-of-concept web UI for Girder built with react, redux, react-router, semantic-ui-react.

## Why?

[@jeffbaumes](https://github.com/jeffbaumes) wanted to learn React and decided to use the Girder client
as an example app to implement.

## How to build, test, etc.

`npm install .`, then run the client with `npm start`.
The development server is set up to proxy all requests under `/api/v1` to `http://localhost:8080`,
and assumes a Girder server is running there.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
