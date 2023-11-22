import { BrowserRouter, Route, Routes, Router, Link } from "react-router-dom";

import React from 'react'
import AuthLayout from "../layout/AuthLayout";
import Layout from "../layout/Layout";
import Home from '../screens/Home'
import Login from '../screens/Login'
import Notification from "../screens/Notification";
import Schedule from "../screens/Schedule";
import MainContent from "../screens/MainContent";
import Navbar from "../components/Navbar";
function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route
                  path="/"
                  element={<MainContent />}
                >
                  <Route 
                    path="notificacion"
                    element={<Notification />}
                  />
                  <Route 
                    path="schedule"
                    element={<Schedule />}
                  />
                  <Route />
                </Route>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default router