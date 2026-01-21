import { app, BrowserWindow, screen } from "electron";
import path from "path";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Get the primary display's work area
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  // Widget dimensions
  const widgetWidth = 300;
  const widgetHeight = 400;

  // Calculate position for top right
  const x = screenWidth - widgetWidth;
  const y = 0;

  // Create the browser window with widget properties
  const mainWindow = new BrowserWindow({
    width: widgetWidth,
    height: widgetHeight,
    x: x,
    y: y,
    frame: false, // Remove window frame for widget look
    transparent: true, // Make background transparent
    alwaysOnTop: true, // Keep window always on top
    resizable: false, // Prevent resizing
    skipTaskbar: true, // Don't show in taskbar
    webPreferences: {
      devTools: false, // Add this line to disable DevTools completely

      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Prevent window from being moved (optional)
  mainWindow.setMovable(false);

  // Load the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open DevTools in development
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
