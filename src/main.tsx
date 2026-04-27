import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const faviconUrl = "https://cdn.poehali.dev/projects/30589419-8040-421a-8f96-70e5f7c9160c/bucket/6b67ee50-70c7-45fa-a36e-ef28f9047b4d.png";
const link = document.querySelector("link[rel='icon']") as HTMLLinkElement || document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = faviconUrl;
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);