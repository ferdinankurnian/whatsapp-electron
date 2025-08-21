<p align="center">
  <img src="assets/icon.png" width="128" height="128" />
</p>

<h1 align="center">WhatsApp Electron</h1>

<p align="center">
  A Simple WhatsApp client using Electron because WhatsApp didn't create a native Linux version.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=74B1BE" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" />
</p>

---

## ✨ Features

- ✅ Native WhatsApp Web experience in a standalone desktop app.
- ✅ Runs in the background when the window is closed.
- ✅ System tray icon to show/hide the application and quit.
- ✅ External links are opened safely in your default browser.

## 🚀 Getting Started

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your system.

### Installation & Running

1.  **Install dependencies from the project root:**
    ```bash
    bun install
    ```

2.  **Run the application in development mode:**
    ```bash
    bun start
    ```

## 📦 Building the Application

You can build the application for different platforms using the following commands. The output files will be located in the `dist` directory.

-   **Build for the current platform:**
    ```bash
    bun run build
    ```

-   **Build for Windows and Linux:**
    ```bash
    bun run build:all
    ```

-   **Build specifically for Linux (.AppImage & .zip):**
    ```bash
    bun run build:linux
    ```

-   **Build specifically for Windows (.exe):**
    ```bash
    bun run build:win
    ```
