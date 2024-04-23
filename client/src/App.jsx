import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/principal";
import Options from "./pages/options"
import InputRoom from "./pages/rommInput";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/room" element = {<InputRoom></InputRoom>}></Route>
        <Route path="/options" element={<Options />} />
        <Route path="/login" element={<InputRoom></InputRoom>}></Route>
      </Routes>
    </BrowserRouter>
  );
}