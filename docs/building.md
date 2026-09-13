# Building Focus Balance on Windows and macOS

Focus Balance is a Tauri 2 desktop application. Build each platform on its target operating system for the most reliable installer artifacts.

## Shared requirements

- Node.js 20 or newer
- Rust stable toolchain
- Git

Clone and install dependencies:

```bash
git clone https://github.com/nalim07/focus-balance.git
cd focus-balance
npm install
```

Run the automated checks before packaging:

```bash
node --experimental-strip-types --test \
  src/lib/alerts.test.ts \
  src/lib/template.test.ts \
  src/lib/timer.test.ts \
  src/lib/break-window.test.ts
npm run build
```

## Windows

### Prerequisites

Install the official [Tauri Windows prerequisites](https://v2.tauri.app/start/prerequisites/):

- Microsoft C++ Build Tools / Visual Studio Build Tools with the Desktop development with C++ workload
- Rust MSVC toolchain
- WebView2 Runtime (normally included with current Windows installations)

### Run locally

In PowerShell:

```powershell
npm run tauri dev
```

### Create an MSI installer

```powershell
npm run tauri build -- --bundles msi
```

Expected artifact:

```text
src-tauri\target\release\bundle\msi\Focus Balance_0.1.0_x64_en-US.msi
```

> Tauri documents that MSI installers must be created on Windows because WiX runs only on Windows. Test the installer on a clean Windows machine or VM, including notification permission, transition sound, and fullscreen breaks.

## macOS

### Prerequisites

Install the official [Tauri macOS prerequisites](https://v2.tauri.app/start/prerequisites/):

- Xcode Command Line Tools:

  ```bash
  xcode-select --install
  ```

- Rust stable toolchain
- Node.js 20 or newer

### Run locally

```bash
npm run tauri dev
```

### Create a DMG installer

```bash
npm run tauri build -- --bundles dmg
```

Expected artifact:

```text
src-tauri/target/release/bundle/dmg/Focus Balance_0.1.0_aarch64.dmg
```

The architecture suffix depends on the build machine:

- Apple Silicon: `aarch64`
- Intel Mac: `x64`

Install the DMG by opening it and dragging **Focus Balance** into **Applications**. Test notification permission, transition sound, fullscreen breaks, and emergency unlock.

## Distribution notes

- **Windows:** an unsigned MSI can be installed manually, but SmartScreen may show a warning. Code signing is recommended for public distribution.
- **macOS:** an unsigned app can trigger Gatekeeper warnings. Public distribution should use an Apple Developer certificate, code signing, and notarization.
- Build and test each artifact on its intended architecture before publishing it.

## Linux reference

For Debian-based Linux:

```bash
npm run tauri build -- --bundles deb
sudo dpkg -i 'src-tauri/target/release/bundle/deb/Focus Balance_0.1.0_amd64.deb'
```
