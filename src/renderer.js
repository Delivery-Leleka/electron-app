const statusEl = document.getElementById('status');
const enableBtn = document.getElementById('enable-btn');
const disableBtn = document.getElementById('disable-btn');

// electron check — this page might get opened in a plain browser by mistake,
// where window.electronAPI simply won't exist
if (!window.electronAPI) {
  statusEl.textContent = 'Not running inside Electron — autostart unavailable.';
  enableBtn.disabled = true;
  disableBtn.disabled = true;
} else {
  async function refreshStatus() {
    const enabled = await window.electronAPI.getAutostartStatus();
    statusEl.textContent = `Current Autostart status: ${enabled ? 'ON' : 'OFF'}`;
  }

  enableBtn.addEventListener('click', async () => {
    await window.electronAPI.autostartFlip(true);
    await refreshStatus();
  });

  disableBtn.addEventListener('click', async () => {
    await window.electronAPI.autostartFlip(false);
    await refreshStatus();
  });

  refreshStatus(); // show the real current state on load, not "N/A"
}