# Haru Dashboard

Haru dashboard for developers

## Prerequisites

- [node + npm](https://nodejs.org/) (Current Version)

## Option

- [Visual Studio Code](https://code.visualstudio.com/)
- Visual Studio Code Extensions
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Includes the following

- TypeScript
- Webpack
- React
- Jest

## Setup

```
npm install
```

## Build

```
npm run build
```

## Build in watch mode

```
npm run watch
```

## Load extension to chrome
> https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked

Load `dist` directory  


## Test
`npx jest` or `npm run test`


## Project Structure
- dist  
  Chrome Extension directory

- dist/js  
  Generated JavaScript files

- public  
  static files and manifest.json

- src
  - \_\_tests\_\_
  - API  
    functions that sends an external request
  - Components  
    - Common  
    - Dashboard  
      main frame of dashboard
    - Widgets  
      Each widget located in the dashboard
  - Store
  - Utils  
    Types and utility functions used in the source code
  - App.tsx
  - background.ts
  - index.css
  - index.tsx
