# Tess-celestial

> Immersive Scholar Local Resident Radmila Sazdanović

## Quick start

### Docker-first workflow (recommended)

Render in development mode:

```sh
docker compose up app-dev
```

Open:

- `http://localhost:5173` (single-frame iPearl video screen)

Build and serve production:

```sh
docker compose up --build app-prod
```

Open:

- `http://localhost:8080` (single-frame iPearl video screen)

Build-only (no run):

```sh
docker build --target build -t tess-celestial-build .
```

### Non-Docker workflow

Install node modules after initial clone or download:

```sh
npm install
```

Run in development mode:

```sh
npm run dev
```

After running this command, the address of the local development server is displayed in the terminal output. Navigate to this address in your browser.

Build for production:

```sh
npm run build
```

This command builds an optimized version of the app. The output is contained in the folder `dist`.

## iPearl single-frame video screen

This app now renders a static, framed video screen for your custom iPearl display:

- Uses one framed video in the main content area
- Removes matrix/popup/zoom interactions
- Keeps side panel text/links editable in `src/index.js` via `ipearlVideoConfig`
- Current video asset path: `src/assets/landcover_alternating.mp4`

## Initial source

This application is created with [Vite](https://vitejs.dev/)
