const { app, BrowserWindow, shell, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let tray = null;
let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        // Optional: use a nice icon for the window as well
        icon: path.join(__dirname, 'build/icon.png') 
    });

    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';
    win.loadURL('https://web.whatsapp.com', { userAgent });

    // Open target="_blank" in the default browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Prevent internal navigation to other domains
    win.webContents.on('will-navigate', (e, url) => {
        if (url !== win.webContents.getURL()) {
            e.preventDefault();
            shell.openExternal(url);
        }
    });

    // Instead of quitting, hide the window when closed
    win.on('close', (event) => {
        if (!app.isQuitting) {
            event.preventDefault();
            win.hide();
        }
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'assets/icon.png');
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                win.show();
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('WhatsApp');
    tray.setContextMenu(contextMenu);

    // Show window when tray icon is clicked
    tray.on('click', () => {
        win.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// This event is not needed anymore as we want the app to stay alive.
// The app will only quit via the tray menu.
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });