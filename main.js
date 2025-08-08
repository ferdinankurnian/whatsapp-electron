const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';
    win.loadURL('https://web.whatsapp.com', { userAgent });

    // Buka target="_blank" di browser default
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Prevent navigate internal ke luar domain
    win.webContents.on('will-navigate', (e, url) => {
        if (url !== win.webContents.getURL()) {
            e.preventDefault();
            shell.openExternal(url);
        }
    });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
