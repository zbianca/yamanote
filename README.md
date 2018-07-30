# Yamanote-sen

This project is part of the Front-End Web Developer Nanodegree Program by [Udacity](https://www.udacity.com/). It is a single page map application made with React and the Google Maps API.

>[Access the live version](https://zbianca.github.io/yamanote/index.html)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the full and most recent version of the [Create React App guide here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

The map and its components were rendered using [react-google-maps](react-google-maps).

Images and general information on each location is provided by [MediaWiki's Page Content Service API](https://www.mediawiki.org/wiki/Page_Content_Service) - Wikipedia.

## Getting started

In the project directory, you can run:

  `npm install`

  `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

The service worker is only enabled in the production environment,
e.g. the output of `npm run build`.

## Structure

```
├── README.md
├── package.json
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── List.js
    ├── logo.svg
    ├── Map.js
    ├── MapContainer.js
    ├── Marker.js
    ├── registerServiceWorker.js
    └── stations.js
```