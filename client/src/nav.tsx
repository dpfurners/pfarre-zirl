import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import Head from './Head.tsx'

createRoot(document.getElementById('nav')!).render(
  <StrictMode>
    <Head />
  </StrictMode>,
)
