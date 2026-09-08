// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

console.log("HELLO from preload, will be playing some ping-pong with IPC's :D")

contextBridge.exposeInMainWorld('electronAPI', {
    autostartFlip: (status: boolean) => ipcRenderer.invoke('autostart:flip', status),
    getAutostartStatus: () => ipcRenderer.invoke('autostart:getStatus'),

    hiddenAutostartFlip: (status: boolean) => ipcRenderer.invoke("autostart:hiddenFlip", status),
    getHiddenAutostartStatus: () => ipcRenderer.invoke('autostart:hiddenGetStatus'),
})