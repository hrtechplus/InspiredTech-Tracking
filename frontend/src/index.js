import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import AdminLogin from "./trackingComponent/admin/AdminLogin";
import UserRegister from "./trackingComponent/user/Register";
import AdminDashBoard from "./trackingComponent/admin/AdminDashBoard";
import TrackingPage from "./trackingComponent/user/ParcelForm";
import Home from "./trackingComponent/Common/Home";

import { Toaster } from "react-hot-toast";
//comment
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/parcel" element={<TrackingPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </ChakraProvider>
);

reportWebVitals();
