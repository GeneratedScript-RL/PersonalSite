const PING_ENDPOINT = 'https://sajdjnasjknd.dpdns.org';

const TIMEOUT_MS = 5000;

async function checkpc() {
    const button = document.getElementById('onlineCheckButton');
    const statusEl = document.getElementById('onlineStatusText');

    if (!button || !statusEl) return;

    button.disabled = true;
    button.textContent = 'checking';
    statusEl.textContent = 'ping pong..';
    statusEl.className = 'OnlineStatusText status-checking';

    try {
        const res = await fetch(PING_ENDPOINT, {
            method: 'GET',
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });

        const text = (await res.text()).trim();

        if (res.ok && text === 'pong') {
            statusEl.textContent = 'yes';
            statusEl.className = 'OnlineStatusText status-online';
        } else {
            statusEl.textContent = 'nop';
            statusEl.className = 'OnlineStatusText status-offline';
        }
    } catch (err) {
        statusEl.textContent = 'nuh uh';
        statusEl.className = 'OnlineStatusText status-offline';
    } finally {
        button.disabled = false;
        button.textContent = "click this button to check";
    }
}