# Potato's Birthday Trip

A mobile-first birthday check-in that permanently reveals Seoul, Taichung, or Bangkok, followed by a relaxed two-day city route with live Google Maps directions.

## Preview

```sh
npm run serve
```

Open `http://localhost:4173`. Run `npm test` for destination, persistence, and route-data checks; run `npm run test:e2e` for the mobile flow.

The chosen destination is stored in that browser's `localStorage`. Clearing Safari website data or opening the site on another device creates a new draw.

## Publish

Push `main` to GitHub, then choose **GitHub Actions** as the Pages source in the repository settings. The included workflow publishes the static project without a build step.

## Image credits

- Seoul and Bangkok photographs are sourced from [Unsplash](https://unsplash.com/license): [Seoul](https://unsplash.com/photos/1517154421773-0529f29ea451) and [Bangkok](https://unsplash.com/photos/1508009603885-50cf7c579365).
- Taichung skyline by [Howard61313](https://commons.wikimedia.org/wiki/File:Taichung_Skyline_in_the_evening.JPG), used under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The image is resized for web delivery.

This is a personal travel invitation, not an airline-issued ticket or Apple Wallet pass.