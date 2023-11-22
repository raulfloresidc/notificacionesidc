import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from 'react'
import Notification from "../screens/Notification";
import Schedule from "../screens/Schedule";
function mainRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/notificacion" element={<Notification/>} />
            <Route path="/programar" element={<Schedule/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default mainRouter