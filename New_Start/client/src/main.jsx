import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Default pages import
import Home from './pages/Home'
import Tools from './pages/Tools'
import Docs from './pages/Docs'
import AdminPage from './pages/AdminPage'
import DocsContent from "./pages/DocsContent"

// Manage pages rendergin
import ScrollToTop from "./config/ScrollToTop"

// Auth pages imports
import Signup from "./pages/auth/SignUp"
import Login from "./pages/auth/Login"
import AccountRecover from "./pages/auth/AccountRecover"

// Tools pages imports
import ImageToPdf from "./pages/Tools_Pages/ImageToPdf"

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      {/* Handel scroll */}
      <ScrollToTop />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Tools Page */}
        <Route path="/tools" element={<Tools />} />

        {/* Docs Page */}
        <Route path="/docs" element={<Docs />} />

        {/* Docs Content PAge */}
        <Route path="/docscontent/:category/:id" element={<DocsContent />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Account recovery page */}
        <Route path="/accountRecover" element={<AccountRecover />} />

        {/* Image to PDF converter Page */}
        <Route path="/imageToPdf" element={<ImageToPdf />} />

        {/* Admin Page */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
