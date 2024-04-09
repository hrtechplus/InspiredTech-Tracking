import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import AdminLogin from "./trackingComponent/admin/AdminLogin";
import UserRegister from "./trackingComponent/user/Register";
import AdminDashBoard from "./trackingComponent/admin/AdminMain";
import Admin_DashBoard from "./trackingComponent/admin/DashBoard";
import TrackingPage from "./trackingComponent/user/ParcelForm";
import Home from "./trackingComponent/Common/Home";
import EditParcel from "./trackingComponent/admin/EditParcel";
import HowToUse from "./trackingComponent/admin/Component/HowToUse";
import HandelAuth from "./trackingComponent/Common/auth/HandleAuth";

import { Toaster } from "react-hot-toast";
//comment
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashBoard" element={<Admin_DashBoard />} />

        <Route path="/register" element={<UserRegister />} />
        <Route path="/parcel" element={<TrackingPage />} />
        <Route path="/edit" element={<HandelAuth />}>
          <Route path="/login" element={<AdminLogin />} />
        </Route>
        <Route path="/test" element={<AdminDashBoard />} />
        <Route path="/howto" element={<HowToUse />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="bottom-center" reverseOrder={false} />
  </ChakraProvider>
);

reportWebVitals();
