import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://haloapi.codevionix.com';

export default function useHaloSocket() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [session, setSession] = useState(null);
  const [screenFrame, setScreenFrame] = useState(null);
  const [cameraFrame, setCameraFrame] = useState(null);
  const [isCameraStreaming, setIsCameraStreaming] = useState(false);
  const [isScreenMirroring, setIsScreenMirroring] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [systemStats, setSystemStats] = useState(null);
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectingDeviceId, setConnectingDeviceId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [socket, setSocket] = useState(null);

  const socketRef = useRef(null);

  const addLog = useCallback((text, type = 'info') => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        text,
        type,
      },
    ].slice(-50)); // Keep last 50 logs
  }, []);

  const fetchDevices = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      
      const response = await axios.get(`${API_URL}/api/remote-control/devices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices(response.data);
    } catch (error) {
      addLog('Failed to fetch devices: ' + error.message, 'error');
    }
  }, [addLog]);

  const deleteDevice = useCallback(async (deviceId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/api/remote-control/devices/${deviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      addLog('Device removed successfully', 'success');
      fetchDevices();
    } catch (error) {
      addLog('Failed to delete device: ' + error.message, 'error');
    }
  }, [fetchDevices, addLog]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setSocket(null);
    setSession(null);
    setSelectedDevice(null);
    setScreenFrame(null);
    setCameraFrame(null);
    setIsCameraStreaming(false);
    setIsScreenMirroring(false);
    setFiles([]);
    setCurrentPath(null);
    setNotifications([]);
    setSystemStats(null);
    setInstalledApps(null);
    addLog('Disconnected from device', 'info');
  }, [addLog]);

  const sendCommand = useCallback((type, payload = {}, callback = null) => {
    if (!socketRef.current || !session) {
      addLog('Cannot send command: No active session', 'error');
      return;
    }

    addLog(`Sending command: ${type}`, 'info');
    socketRef.current.emit(
      'command:send',
      { sessionId: session.id, type, payload },
      (response) => {
        if (callback) callback(response);
        if (response && response.success) {
          addLog(`Command acknowledged by relay: ${type}`, 'success');
        } else {
          const err = response ? response.error : 'Unknown relay error';
          addLog(`Command failed: ${type} - ${err}`, 'error');
        }
      }
    );
  }, [session, addLog]);

  const connectToDevice = useCallback(async (deviceId) => {
    setLoading(true);
    setScreenFrame(null);
    setCameraFrame(null);
    setIsCameraStreaming(false);
    setIsScreenMirroring(false);
    setConnectingDeviceId(deviceId);
    addLog('Establishing link to device...', 'info');

    try {
      const token = localStorage.getItem('access_token');
      const socket = io(`${API_URL}`, {
        auth: { token },
        transports: ['websocket'],
      });
      socketRef.current = socket;
      setSocket(socket);

      socket.on('connect', () => {
        addLog('Relay connection established. Initiating handshake with device...', 'info');

        // Request session setup after delay
        setTimeout(() => {
          socket.emit('session:start', { deviceId }, (response) => {
            if (response.success) {
              setSession(response.session);
              const deviceObj = devices.find(d => d.id === deviceId);
              setSelectedDevice(deviceObj);
              addLog(`Link authorized. Connected to: ${deviceObj?.deviceName || 'Device'}`, 'success');
              
              // Initial sync commands
              socket.emit('command:send', {
                sessionId: response.session.id,
                type: 'GET_STATS',
                payload: {},
              });
              addLog('Syncing device metrics...', 'info');
            } else {
              addLog('Handshake rejected: Device may be offline or busy.', 'error');
              disconnect();
            }
            setLoading(false);
            setConnectingDeviceId(null);
          });
        }, 1500);
      });

      socket.on('connect_error', (error) => {
        addLog('Relay connection error: ' + error.message, 'error');
        setLoading(false);
        setConnectingDeviceId(null);
      });

      socket.on('session:status', (data) => {
        if (!data.accepted) {
          addLog('Session rejected or terminated by target device.', 'error');
          disconnect();
        }
      });

      socket.on('screen:frame', (data) => {
        if (data.type !== 'camera') {
          setScreenFrame(data.frame);
          setIsScreenMirroring(true);
        } else {
          setCameraFrame(data.frame);
          setIsCameraStreaming(true);
        }
      });

      socket.on('notification:receive', (data) => {
        if (data.notification) {
          addLog(`Device notification: ${data.notification}`, 'info');
          setNotifications((prev) => [
            { id: Math.random().toString(), text: data.notification, time: new Date().toLocaleTimeString() },
            ...prev
          ]);
        }
      });

      socket.on('command:completed', (data) => {
        const statusType = data.status === 'COMPLETED' ? 'success' : 'error';
        addLog(`Command finished: ${data.type} [${data.status}]`, statusType);

        if (data.status === 'FAILED') {
          if (data.error) addLog(`Reason: ${data.error}`, 'error');
          return;
        }

        switch (data.type) {
          case 'GET_NOTIFICATIONS':
            if (data.result) {
              setNotifications(
                Array.isArray(data.result)
                  ? data.result.map(n => ({ id: Math.random().toString(), text: n, time: new Date().toLocaleTimeString() }))
                  : []
              );
            }
            break;
          case 'GET_GALLERY':
          case 'GET_FILES':
            if (data.result) {
              setFiles(data.result);
            }
            break;
          case 'VIEW_FILE':
            if (data.result) {
              setCameraFrame(`data:image/jpeg;base64,${data.result}`);
            }
            break;
          case 'GET_STATS':
            if (data.result) {
              setSystemStats(data.result);
            }
            break;
          case 'CAMERA_CAPTURE':
            if (data.result) {
              setCameraFrame(`data:image/jpeg;base64,${data.result}`);
            }
            break;
          case 'AUDIO_RECORD':
            if (data.result) {
              addLog('Playing audio record...', 'info');
              const snd = new Audio(`data:audio/mp4;base64,${data.result}`);
              snd.play().catch(e => addLog('Audio play failed: ' + e.message, 'error'));
            }
            break;
          case 'GET_THUMBNAIL':
            if (data.result && data.path) {
              setThumbnails((prev) => ({
                ...prev,
                [data.path]: `data:image/jpeg;base64,${data.result}`,
              }));
            }
            break;
          case 'CAMERA_STREAM_START':
            setIsCameraStreaming(true);
            break;
          case 'CAMERA_STREAM_STOP':
            setIsCameraStreaming(false);
            setCameraFrame(null);
            break;
          case 'CONTROL_START':
            setIsScreenMirroring(true);
            break;
          case 'SCREEN_SHARE_STOP':
            setIsScreenMirroring(false);
            setScreenFrame(null);
            break;
          case 'GET_INSTALLED_APPS':
            if (data.result) {
              let appList = data.result;
              if (typeof appList === 'string') {
                try { appList = JSON.parse(appList); } catch (e) {}
              }
              const sorted = Array.isArray(appList)
                ? appList.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                : [];
              setInstalledApps(sorted);
            }
            break;
          default:
            break;
        }
      });
    } catch (err) {
      addLog('Connection setup failed: ' + err.message, 'error');
      setLoading(false);
      setConnectingDeviceId(null);
    }
  }, [devices, addLog, disconnect]);

  // Auto-poll system stats every 10 seconds when session is active
  useEffect(() => {
    if (!session) return;
    const intervalId = setInterval(() => {
      if (socketRef.current && session) {
        socketRef.current.emit('command:send', {
          sessionId: session.id,
          type: 'GET_STATS',
          payload: {},
        });
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [session]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    socket,
    devices,
    selectedDevice,
    session,
    screenFrame,
    cameraFrame,
    isCameraStreaming,
    isScreenMirroring,
    files,
    currentPath,
    setCurrentPath,
    notifications,
    systemStats,
    installedApps,
    loading,
    connectingDeviceId,
    logs,
    thumbnails,
    fetchDevices,
    deleteDevice,
    connectToDevice,
    disconnect,
    sendCommand,
    addLog,
  };
}
