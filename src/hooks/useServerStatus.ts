import { useState, useEffect } from 'react';
import { SERVER_CONFIG } from '../config/serverConfig';

export interface ServerStatusData {
  online: boolean;
  playersOnline: number | null;
  playersMax: number | null;
  version: string | null;
  motd: string | null;
  ping: number | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isStale: boolean;
}

const initialStatus: ServerStatusData = (!SERVER_CONFIG.isAddressConfigured || !SERVER_CONFIG.statusApiEndpoint)
  ? {
      online: false,
      playersOnline: null,
      playersMax: null,
      version: SERVER_CONFIG.supportedVersions,
      motd: 'Whitelisting & public launch scheduled soon.',
      ping: null,
      loading: false,
      error: null,
      lastUpdated: null,
      isStale: false,
    }
  : {
      online: false,
      playersOnline: null,
      playersMax: null,
      version: null,
      motd: null,
      ping: null,
      loading: true,
      error: null,
      lastUpdated: null,
      isStale: false,
    };

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatusData>(initialStatus);

  useEffect(() => {
    if (!SERVER_CONFIG.isAddressConfigured || !SERVER_CONFIG.statusApiEndpoint) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchStatus() {
      const startTime = performance.now();
      try {
        const url = `${SERVER_CONFIG.statusApiEndpoint}${SERVER_CONFIG.serverAddress}`;
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Status provider responded with code ${response.status}`);
        }

        const data = await response.json();
        const latency = Math.round(performance.now() - startTime);

        if (isMounted) {
          setStatus({
            online: Boolean(data.online),
            playersOnline: data.online && data.players?.online !== undefined ? data.players.online : null,
            playersMax: data.online && data.players?.max !== undefined ? data.players.max : null,
            version: data.version?.name_clean || SERVER_CONFIG.supportedVersions,
            motd: data.motd?.clean || null,
            ping: latency,
            loading: false,
            error: null,
            lastUpdated: new Date(),
            isStale: false,
          });
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        if (err instanceof Error && err.name === 'AbortError') return;

        setStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Live telemetry unavailable. Server may be in maintenance or launch whitelisting.',
          isStale: prev.lastUpdated !== null,
        }));
      }
    }

    fetchStatus();

    // Check status every 60 seconds
    const interval = setInterval(fetchStatus, 60000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return status;
}
