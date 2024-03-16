import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import AdminLogin from "./trackingComponent/admin/AdminLogin";
import App from "./App";
import toast, { Toaster } from "react-hot-toast";
//comment
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/parcel" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </ChakraProvider>
);

reportWebVitals();
