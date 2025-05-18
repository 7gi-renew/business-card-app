import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App.tsx";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  authDomain: import.meta.env.VITE_SUPABASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SUPABASE_MASSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SUPABASE_APP_ID,
};

initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
