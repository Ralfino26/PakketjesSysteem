import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Home'
import AddPackage from './AddPackage'
import EditPackage from './EditPackage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Couriers from './Couriers'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPackage />} />
        <Route path="/edit/:id" element={<EditPackage />} />
        <Route path="/couriers" element={<Couriers />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)