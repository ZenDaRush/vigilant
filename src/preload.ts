import { contextBridge, ipcRenderer } from "electron";

// Expose process API to renderer
contextBridge.exposeInMainWorld("processAPI", {
    getAllProcesses: () => ipcRenderer.invoke("get-all-processes"),
    getGuiAppsOnly: () => ipcRenderer.invoke("get-gui-apps-only"),
});

declare global {
    interface Window {
        processAPI: {
            getGuiAppsOnly: () => Promise<any>;

            getAllProcesses: () => Promise<any>;
        };
    }
}
