# Focus Balance

A Linux-first desktop focus and rest timer built with **Tauri 2**, **React**, and **TypeScript**.

Focus Balance keeps a work/rest rhythm locally: choose a preset, run a focus session, take a fullscreen break, and review today’s progress.

## Features

- Focus timer with pause, resume, and stop controls
- Fullscreen break screen with emergency unlock
- Desktop notifications and an audible chime when focus or break sessions end
- Built-in presets: Classic Pomodoro, Deep Work, 52 / 17, and 90 / 20
- Create and persist custom presets locally
- Editing a timer setting clears the active preset automatically
- Configurable focus, short-break, long-break, and session values
- Local session history and daily focus/break totals
- Light, dark, and system theme modes
- All app data is stored locally in browser Web Storage (`focus-balance-v1`)

## Requirements

- Node.js 20+
- Rust stable toolchain
- Tauri 2 Linux prerequisites ([official setup guide](https://v2.tauri.app/start/prerequisites/))

## Development

```bash
npm install
npm run tauri dev
```

## Tests

```bash
node --experimental-strip-types --test \
  src/lib/alerts.test.ts \
  src/lib/template.test.ts \
  src/lib/timer.test.ts \
  src/lib/break-window.test.ts
```

## Production build

```bash
npm run tauri build -- --bundles deb
```

The Debian package is generated at:

```text
src-tauri/target/release/bundle/deb/Focus Balance_0.1.0_amd64.deb
```

Install or update it with:

```bash
sudo dpkg -i 'src-tauri/target/release/bundle/deb/Focus Balance_0.1.0_amd64.deb'
```

Launch it from the application menu or with:

```bash
focus-balance
```

## Notifications and sound

In **Settings → Notifications**:

- **Enable notifications** controls desktop notifications.
- **Enable sound** controls the transition chime.

Both settings are enabled by default. The app signals at these boundaries:

1. A focus session ends and a break begins.
2. A break ends and the next focus session is ready.

## Project structure

```text
src/                 React UI and timer logic
src/lib/             Storage, presets, timer, alert, and break-window utilities
src-tauri/           Tauri desktop shell and native commands
```

## Data and privacy

Focus Balance does not require an account or server. Timer settings, custom presets, and session history stay on the local device. Clearing browser Web Storage for the app removes that data.

## Current scope

The application uses local Web Storage for persistence. The Tauri SQLite dependency is present but is not yet used as the active data store.
