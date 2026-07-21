// Static data for the landing page – keep all copy in one place.

export const FEATURES = [
  {
    icon: 'Monitor',
    color: '#FF5511',
    title: 'Low-Latency Mirror',
    desc: 'Stream high fidelity viewport mirroring over secure transport links. Scale touch actions dynamically.',
    hoverBorder: 'hover:border-[#FF5511]/30',
  },
  {
    icon: 'FolderSync',
    color: '#FF2A6D',
    title: 'Desktop File Explorer',
    desc: 'Navigate folder hierarchies, download image caches, and manage user directories directly from browser.',
    hoverBorder: 'hover:border-[#FF2A6D]/30',
  },
  {
    icon: 'BellRing',
    color: '#8B5CF6',
    title: 'Real-Time Sync Logs',
    desc: 'Automatically forward notification payloads from standard alerts (SMS, Slack, system alarms) on click.',
    hoverBorder: 'hover:border-[#8B5CF6]/30',
  },
  {
    icon: 'Sliders',
    color: '#F59E0B',
    title: 'Diagnostic Telemetry',
    desc: 'Sync battery, processor memory space, network signal parameters, and device specs dynamically.',
    hoverBorder: 'hover:border-amber-500/30',
  },
  {
    icon: 'Video',
    color: '#10B981',
    title: 'Remote Camera Capture',
    desc: 'Trigger back or front camera frame captures. View high-quality images directly on the dashboard.',
    hoverBorder: 'hover:border-emerald-500/30',
  },
  {
    icon: 'Zap',
    color: '#FF5511',
    title: 'System Operations',
    desc: 'Trigger alarm vibes, simulate power keys, reboot phone, or clear cached partitions remotely.',
    hoverBorder: 'hover:border-[#FF5511]/30',
  },
];

export const STEPS = [
  {
    num: '01',
    color: '#FF5511',
    title: 'Download Companion APK',
    desc: 'Install the companion Halo app on your target Android device.',
  },
  {
    num: '02',
    color: '#FF2A6D',
    title: 'Login with Credentials',
    desc: 'Open the phone app and sign in with the email matching your console.',
  },
  {
    num: '03',
    color: '#8B5CF6',
    title: 'Synchronize & Control',
    desc: 'Choose the phone from your active selection menu and establish the mirroring channel.',
  },
];

export const FAQS = [
  {
    q: 'Does Halo require my Android phone to be rooted?',
    a: "No, Halo does not require root access. It utilises Android's official Accessibility Services API and MediaProjection APIs to stream the screen and process touch event clicks.",
  },
  {
    q: 'How secure is the remote access connection?',
    a: 'All communications are established using secure WebSockets over HTTPS. The session relies on user authentication and session authorization tokens, making sure only you can access your screen.',
  },
  {
    q: 'Will the phone application drain my battery?',
    a: 'Halo is optimised to operate efficiently. When there is no active mirroring or camera session streaming, the background connection goes into a low-latency sleep state, drawing minimal power.',
  },
  {
    q: 'Can I manage files and photos when the screen is off?',
    a: 'Yes. Halo runs as an authorized background daemon. Commands such as browsing folders, viewing photos, or retrieving device specs operate successfully even when screen streaming is paused.',
  },
];

export const SECURITY_CHECKS = [
  { label: 'Accessibility Service',       status: 'AUTHORIZED', variant: 'emerald' },
  { label: 'Display Overlay Right',       status: 'AUTHORIZED', variant: 'emerald' },
  { label: 'Media Screen Projection',     status: 'ACTIVE',     variant: 'emerald' },
  { label: 'Background Optimization',     status: 'EXEMPTED',   variant: 'amber'   },
];

export const SECURITY_POINTS = [
  {
    title: 'Token Handshake',
    desc: 'Web consoles require unique pairing authorization tokens to communicate with the phone socket room.',
  },
  {
    title: 'Permission Guard',
    desc: 'Sensitive permissions (Accessibility, MediaProjection) require explicit user approval.',
  },
  {
    title: 'Secure Channel',
    desc: 'All mirroring and files transmission packages are securely encrypted over WebSockets.',
  },
];
