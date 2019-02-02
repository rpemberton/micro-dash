# Micro dash

Demo: https://rpemberton.github.io/micro-dash

* Supports multiple currencies
* Uses CSS animations
* Easy to add more Widgets

![screenshot-gbp](docs/screenshot-gbp.png)


## Notable components

### Dashboard
This is responsible for the main theme, layout of Widgets, and fetching data.

### Widget
This component wraps up a chart or some other component/element and makes it compatible with the Dasboard.

### Meter
This takes some data as props and renders a dashboard style meter.


## States

### Success
![screenshot-usd](docs/screenshot-usd.png)

### Loading
![screenshot-loading](docs/screenshot-loading.png)

### Error
![screenshot-error](docs/screenshot-error.png)


## Develop

* Get started: `npm install && npm start`
* Test: `npm run test`
